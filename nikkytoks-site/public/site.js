/**
 * NIKKYTOKS VENTURES — Modern SaaS Industrial Platform Client Logic
 * Light Theme Edition with Vector SVG Icons System
 */

// State Management
let products = [];
let settings = {};
let rfqBasket = [];
let activeCategory = '';

// Universal Vector SVG Icons (replacing unicode emojis with crisp scalable vectors)
const SVG_ICONS = {
  zap: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  wrench: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  tools: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.26-6.36 6.36a4.5 4.5 0 0 0-1.27 3.18L13 13l2 2 .18-.28a4.5 4.5 0 0 0 3.18-1.27l6.36-6.36a1 1 0 0 0-1.41-1.41l-2.83 2.83-1.41-1.41 2.83-2.83a1 1 0 0 0-1.41-1.41l-2.83 2.83-1.41-1.41 2.83-2.83a1 1 0 0 0-1.41-1.41z"/></svg>`,
  plug: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 2v6"/><path d="M18 8v5a6 6 0 0 1-12 0V8z"/></svg>`,
  droplet: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  oil: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12l1 5H5l1-5z"/><path d="M5 8v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><path d="M10 13h4"/><path d="M12 11v4"/></svg>`,
  factory: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
  package: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  clipboard: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>`,
  search: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  truck: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  shield: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  headset: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  store: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7a5 5 0 0 1-10 0 5 5 0 0 1-10 0"/></svg>`,
  check: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
  phone: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  sun: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  battery: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></svg>`,
  gear: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
};

// Safe icon lookup helper
function getIconSvg(name) {
  if (!name) return SVG_ICONS.package;
  const key = String(name).toLowerCase().trim();
  // Map any common legacy emojis or keys to SVG keys
  const aliasMap = {
    '⚡': 'zap', 'zap': 'zap', 'lightning': 'zap',
    '🔧': 'wrench', 'wrench': 'wrench', 'spanner': 'wrench',
    '🛠️': 'tools', '🛠': 'tools', 'tools': 'tools', 'drill': 'tools',
    '🔌': 'plug', 'plug': 'plug', 'cable': 'plug',
    '💧': 'droplet', 'droplet': 'droplet', 'pump': 'droplet',
    '🛢️': 'oil', '🛢': 'oil', 'oil': 'oil', 'lubricant': 'oil',
    '🏭': 'factory', 'factory': 'factory', 'gear': 'gear', '⚙️': 'gear',
    '📦': 'package', 'package': 'package', 'box': 'package',
    '📋': 'clipboard', 'clipboard': 'clipboard',
    '🔍': 'search', 'search': 'search',
    '☀️': 'sun', 'sun': 'sun', 'solar': 'sun',
    '🔋': 'battery', 'battery': 'battery',
    'truck': 'truck', 'shield': 'shield', 'headset': 'headset', 'store': 'store', 'check': 'check'
  };
  const resolved = aliasMap[key] || key;
  return SVG_ICONS[resolved] || SVG_ICONS.package;
}

// Category to default icon key mapping
function getCategoryIconKey(categoryName) {
  switch (categoryName) {
    case 'Power Generation': return 'zap';
    case 'Engineering & Hand Tools': return 'wrench';
    case 'Power Tools': return 'tools';
    case 'Cables & Wiring': return 'plug';
    case 'Water Pumps': return 'droplet';
    case 'Lubricants & Engine Oil': return 'oil';
    case 'Industrial & General': return 'factory';
    default: return 'package';
  }
}

// Core Categories Definition with Clean Vector Icons, Tags, and Color Accents
const categoriesConfig = [
  { 
    name: 'Power Generation', 
    icon: 'zap', 
    tag: 'Core Gensets & Solar', 
    desc: 'Heavy-duty Elepaq, Sumec & Mikano diesel/petrol power plants',
    colorKey: 'cat-power' 
  },
  { 
    name: 'Engineering & Hand Tools', 
    icon: 'wrench', 
    tag: 'Mechanics & Fitters', 
    desc: 'Drop-forged spanners, impact socket sets & precision mechanics kits',
    colorKey: 'cat-handtools' 
  },
  { 
    name: 'Power Tools', 
    icon: 'tools', 
    tag: 'Cordless & Rotary', 
    desc: 'High-torque INGCO & Bosch drills, angle grinders & cut-offs',
    colorKey: 'cat-powertools' 
  },
  { 
    name: 'Cables & Wiring', 
    icon: 'plug', 
    tag: '100% Pure Copper', 
    desc: 'Nexans armored feeder cables, conduit coils & certified glands',
    colorKey: 'cat-cables' 
  },
  { 
    name: 'Water Pumps', 
    icon: 'droplet', 
    tag: 'Fluid Dynamics', 
    desc: 'High-head borehole submersible & surface pressure transfer pumps',
    colorKey: 'cat-pumps' 
  },
  { 
    name: 'Lubricants & Engine Oil', 
    icon: 'oil', 
    tag: 'OEM Certified Blends', 
    desc: 'High-temp Total Quartz, Valvoline 20W-50 & heavy industrial greases',
    colorKey: 'cat-lubricants' 
  },
  { 
    name: 'Industrial & General', 
    icon: 'factory', 
    tag: 'Site Infrastructure', 
    desc: 'Automatic changeovers, industrial switchgear & heavy rigging',
    colorKey: 'cat-industrial' 
  }
];

// Helper: DOM Element Selector
const $ = id => document.getElementById(id);

// Helper: HTML Escaper for Security
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// Helper: Format WhatsApp Link with Pre-filled Message
function getWhatsAppUrl(customMessage) {
  const phone = (settings.whatsapp || '2348028278993').replace(/\D/g, '');
  const text = customMessage || 'Hello NIKKYTOKS VENTURES, I would like to enquire about your industrial equipment and current stock availability.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// Helper: Show Interactive Toast Notification (with SVG Check)
function showToast(message) {
  const toast = $('toast');
  if (!toast) return;
  toast.innerHTML = `<span class="toast-icon">${getIconSvg('check')}</span> <span>${esc(message)}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// LocalStorage RFQ Basket Storage
function loadRfqBasket() {
  try {
    const saved = localStorage.getItem('nikkytoks_rfq_basket');
    rfqBasket = saved ? JSON.parse(saved) : [];
  } catch (e) {
    rfqBasket = [];
  }
  updateRfqBadge();
}

function saveRfqBasket() {
  try {
    localStorage.setItem('nikkytoks_rfq_basket', JSON.stringify(rfqBasket));
  } catch (e) {}
  updateRfqBadge();
}

function updateRfqBadge() {
  const badge = $('rfqCountBadge');
  if (badge) {
    const totalCount = rfqBasket.reduce((sum, item) => sum + (item.qty || 1), 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }
}

// Add Item to RFQ Basket
function addToRfq(product, customQty = 1) {
  const existing = rfqBasket.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + customQty;
  } else {
    rfqBasket.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      specs: product.specs,
      image: product.image,
      icon: product.icon || getCategoryIconKey(product.category),
      qty: customQty
    });
  }
  saveRfqBasket();
  renderRfqDrawer();
  showToast(`Added ${product.name} to RFQ Basket`);
}

// Remove or Adjust Qty in RFQ
function changeRfqQty(productId, delta) {
  const item = rfqBasket.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    rfqBasket = rfqBasket.filter(i => i.id !== productId);
  }
  saveRfqBasket();
  renderRfqDrawer();
}

function removeRfqItem(productId) {
  rfqBasket = rfqBasket.filter(i => i.id !== productId);
  saveRfqBasket();
  renderRfqDrawer();
  showToast('Item removed from RFQ Basket');
}

function clearRfqBasket() {
  if (rfqBasket.length === 0) return;
  if (confirm('Clear all items from your RFQ list?')) {
    rfqBasket = [];
    saveRfqBasket();
    renderRfqDrawer();
    showToast('RFQ Basket cleared');
  }
}

// Render RFQ Slide-out Drawer (Using Vector SVG Icons)
function renderRfqDrawer() {
  const listEl = $('rfqItemsList');
  if (!listEl) return;

  if (rfqBasket.length === 0) {
    listEl.innerHTML = `
      <div class="rfq-empty-message">
        <div class="rfq-empty-icon">${getIconSvg('clipboard')}</div>
        <p><strong>Your RFQ Basket is currently empty.</strong></p>
        <p style="color: var(--text-muted); margin-top: 6px; font-size: 12px;">Click "+ Add to Quote" on any equipment in the catalogue to build your Bill of Materials.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = rfqBasket.map(item => `
    <div class="rfq-item-row">
      <div class="rfq-item-info">
        <div class="rfq-item-title" title="${esc(item.name)}">${esc(item.name)}</div>
        <div class="rfq-item-brand">${esc(item.brand || 'OEM')} &bull; ${esc(item.category)}</div>
      </div>
      <div class="rfq-qty-control">
        <button class="rfq-qty-btn" onclick="changeRfqQty('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
        <span class="rfq-qty-val">${item.qty || 1}</span>
        <button class="rfq-qty-btn" onclick="changeRfqQty('${item.id}', 1)" aria-label="Increase quantity">&plus;</button>
      </div>
      <button class="rfq-remove-btn" onclick="removeRfqItem('${item.id}')" aria-label="Remove item" title="Remove">&times;</button>
    </div>
  `).join('');
}

// Build WhatsApp RFQ Text
function buildRfqSummaryText() {
  const projectName = ($('rfqProjectName')?.value || '').trim();
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  
  let msg = `*OFFICIAL RFQ REQUEST — NIKKYTOKS VENTURES*\n`;
  msg += `*Date:* ${dateStr}\n`;
  if (projectName) {
    msg += `*Project / Client:* ${projectName}\n`;
  }
  msg += `\n*Requested Bill of Materials (BOM):*\n`;

  rfqBasket.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}* (${item.brand || 'OEM'})\n`;
    msg += `   • Quantity: ${item.qty || 1} unit(s)\n`;
    if (item.specs) {
      msg += `   • Specs: ${item.specs}\n`;
    }
  });

  msg += `\nPlease confirm official commercial pricing, discounts, stock availability, and dispatch timeline. Thank you.`;
  return msg;
}

// Open / Close RFQ Drawer
function openRfqDrawer() {
  const drawer = $('rfqDrawer');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    renderRfqDrawer();
  }
}

function closeRfqDrawer() {
  const drawer = $('rfqDrawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
}

// Render Products Grid with Search, Category Filter & Stock Filter
function renderProducts() {
  const query = (($('search')?.value || $('subSearch')?.value || '')).trim().toLowerCase();
  const selectedCategory = activeCategory || ($('filter')?.value || '');
  const inStockOnly = $('stockOnlyToggle')?.checked;

  let filtered = products.filter(p => {
    // Category match
    if (selectedCategory && p.category !== selectedCategory) return false;
    // Stock match
    if (inStockOnly && p.available === false) return false;
    // Search query match across multiple fields
    if (query) {
      const searchBlob = [p.name, p.brand, p.category, p.description, p.specs].join(' ').toLowerCase();
      if (!searchBlob.includes(query)) return false;
    }
    return true;
  });

  const grid = $('grid');
  const emptyState = $('empty');
  const countLabel = $('productCountLabel');

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} of ${products.length} verified products`;
  }

  // Update active filter tags display
  const tagsContainer = $('activeFilterTags');
  if (tagsContainer) {
    let tagsHtml = '';
    if (selectedCategory) {
      tagsHtml += `<span class="filter-tag-chip">Category: ${esc(selectedCategory)} <button onclick="clearCategoryFilter()" aria-label="Remove category filter">&times;</button></span>`;
    }
    if (inStockOnly) {
      tagsHtml += `<span class="filter-tag-chip">In-Stock Only</span>`;
    }
    if (query) {
      tagsHtml += `<span class="filter-tag-chip">Keyword: "${esc(query)}"</span>`;
    }
    tagsContainer.innerHTML = tagsHtml;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
    return;
  }

  if (emptyState) emptyState.hidden = true;

  grid.innerHTML = filtered.map(p => {
    const isAvailable = p.available !== false;
    const iconKey = p.icon || getCategoryIconKey(p.category);
    const thumbHtml = p.image 
      ? `<img src="${p.image}" alt="${esc(p.name)}" class="product-thumb-img" loading="lazy">` 
      : `<span class="product-thumb-fallback">${getIconSvg(iconKey)}</span>`;

    return `
      <article class="product-card" id="card-${p.id}">
        <div class="product-thumb-container">
          <div class="product-badge-row">
            <span class="product-brand-tag">${esc(p.brand || 'CERTIFIED')}</span>
            <span class="product-stock-tag ${isAvailable ? '' : 'out'}">
              <span class="stock-led"></span>
              ${isAvailable ? 'In Stock' : 'On Order'}
            </span>
          </div>
          ${thumbHtml}
        </div>

        <div class="product-body">
          <span class="product-category-label">${esc(p.category)}</span>
          <h3 class="product-name">${esc(p.name)}</h3>
          <p class="product-desc">${esc(p.description)}</p>
          
          ${p.specs ? `<div class="product-specs-chip" title="${esc(p.specs)}">${esc(p.specs)}</div>` : ''}

          <div class="product-actions">
            <button class="product-btn-detail" onclick="showProductDetails('${p.id}')">
              Specs & Details
            </button>
            <button class="product-btn-rfq" onclick="handleQuickAdd('${p.id}')">
              + Add to Quote
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Quick Add Handler for button on card
window.handleQuickAdd = function(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    addToRfq(product, 1);
  }
};

// Show Product Details Modal Dialog
window.showProductDetails = function(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  const isAvailable = p.available !== false;
  const iconKey = p.icon || getCategoryIconKey(p.category);
  const thumbHtml = p.image 
    ? `<img src="${p.image}" alt="${esc(p.name)}">` 
    : `<span class="modal-img-fallback">${getIconSvg(iconKey)}</span>`;

  const waEnquiryText = `Hello NIKKYTOKS VENTURES, I would like to enquire about current price and delivery for: ${p.name} (Brand: ${p.brand || 'OEM'}). Specs: ${p.specs || 'Standard'}.`;

  const modalBody = $('detailContent');
  modalBody.innerHTML = `
    <div class="modal-product-split">
      <div class="modal-img-wrap">
        ${thumbHtml}
      </div>
      <div class="modal-details">
        <span class="eyebrow">${esc(p.category)}</span>
        <h2>${esc(p.name)}</h2>
        <div class="modal-brand-cat">
          <strong>Manufacturer / Brand:</strong> ${esc(p.brand || 'OEM Certified')} &bull; 
          <span style="color: ${isAvailable ? 'var(--accent-emerald)' : 'var(--danger)'};">
            ${isAvailable ? '● Ready for Immediate Dispatch' : '○ Available on Order'}
          </span>
        </div>
        
        <p class="modal-desc">${esc(p.description)}</p>

        ${p.specs ? `
          <div class="modal-specs-box">
            <h4>Technical Specifications</h4>
            <div class="modal-specs-content">${esc(p.specs)}</div>
          </div>
        ` : ''}

        <div class="modal-actions">
          <button class="btn btn-primary" onclick="handleModalAdd('${p.id}')">
            + Add to RFQ Basket
          </button>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${getWhatsAppUrl(waEnquiryText)}">
            Direct WhatsApp Enquiry ↗
          </a>
        </div>
      </div>
    </div>
  `;

  const dialog = $('detail');
  if (dialog && typeof dialog.showModal === 'function') {
    dialog.showModal();
  }
};

window.handleModalAdd = function(productId) {
  const p = products.find(x => x.id === productId);
  if (p) {
    addToRfq(p, 1);
    const dialog = $('detail');
    if (dialog) dialog.close();
  }
};

// Function to sync active visual and accessibility states across all category cards
function updateCategoryCardsState() {
  document.querySelectorAll('.category-card').forEach(card => {
    const isAct = card.dataset.category === activeCategory;
    card.classList.toggle('active', isAct);
    card.setAttribute('aria-pressed', isAct ? 'true' : 'false');
    const actionText = card.querySelector('.category-action-text');
    if (actionText) {
      actionText.textContent = isAct ? 'Active Filter Selected ✓' : 'Explore Category';
    }
  });
}

// Clear Category Filter
window.clearCategoryFilter = function() {
  activeCategory = '';
  if ($('filter')) $('filter').value = '';
  updateCategoryCardsState();
  renderProducts();
};

// Initialize Application
async function init() {
  loadRfqBasket();

  // Load Products and Settings from Node API
  try {
    const [fetchedProducts, fetchedSettings] = await Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/settings').then(r => r.json())
    ]);

    products = Array.isArray(fetchedProducts) ? fetchedProducts : [];
    settings = fetchedSettings || {};
  } catch (err) {
    console.error('Failed to load API data:', err);
  }

  // Populate Categories Matrix with High-End Industrial Cards
  const categoryCardsContainer = $('categoryCards');
  if (categoryCardsContainer) {
    categoryCardsContainer.innerHTML = categoriesConfig.map(cat => {
      const count = products.filter(p => p.category === cat.name).length;
      const badgeText = count > 0 ? `${count} ${count === 1 ? 'Model' : 'Models'}` : 'In Stock';
      return `
        <div class="category-card ${cat.colorKey}" data-category="${esc(cat.name)}" role="button" tabindex="0" aria-pressed="false" aria-label="Filter ${esc(cat.name)} equipment">
          <div class="category-card-top">
            <div class="category-icon-box">
              ${getIconSvg(cat.icon)}
            </div>
            <div class="category-sku-badge">
              <span class="category-sku-dot"></span>
              <span class="category-sku-text">${badgeText}</span>
            </div>
          </div>
          <div class="category-card-body">
            <span class="category-tag">${esc(cat.tag)}</span>
            <h3 class="category-title">${esc(cat.name)}</h3>
            <p class="category-desc">${esc(cat.desc)}</p>
          </div>
          <div class="category-card-footer">
            <span class="category-action-text">Explore Category</span>
            <span class="category-action-icon" aria-hidden="true">
              <svg class="category-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click and keyboard events
    document.querySelectorAll('.category-card').forEach(card => {
      const handleToggle = () => {
        const catName = card.dataset.category;
        if (activeCategory === catName) {
          activeCategory = '';
          if ($('filter')) $('filter').value = '';
        } else {
          activeCategory = catName;
          if ($('filter')) $('filter').value = catName;
        }
        updateCategoryCardsState();
        renderProducts();
        const inventorySection = $('inventory');
        if (inventorySection) {
          inventorySection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      card.addEventListener('click', handleToggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      });
    });
  }

  // Populate Select Dropdown in Inventory Toolbar
  const filterSelect = $('filter');
  if (filterSelect) {
    categoriesConfig.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.name;
      opt.textContent = `${cat.name}`;
      filterSelect.appendChild(opt);
    });

    filterSelect.addEventListener('change', (e) => {
      activeCategory = e.target.value;
      updateCategoryCardsState();
      renderProducts();
    });
  }

  // Search Inputs Sync (Header search and Catalogue search)
  const headerSearch = $('search');
  const subSearch = $('subSearch');

  if (headerSearch) {
    headerSearch.addEventListener('input', (e) => {
      if (subSearch) subSearch.value = e.target.value;
      renderProducts();
    });
    headerSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inventoryEl = $('inventory');
        if (inventoryEl) inventoryEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (subSearch) {
    subSearch.addEventListener('input', (e) => {
      if (headerSearch) headerSearch.value = e.target.value;
      renderProducts();
    });
  }

  // In-Stock Toggle
  const stockToggle = $('stockOnlyToggle');
  if (stockToggle) {
    stockToggle.addEventListener('change', renderProducts);
  }

  // Reset Filters Button
  const resetBtn = $('resetSearchBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (headerSearch) headerSearch.value = '';
      if (subSearch) subSearch.value = '';
      if (stockToggle) stockToggle.checked = false;
      clearCategoryFilter();
    });
  }

  // Bind Showroom Lightbox
  const showroomBtn = $('viewShowroomBannerBtn');
  const showroomModal = $('showroomModal');
  const closeShowroomBtn = $('closeShowroom');
  if (showroomBtn && showroomModal) {
    showroomBtn.addEventListener('click', () => {
      showroomModal.showModal();
    });
  }
  if (closeShowroomBtn && showroomModal) {
    closeShowroomBtn.addEventListener('click', () => {
      showroomModal.close();
    });
  }

  // SaaS Cockpit Interactive Tabs Switcher
  const cockpitTabs = document.querySelectorAll('.cockpit-tab');
  const cockpitPanes = {
    showroom: $('pane-showroom'),
    power: $('pane-power'),
    tools: $('pane-tools')
  };

  cockpitTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-cockpit-target');
      cockpitTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      Object.entries(cockpitPanes).forEach(([key, pane]) => {
        if (!pane) return;
        if (key === target) {
          pane.hidden = false;
          pane.classList.add('active');
        } else {
          pane.hidden = true;
          pane.classList.remove('active');
        }
      });
    });
  });

  // Dynamic Real-Time Lagos Dispatch Feed Ticker
  const dispatchTickerEl = $('heroLiveDispatchTicker');
  if (dispatchTickerEl) {
    const dispatchAlerts = [
      '50mm Nexans Armoured Cable dispatched to Lekki Phase 1',
      'Mikano 30kVA Perkins Soundproof genset en route to Victoria Island',
      'Growatt 5kW Hybrid Inverter + 10kWh LiFePO4 shipped to Ikeja GRA',
      'INGCO 1500W Demolition Rotary Hammer pack dispatched to Ajah',
      'Sumec Firman 7.5kVA Constant Power genset dispatched to Surulere'
    ];
    let alertIdx = 0;
    setInterval(() => {
      alertIdx = (alertIdx + 1) % dispatchAlerts.length;
      dispatchTickerEl.style.opacity = '0';
      dispatchTickerEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        dispatchTickerEl.textContent = dispatchAlerts[alertIdx];
        dispatchTickerEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        dispatchTickerEl.style.opacity = '1';
        dispatchTickerEl.style.transform = 'translateY(0)';
      }, 300);
    }, 4500);
  }

  // Close Product Details Dialog
  const closeDetailBtn = $('close');
  const detailModal = $('detail');
  if (closeDetailBtn && detailModal) {
    closeDetailBtn.addEventListener('click', () => detailModal.close());
  }

  // RFQ Drawer Controls
  const openRfqBtn = $('openRfqBtn');
  const closeRfqBtn = $('closeRfqDrawer');
  const rfqOverlay = $('rfqDrawerOverlay');
  const heroRfqTrigger = $('heroRfqTrigger');
  const quickRfqFromBulk = $('quickRfqFromBulk');

  if (openRfqBtn) openRfqBtn.addEventListener('click', openRfqDrawer);
  if (closeRfqBtn) closeRfqBtn.addEventListener('click', closeRfqDrawer);
  if (rfqOverlay) rfqOverlay.addEventListener('click', closeRfqDrawer);
  if (heroRfqTrigger) heroRfqTrigger.addEventListener('click', openRfqDrawer);
  if (quickRfqFromBulk) quickRfqFromBulk.addEventListener('click', openRfqDrawer);

  // Send RFQ to WhatsApp
  const sendRfqBtn = $('sendRfqWhatsAppBtn');
  if (sendRfqBtn) {
    sendRfqBtn.addEventListener('click', () => {
      if (rfqBasket.length === 0) {
        alert('Please add at least one product to your RFQ Basket first.');
        return;
      }
      const summaryText = buildRfqSummaryText();
      const url = getWhatsAppUrl(summaryText);
      window.open(url, '_blank', 'noopener');
    });
  }

  // Copy RFQ Summary to Clipboard
  const copyRfqBtn = $('copyRfqSummaryBtn');
  if (copyRfqBtn) {
    copyRfqBtn.addEventListener('click', () => {
      if (rfqBasket.length === 0) {
        alert('Your RFQ Basket is empty.');
        return;
      }
      const text = buildRfqSummaryText();
      navigator.clipboard.writeText(text).then(() => {
        showToast('RFQ summary copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  }

  // Clear RFQ List
  const clearRfqBtnEl = $('clearRfqBtn');
  if (clearRfqBtnEl) {
    clearRfqBtnEl.addEventListener('click', clearRfqBasket);
  }

  // Update Settings in DOM
  if (settings.head && $('head')) $('head').textContent = settings.head;
  if (settings.branch && $('branch')) $('branch').textContent = settings.branch;
  if (settings.hours && $('hours')) $('hours').textContent = settings.hours;
  if ($('year')) $('year').textContent = new Date().getFullYear();

  // Attach WhatsApp Links with prefilled texts
  const navWa = $('navwa');
  if (navWa) navWa.href = getWhatsAppUrl('Hello NIKKYTOKS VENTURES, I would like to make an enquiry about your products.');

  const heroWa = $('herowa');
  if (heroWa) heroWa.href = getWhatsAppUrl('Hello NIKKYTOKS VENTURES, I am interested in purchasing equipment from your Lagos showroom.');

  const bulkWa = $('bulkWa');
  if (bulkWa) bulkWa.href = getWhatsAppUrl('Hello NIKKYTOKS VENTURES, I am reaching out regarding a wholesale / bulk contractor supply enquiry.');

  const showroomWa = $('showroomWaEnquire');
  if (showroomWa) showroomWa.href = getWhatsAppUrl('Hello NIKKYTOKS VENTURES, I saw your showroom equipment inventory and want to check pricing.');

  const contactWa1 = $('contactwa1');
  if (contactWa1) contactWa1.href = getWhatsAppUrl('Hello NIKKYTOKS Ilasamaja Office, I would like to confirm equipment availability at the Central Store.');

  const contactWa2 = $('contactwa2');
  if (contactWa2) contactWa2.href = getWhatsAppUrl('Hello NIKKYTOKS Lekki Office, I would like to enquire about stock pickup and island delivery.');

  const footerWa = $('footerwa');
  if (footerWa) footerWa.href = getWhatsAppUrl('Hello NIKKYTOKS VENTURES sales team.');

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Focus search on '/'
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (headerSearch) {
        headerSearch.focus();
      } else if (subSearch) {
        subSearch.focus();
      }
    }
    // Close modals & drawers on Escape
    if (e.key === 'Escape') {
      closeRfqDrawer();
      if (detailModal && detailModal.open) detailModal.close();
      if (showroomModal && showroomModal.open) showroomModal.close();
    }
  });

  // Render initial products
  renderProducts();
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
