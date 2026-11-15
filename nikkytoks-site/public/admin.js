/**
 * NIKKYTOKS VENTURES — Enterprise Admin Portal Logic
 * Vector SVG Icons & Light Mode Edition
 */

const $ = id => document.getElementById(id);
let products = [];
let settings = {};
let editing = null;

const cats = [
  'Power Generation',
  'Engineering & Hand Tools',
  'Power Tools',
  'Cables & Wiring',
  'Water Pumps',
  'Lubricants & Engine Oil',
  'Industrial & General'
];

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// Universal Admin SVG Icons
const ADMIN_ICONS = {
  package: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  search: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  star: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

async function api(url, method = 'GET', obj) {
  const r = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: obj ? JSON.stringify(obj) : undefined
  });
  const d = await r.json();
  if (!r.ok) throw Error(d.error || 'Request failed');
  return d;
}

async function start() {
  try {
    const me = await api('/api/me');
    if (me.authenticated) {
      await show();
    }
  } catch (e) {
    // Not authenticated, stay on login
  }
}

async function show() {
  $('login').hidden = true;
  $('dashboard').hidden = false;
  products = await api('/api/products');
  settings = await api('/api/settings');

  const sForm = $('settingsForm');
  if (sForm) {
    Object.keys(settings).forEach(k => {
      const e = sForm.elements.namedItem(k);
      if (e) e.value = settings[k];
    });
  }

  render();
}

function updateStats() {
  if ($('statTotalCount')) $('statTotalCount').textContent = products.length;
  if ($('statInStockCount')) $('statInStockCount').textContent = products.filter(p => p.available !== false).length;
  if ($('statFeaturedCount')) $('statFeaturedCount').textContent = products.filter(p => !!p.featured).length;
}

function render() {
  updateStats();
  const q = ($('search')?.value || '').toLowerCase().trim();
  const cat = $('categoryFilter')?.value || '';

  const filtered = products.filter(x => {
    if (cat && x.category !== cat) return false;
    if (q && !([x.name, x.brand, x.category, x.description, x.specs].join(' ').toLowerCase().includes(q))) return false;
    return true;
  });

  const list = $('products');
  if (!list) return;

  if (filtered.length === 0) {
    list.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <div style="width: 48px; height: 48px; margin: 0 auto 12px; color: var(--text-faint);">${ADMIN_ICONS.search}</div>
        <p style="font-weight: 600; color: var(--text-main);">No products match your search or filter.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(x => `
    <article class="item-card">
      <div class="item-thumb">
        ${x.image ? `<img src="${x.image}" alt="${esc(x.name)}">` : `<span class="item-thumb-icon">${ADMIN_ICONS.package}</span>`}
      </div>
      <div class="item-info">
        <span class="item-cat">${esc(x.category)}</span>
        <h3 class="item-title">${esc(x.name)}</h3>
        <p class="item-brand"><strong>Brand:</strong> ${esc(x.brand || 'OEM')}</p>
        <div style="font-size: 11px; color: ${x.available !== false ? 'var(--accent-emerald)' : 'var(--danger)'}; margin-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
          <span>${x.available !== false ? '● In Stock' : '○ Out of Stock'}</span>
          ${x.featured ? `<span>&bull;</span> <span style="display:inline-flex; align-items:center; gap:2px; color:var(--accent-amber);">${ADMIN_ICONS.star} Featured</span>` : ''}
        </div>
        <div class="item-actions">
          <button class="item-btn-edit" data-edit="${x.id}">Edit Equipment</button>
          <button class="item-btn-danger" data-del="${x.id}">Delete</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-edit]').forEach(b => {
    b.onclick = () => openModal(products.find(x => x.id === b.dataset.edit));
  });

  document.querySelectorAll('[data-del]').forEach(b => {
    b.onclick = async () => {
      if (confirm('Delete this product permanently?')) {
        await api('/api/admin/products/' + b.dataset.del, 'DELETE');
        products = await api('/api/products');
        render();
      }
    };
  });
}

function openModal(x) {
  editing = x || null;
  const f = $('productForm');
  f.reset();
  $('formerror').textContent = '';

  ['name', 'brand', 'category', 'description', 'specs'].forEach(k => {
    const el = f.elements.namedItem(k);
    if (el) el.value = x?.[k] || '';
  });

  f.elements.namedItem('featured').checked = !!x?.featured;
  f.elements.namedItem('available').checked = x?.available !== false;

  $('modalTitle').textContent = x ? `Edit: ${x.name}` : 'Add New Equipment';
  $('modal').showModal();
}

// Login
$('loginform').onsubmit = async e => {
  e.preventDefault();
  $('loginerror').textContent = '';
  try {
    await api('/api/login', 'POST', { password: $('password').value });
    await show();
  } catch (err) {
    $('loginerror').textContent = err.message || 'Incorrect administrative password';
  }
};

// Logout
$('logout').onclick = async () => {
  await api('/api/logout', 'POST', {});
  location.reload();
};

// Navigation Tabs
$('tabProducts').onclick = () => {
  $('productSection').hidden = false;
  $('settingsSection').hidden = true;
  $('heading').textContent = 'Products Inventory';
  $('add').hidden = false;
  $('tabProducts').classList.add('active');
  $('tabSettings').classList.remove('active');
};

$('tabSettings').onclick = () => {
  $('productSection').hidden = true;
  $('settingsSection').hidden = false;
  $('heading').textContent = 'Site & Business Settings';
  $('add').hidden = true;
  $('tabSettings').classList.add('active');
  $('tabProducts').classList.remove('active');
};

// Add button
$('add').onclick = () => openModal();

// Modal close
$('close').onclick = $('cancel').onclick = () => $('modal').close();

// Search & Category Filter
$('search').oninput = $('categoryFilter').onchange = render;

// Save Settings
$('settingsForm').onsubmit = async e => {
  e.preventDefault();
  try {
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    await api('/api/admin/settings', 'PUT', obj);
    alert('Corporate settings successfully saved!');
  } catch (err) {
    alert('Error saving settings: ' + err.message);
  }
};

// Save Product Form
$('productForm').onsubmit = async e => {
  e.preventDefault();
  $('formerror').textContent = '';
  try {
    const f = e.target;
    const b = {};
    ['name', 'brand', 'category', 'description', 'specs'].forEach(k => {
      b[k] = f.elements.namedItem(k).value;
    });
    b.featured = f.elements.namedItem('featured').checked;
    b.available = f.elements.namedItem('available').checked;

    const photo = f.elements.namedItem('photo').files[0];
    if (photo) {
      if (photo.size > 3e6) throw Error('Please use an image under 3 MB');
      b.image = await new Promise((ok, fail) => {
        const r = new FileReader();
        r.onload = () => ok(r.result);
        r.onerror = fail;
        r.readAsDataURL(photo);
      });
    }

    await api(editing ? '/api/admin/products/' + editing.id : '/api/admin/products', editing ? 'PUT' : 'POST', b);
    products = await api('/api/products');
    render();
    $('modal').close();
  } catch (err) {
    $('formerror').textContent = err.message;
  }
};

// Initialize categories dropdowns
cats.forEach(c => {
  for (const id of ['categoryFilter', 'productCategory']) {
    const el = $(id);
    if (el) {
      const o = document.createElement('option');
      o.value = c;
      o.textContent = c;
      el.appendChild(o);
    }
  }
});

start();
