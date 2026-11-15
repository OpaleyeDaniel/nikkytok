const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=__dirname, pub=path.join(root,'public'),data=path.join(root,'data');
fs.mkdirSync(data,{recursive:true});
const file=n=>path.join(data,n+'.json'); const read=n=>JSON.parse(fs.readFileSync(file(n),'utf8')); const write=(n,v)=>fs.writeFileSync(file(n),JSON.stringify(v,null,2));
const secret=process.env.ADMIN_PASSWORD||'ChangeThisBeforeLaunch!';const sessions=new Map();const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const categories=['Power Generation','Engineering & Hand Tools','Power Tools','Cables & Wiring','Water Pumps','Lubricants & Engine Oil','Industrial & General'];
if(!fs.existsSync(file('products')))write('products',[
['Elepaq Generator','Power Generation','Elepaq','Generator options for homes and businesses. Ask about available KVA ratings.','⚡'],['Sumec Firman Generator','Power Generation','Sumec Firman','Reliable generators for residential and commercial use.','⚡'],['Mikano Generator','Power Generation','Mikano','Power solutions for commercial and industrial use.','⚡'],['Luminous Inverter System','Power Generation','Luminous','Inverter and battery backup solutions.','🔋'],['Hybrid Solar Inverter','Power Generation','Various','Hybrid inverters, MPPT controllers and battery banks.','☀️'],['Combination Spanner Set','Engineering & Hand Tools','Various','Combination, ring and open-ended spanners in various sizes.','🔧'],['Socket and Ratchet Set','Engineering & Hand Tools','Various','Socket sets with ratchets, T-bars and extensions.','🧰'],['INGCO Power Drill','Power Tools','INGCO','Power drills and impact drills for professional use.','🛠️'],['Bosch Angle Grinder','Power Tools','Bosch','Angle grinders for construction and workshop applications.','🛠️'],['Nexans Armoured Cable','Cables & Wiring','Nexans','Armoured cable in multiple sizes.','🔌'],['House Wiring Cable','Cables & Wiring','Various','Electrical wiring cable including 100m rolls.','🔌'],['Surface Water Pump','Water Pumps','Various','Surface pumps from 1.5HP and above.','💧'],['Submersible Borehole Pump','Water Pumps','Various','Submersible pumps for borehole applications.','💧'],['Total Quartz Engine Oil','Lubricants & Engine Oil','Total','Engine oil including bulk and drum supply options.','🛢️'],['Valvoline Engine Oil','Lubricants & Engine Oil','Valvoline','Engine oils and bulk supply options.','🛢️'],['Industrial Grease & Hydraulic Fluid','Lubricants & Engine Oil','Various','Greases, hydraulic fluids and industrial lubricants.','⚙️'],['Industrial Equipment','Industrial & General','Various','Mechanical and electrical industrial accessories.','🏭']].map((x,i)=>({id:crypto.randomUUID(),name:x[0],category:x[1],brand:x[2],description:x[3],icon:x[4],image:'',featured:i<8,available:true,specs:''})));
if(!fs.existsSync(file('settings')))write('settings',{whatsapp:'2348028278993',phone:'08028278993',phone2:'08124002501',email:'',hours:'Contact us for opening hours',head:'17 Ifelodun Street, Ilasamaja, Oshodi-Isolo, Lagos',branch:'Shop 10, Alahun Bus Stop, Ibeju Lekki, Lagos'});
const send=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj))};
const auth=req=>{const token=(req.headers.cookie||'').match(/(?:^|; )nt_session=([^;]+)/)?.[1];return token&&sessions.has(token)};
const body=req=>new Promise((resolve,reject)=>{let s='';req.on('data',c=>{s+=c;if(s.length>8e6){reject(Error('Too large'));req.destroy()}});req.on('end',()=>{try{resolve(JSON.parse(s||'{}'))}catch(e){reject(e)}})});
let sanity = null;
try {
  const SanityClient = require('./sanity-client');
  sanity = new SanityClient();
} catch (e) {}

http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');const p=u.pathname;
if(p==='/api/products'&&req.method==='GET'){
  if(sanity&&sanity.isConfigured()){
    try{
      const sanityProducts=await sanity.getProducts();
      if(Array.isArray(sanityProducts)&&sanityProducts.length>0)return send(res,200,sanityProducts);
    }catch(err){console.warn('Sanity fetch failed, using local database fallback:',err.message)}
  }
  return send(res,200,read('products'));
}
if(p==='/api/settings'&&req.method==='GET'){
  if(sanity&&sanity.isConfigured()){
    try{
      const sanitySettings=await sanity.getSettings();
      if(sanitySettings)return send(res,200,{...read('settings'),...sanitySettings});
    }catch(err){console.warn('Sanity settings fetch failed, using local fallback:',err.message)}
  }
  return send(res,200,read('settings'));
}
if(p==='/api/login'&&req.method==='POST'){const b=await body(req);if(b.password!==secret)return send(res,401,{error:'Incorrect password'});const t=crypto.randomBytes(32).toString('hex');sessions.set(t,true);res.setHeader('Set-Cookie',`nt_session=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV==='production'?'; Secure':''}`);return send(res,200,{ok:true})}
if(p==='/api/me')return send(res,200,{authenticated:!!auth(req)});
if(p==='/api/logout'&&req.method==='POST'){const t=(req.headers.cookie||'').match(/nt_session=([^;]+)/)?.[1];sessions.delete(t);res.setHeader('Set-Cookie','nt_session=; Max-Age=0; Path=/');return send(res,200,{ok:true})}
if(p.startsWith('/api/admin/')){if(!auth(req))return send(res,401,{error:'Please sign in'});const b=await body(req);if(p==='/api/admin/settings'&&req.method==='PUT'){const next={...read('settings')};for(const k of Object.keys(next))if(typeof b[k]==='string')next[k]=b[k].slice(0,500);write('settings',next);return send(res,200,next)}if(p==='/api/admin/products'&&req.method==='POST'){if(!b.name||!categories.includes(b.category))return send(res,400,{error:'Name and valid category required'});const a=read('products');const x={id:crypto.randomUUID(),name:String(b.name).slice(0,150),brand:String(b.brand||'').slice(0,100),category:b.category,description:String(b.description||'').slice(0,3000),specs:String(b.specs||'').slice(0,2000),image:typeof b.image==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(b.image)&&b.image.length<6500000?b.image:'',icon:'package',featured:!!b.featured,available:!!b.available};a.unshift(x);write('products',a);return send(res,200,x)}const m=p.match(/^\/api\/admin\/products\/([^/]+)$/);if(m){const a=read('products'),i=a.findIndex(x=>x.id===m[1]);if(i<0)return send(res,404,{error:'Not found'});if(req.method==='DELETE'){a.splice(i,1);write('products',a);return send(res,200,{ok:true})}if(req.method==='PUT'){const x=a[i];for(const k of ['name','brand','description','specs'])if(typeof b[k]==='string')x[k]=b[k].slice(0,3000);if(categories.includes(b.category))x.category=b.category;if(typeof b.image==='string'&&(b.image===''||/^data:image\/(png|jpeg|webp);base64,/.test(b.image)&&b.image.length<6500000))x.image=b.image;x.featured=!!b.featured;x.available=!!b.available;write('products',a);return send(res,200,x)}}}
if(p.startsWith('/api/'))return send(res,404,{error:'Not found'});
const target=p==='/admin'?'/admin.html':p==='/'?'/index.html':p;const f=path.resolve(pub,'.'+target);if(!f.startsWith(pub+path.sep))return send(res,403,{error:'Forbidden'});const ext=path.extname(f);const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};fs.readFile(f,(e,buf)=>{if(e){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream'});res.end(buf)})
}catch(e){send(res,500,{error:e.message})}}).listen(process.env.PORT||3000,()=>console.log('NIKKYTOKS ready at http://localhost:'+(process.env.PORT||3000)));
