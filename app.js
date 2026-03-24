/* ═══════════════════════════════════════════════════════
   CONCIERTOS CONECTADOS — app.js
   Lógica principal de la aplicación
═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   1. STORAGE HELPERS — localStorage
═══════════════════════════════════════════════════════ */
const LS = {
  get: (k, d = []) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? d; }
    catch { return d; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};

function getCats()    { return LS.get('cc_cats', []); }
function setCats(v)   { LS.set('cc_cats', v); }
function getEvents()  { return LS.get('cc_events', []); }
function setEvents(v) { LS.set('cc_events', v); }
function getSales()   { return LS.get('cc_sales', []); }
function setSales(v)  { LS.set('cc_sales', v); }
function getCart()    { return LS.get('cc_cart', []); }
function setCart(v)   { LS.set('cc_cart', v); updateCartBadge(); }


/* ═══════════════════════════════════════════════════════
   2. DATOS INICIALES (seed)
═══════════════════════════════════════════════════════ */
function seedData() {
  if (LS.get('cc_seeded', false)) return;

  setCats([
    { id: 'c1', name: 'Rock',        desc: 'Conciertos de rock y sus subgéneros' },
    { id: 'c2', name: 'Pop',         desc: 'Música pop y artistas contemporáneos' },
    { id: 'c3', name: 'Electrónica', desc: 'DJ sets y música electrónica' },
    { id: 'c4', name: 'Marimba',     desc: 'Música tradicional guatemalteca' },
  ]);

  setEvents([
    {
      id: 'e1', code: 'EV-001',
      name: 'Rock Fest Guatemala 2025',
      catId: 'c1', price: 250,
      date: '2025-08-15', time: '19:00', city: 'Guatemala',
      img: 'https://www.bing.com/images/search?view=detailV2&ccid=ZIB%2bPX4E&id=81A1D1621FCA658DDE816752C854F5B67981A6E9&thid=OIP.ZIB-PX4Eo9LU1WnS7c0glAHaEK&mediaurl=https%3a%2f%2fwallpaperaccess.com%2ffull%2f6168831.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.64807e3d7e04a3d2d4d569d2edcd2094%3frik%3d6aaBebb1VMhSZw%26pid%3dImgRaw%26r%3d0&exph=1080&expw=1920&q=Metallica+Wallpaper+4K+PC&FORM=IRPRST&ck=419EFE2C16B0C7FFC48D8B46C782B6BB&selectedIndex=0&itb=0',
      desc: 'El festival de rock más grande de Guatemala con las mejores bandas nacionales e internacionales.'
    },
    {
      id: 'e2', code: 'EV-002',
      name: 'Pop Night Quetzaltenango',
      catId: 'c2', price: 180,
      date: '2025-09-01', time: '20:00', city: 'Quetzaltenango',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      desc: 'Una noche llena de música pop con los artistas más escuchados del momento.'
    },
    {
      id: 'e3', code: 'EV-003',
      name: 'Electronic Sunrise Antigua',
      catId: 'c3', price: 320,
      date: '2025-09-20', time: '22:00', city: 'Antigua',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
      desc: 'La mejor noche electrónica en el corazón de La Antigua Guatemala.'
    },
    {
      id: 'e4', code: 'EV-004',
      name: 'Marimba Fest Escuintla',
      catId: 'c4', price: 100,
      date: '2025-10-05', time: '17:00', city: 'Escuintla',
      img: 'https://images.unsplash.com/photo-1501386761578-eaa54b8a1e81?w=600&q=80',
      desc: 'Celebración de la música tradicional guatemalteca con los mejores marimbistas del país.'
    },
  ]);

  LS.set('cc_seeded', true);
}


/* ═══════════════════════════════════════════════════════
   3. UTILIDADES
═══════════════════════════════════════════════════════ */

/** Genera un ID único corto */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Formatea una fecha "YYYY-MM-DD" → "15 Ago 2025" */
function formatDate(d) {
  if (!d) return '—';
  try {
    const [y, m, day] = d.split('-');
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    return `${parseInt(day)} ${months[parseInt(m) - 1]} ${y}`;
  } catch { return d; }
}

/** Formatea ISO datetime → fecha y hora local */
function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-GT', { dateStyle: 'medium', timeStyle: 'short' });
}

/** Formatea un número como moneda GTQ */
function currencyGTQ(n) {
  return `Q ${parseFloat(n || 0).toFixed(2)}`;
}


/* ═══════════════════════════════════════════════════════
   4. TOAST (notificaciones)
═══════════════════════════════════════════════════════ */
function toast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('toast-wc');
  el.setAttribute('msg', msg);
  el.setAttribute('type', type);
  container.appendChild(el);
}


/* ═══════════════════════════════════════════════════════
   5. MODALES
═══════════════════════════════════════════════════════ */
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════════
   6. ENRUTAMIENTO DE PÁGINAS (SPA)
═══════════════════════════════════════════════════════ */
const PAGES = ['login', 'admin', 'client', 'detail'];

function showPage(p) {
  PAGES.forEach(pg =>
    document.getElementById('page-' + pg).classList.toggle('hidden', pg !== p)
  );
  if (p === 'client') { ShowEvents(); renderClientFilters(); }
  if (p === 'admin')  { adminNav('dashboard'); }
}


/* ═══════════════════════════════════════════════════════
   7. AUTENTICACIÓN
═══════════════════════════════════════════════════════ */
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();

  if (email === 'admin@mail.com' && pass === '123456') {
    toast('¡Bienvenido, Administrador!', 'success');
    showPage('admin');
  } else {
    toast('Credenciales incorrectas', 'error');
  }
}

function doLogout() {
  showPage('login');
  toast('Sesión cerrada', 'info');
}


/* ═══════════════════════════════════════════════════════
   8. NAVEGACIÓN DEL PANEL ADMIN
═══════════════════════════════════════════════════════ */
function adminNav(section) {
  ['dashboard', 'categories', 'events', 'sales'].forEach(s => {
    document.getElementById('admin-' + s).classList.toggle('hidden', s !== section);
    const navEl = document.getElementById('nav-' + s);
    if (navEl) navEl.classList.toggle('active', s === section);
  });

  if (section === 'dashboard')  renderDashboard();
  if (section === 'categories') renderCats();
  if (section === 'events')     renderEvents();
  if (section === 'sales')      renderSales();
}


/* ═══════════════════════════════════════════════════════
   9. DASHBOARD
═══════════════════════════════════════════════════════ */
function renderDashboard() {
  const sales  = getSales();
  const events = getEvents();
  const cats   = getCats();
  const total  = sales.reduce((a, s) => a + (s.total || 0), 0);
  const grid   = document.getElementById('stats-grid');

  grid.innerHTML = '';

  [
    { label: 'Total Ventas', value: sales.length,        sub: 'Pedidos procesados',  icon: '💰' },
    { label: 'Ingresos',     value: currencyGTQ(total),  sub: 'Ventas totales',       icon: '📈' },
    { label: 'Eventos',      value: events.length,       sub: 'Eventos activos',      icon: '🎤' },
    { label: 'Categorías',   value: cats.length,         sub: 'Géneros disponibles',  icon: '🏷️' },
  ].forEach(s => {
    const el = document.createElement('stat-card-wc');
    el.setAttribute('label', s.label);
    el.setAttribute('value', s.value);
    el.setAttribute('sub',   s.sub);
    el.setAttribute('icon',  s.icon);
    grid.appendChild(el);
  });
}


/* ═══════════════════════════════════════════════════════
   10. MÓDULO DE CATEGORÍAS
═══════════════════════════════════════════════════════ */
function renderCats() {
  const cats  = getCats();
  const tbody = document.getElementById('cat-tbody');

  document.getElementById('cat-count').textContent = `${cats.length} categoría(s)`;

  if (!cats.length) {
    tbody.innerHTML = `
      <tr><td colspan="4">
        <div class="empty-state">
          <div class="empty-icon">🏷️</div>
          <div class="empty-title">Sin categorías</div>
          <p>Agrega tu primera categoría</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = cats.map((c, i) => `
    <tr>
      <td><span class="badge badge-accent">${i + 1}</span></td>
      <td class="bold">${c.name}</td>
      <td class="text-muted">${c.desc || '—'}</td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-secondary btn-sm" onclick="editCat('${c.id}')">✏️ Editar</button>
          <button class="btn btn-danger btn-sm"    onclick="deleteCat('${c.id}')">🗑️ Eliminar</button>
        </div>
      </td>
    </tr>`).join('');
}

function openCatModal(id = null) {
  document.getElementById('cat-edit-id').value = id || '';
  document.getElementById('cat-modal-title').textContent = id ? 'Editar Categoría' : 'Nueva Categoría';

  if (id) {
    const c = getCats().find(x => x.id === id);
    document.getElementById('cat-name').value = c.name;
    document.getElementById('cat-desc').value = c.desc;
  } else {
    document.getElementById('cat-name').value = '';
    document.getElementById('cat-desc').value = '';
  }

  openModal('modal-cat');
}

function editCat(id) { openCatModal(id); }

function saveCat() {
  const name = document.getElementById('cat-name').value.trim();
  const desc = document.getElementById('cat-desc').value.trim();

  if (!name) { toast('El nombre es obligatorio', 'error'); return; }

  const id   = document.getElementById('cat-edit-id').value;
  let   cats = getCats();

  if (id) {
    cats = cats.map(c => c.id === id ? { ...c, name, desc } : c);
    toast('Categoría actualizada ✓', 'success');
  } else {
    cats.push({ id: uid(), name, desc });
    toast('Categoría creada ✓', 'success');
  }

  setCats(cats);
  closeModal('modal-cat');
  renderCats();
}

function deleteCat(id) {
  if (!confirm('¿Eliminar esta categoría?')) return;
  setCats(getCats().filter(c => c.id !== id));
  toast('Categoría eliminada', 'warn');
  renderCats();
}


/* ═══════════════════════════════════════════════════════
   11. MÓDULO DE EVENTOS (ADMIN)
═══════════════════════════════════════════════════════ */
function renderEvents() {
  const events = getEvents();
  const cats   = getCats();
  const tbody  = document.getElementById('ev-tbody');

  document.getElementById('ev-count').textContent = `${events.length} evento(s)`;

  if (!events.length) {
    tbody.innerHTML = `
      <tr><td colspan="7">
        <div class="empty-state">
          <div class="empty-icon">🎤</div>
          <div class="empty-title">Sin eventos</div>
          <p>Crea tu primer evento</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = events.map(ev => {
    const cat = (cats.find(c => c.id === ev.catId) || {}).name || '—';
    return `
      <tr>
        <td><span class="badge badge-accent">${ev.code}</span></td>
        <td class="bold">${ev.name}</td>
        <td><span class="badge badge-purple">${cat}</span></td>
        <td>${ev.city}</td>
        <td>${formatDate(ev.date)}</td>
        <td class="text-accent bold">${currencyGTQ(ev.price)}</td>
        <td>
          <div class="actions-cell">
            <button class="btn btn-secondary btn-sm" onclick="editEv('${ev.id}')">✏️</button>
            <button class="btn btn-danger btn-sm"    onclick="deleteEv('${ev.id}')">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function openEvModal(id = null) {
  const cats = getCats();
  const sel  = document.getElementById('ev-cat');

  sel.innerHTML = `<option value="">Seleccionar...</option>` +
    cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  document.getElementById('ev-edit-id').value = id || '';
  document.getElementById('ev-modal-title').textContent = id ? 'Editar Evento' : 'Nuevo Evento';

  if (id) {
    const ev = getEvents().find(e => e.id === id);
    ['code','name','catId','price','date','time','city','img','desc'].forEach(f => {
      const el = document.getElementById('ev-' + (f === 'catId' ? 'cat' : f));
      if (el) el.value = ev[f] || '';
    });
  } else {
    ['code','name','price','date','time','img','desc'].forEach(f => {
      const el = document.getElementById('ev-' + f);
      if (el) el.value = '';
    });
    document.getElementById('ev-cat').value  = '';
    document.getElementById('ev-city').value = '';
  }

  openModal('modal-ev');
}

function editEv(id) { openEvModal(id); }

function saveEv() {
  const fields = {
    code: 'ev-code', name: 'ev-name', catId: 'ev-cat',
    price: 'ev-price', date: 'ev-date', time: 'ev-time',
    city: 'ev-city', img: 'ev-img', desc: 'ev-desc'
  };
  const data = {};
  for (const [k, fid] of Object.entries(fields)) {
    data[k] = document.getElementById(fid).value.trim();
  }

  if (!data.name || !data.code || !data.price || !data.date || !data.city) {
    toast('Completa los campos obligatorios', 'error');
    return;
  }

  const id     = document.getElementById('ev-edit-id').value;
  let   events = getEvents();

  if (id) {
    events = events.map(e => e.id === id ? { ...e, ...data } : e);
    toast('Evento actualizado ✓', 'success');
  } else {
    events.push({ id: uid(), ...data });
    toast('Evento creado ✓', 'success');
  }

  setEvents(events);
  closeModal('modal-ev');
  renderEvents();
}

function deleteEv(id) {
  if (!confirm('¿Eliminar este evento?')) return;
  setEvents(getEvents().filter(e => e.id !== id));
  toast('Evento eliminado', 'warn');
  renderEvents();
}


/* ═══════════════════════════════════════════════════════
   12. MÓDULO DE VENTAS (ADMIN)
═══════════════════════════════════════════════════════ */
function renderSales() {
  const sales = getSales().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById('sales-tbody');

  if (!sales.length) {
    tbody.innerHTML = `
      <tr><td colspan="6">
        <div class="empty-state">
          <div class="empty-icon">💰</div>
          <div class="empty-title">Sin ventas</div>
          <p>Las compras aparecerán aquí</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = sales.map(s => `
    <tr>
      <td><span class="badge badge-green">${s.ticketId}</span></td>
      <td>${formatDateTime(s.date)}</td>
      <td>${s.city || '—'}</td>
      <td>
        <div class="bold text-sm">${s.client.name}</div>
        <div class="text-xs text-muted">${s.client.email}</div>
      </td>
      <td class="text-accent bold">${currencyGTQ(s.total)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openSaleDetail('${s.id}')">Ver detalle</button>
      </td>
    </tr>`).join('');
}

function openSaleDetail(id) {
  const s = getSales().find(x => x.id === id);
  if (!s) return;

  document.getElementById('sale-detail-body').innerHTML = `
    <div class="flex gap-3 items-center" style="margin-bottom:16px">
      <span class="badge badge-green" style="font-size:14px;padding:6px 14px">${s.ticketId}</span>
      <span class="text-muted text-sm">${formatDateTime(s.date)}</span>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div>
        <div class="text-xs text-muted" style="margin-bottom:4px">CLIENTE</div>
        <div class="bold">${s.client.name}</div>
        <div class="text-sm text-muted">${s.client.id}</div>
      </div>
      <div>
        <div class="text-xs text-muted" style="margin-bottom:4px">CONTACTO</div>
        <div class="text-sm">${s.client.email}</div>
        <div class="text-sm">${s.client.phone}</div>
      </div>
      <div>
        <div class="text-xs text-muted" style="margin-bottom:4px">DIRECCIÓN</div>
        <div class="text-sm">${s.client.address}</div>
      </div>
      <div>
        <div class="text-xs text-muted" style="margin-bottom:4px">CIUDAD</div>
        <div class="text-sm">${s.city || '—'}</div>
      </div>
    </div>

    <div style="margin-bottom:12px;font-weight:700;font-size:13px;color:var(--text2)">
      ENTRADAS COMPRADAS
    </div>

    <div class="sale-items-list">
      ${s.items.map(it => `
        <div class="sale-item-row">
          <div style="flex:1">
            <div class="bold text-sm">${it.name}</div>
            <div class="text-xs text-muted">${it.city} · ${formatDate(it.date)}</div>
          </div>
          <div class="text-sm text-muted">× ${it.qty}</div>
          <div class="text-accent bold">${currencyGTQ(it.price * it.qty)}</div>
        </div>`).join('')}
    </div>

    <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border);
                display:flex;justify-content:space-between;align-items:center">
      <span style="font-weight:700;font-size:16px">Total</span>
      <span style="font-family:var(--font-head);font-size:24px;font-weight:800;color:var(--accent)">
        ${currencyGTQ(s.total)}
      </span>
    </div>`;

  openModal('modal-sale-detail');
}


/* ═══════════════════════════════════════════════════════
   13. VISTA CLIENTE — FILTROS Y EVENTOS
═══════════════════════════════════════════════════════ */
function renderClientFilters() {
  const cats = getCats();
  const sel  = document.getElementById('filter-cat');
  sel.innerHTML = `<option value="">Todas las categorías</option>` +
    cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function filterEvents() {
  const q     = document.getElementById('search-input').value.toLowerCase();
  const city  = document.getElementById('filter-city').value;
  const catId = document.getElementById('filter-cat').value;

  const events = getEvents().filter(ev => {
    const matchQ    = !q    || ev.name.toLowerCase().includes(q) || (ev.desc || '').toLowerCase().includes(q);
    const matchCity = !city || ev.city === city;
    const matchCat  = !catId || ev.catId === catId;
    return matchQ && matchCity && matchCat;
  });

  renderEventCards(events);
}

function ShowEvents() {
  renderEventCards(getEvents());
}

function renderEventCards(events) {
  const grid = document.getElementById('events-grid');
  const rc   = document.getElementById('results-count');

  rc.textContent = `Mostrando ${events.length} evento(s)`;

  if (!events.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🎵</div>
        <div class="empty-title">Sin resultados</div>
        <p>Intenta con otros filtros</p>
      </div>`;
    return;
  }

  grid.innerHTML = '';
  events.forEach(ev => {
    const card = document.createElement('event-card-wc');
    card.setAttribute('data', JSON.stringify(ev));
    grid.appendChild(card);
  });
}


/* ═══════════════════════════════════════════════════════
   14. VISTA DE DETALLE DEL EVENTO
═══════════════════════════════════════════════════════ */
function openDetail(id) {
  const ev = getEvents().find(e => e.id === id);
  if (!ev) return;

  const cat    = (getCats().find(c => c.id === ev.catId) || {}).name || '—';
  const hasImg = ev.img && ev.img.trim() !== '';

  document.getElementById('detail-content').innerHTML = `
    <div>
      ${hasImg
        ? `<img class="detail-img" src="${ev.img}" alt="${ev.name}" onerror="this.style.display='none'">`
        : `<div class="detail-img"
               style="display:flex;align-items:center;justify-content:center;
                      font-size:80px;background:var(--surface2)">🎵</div>`}
    </div>
    <div>
      <span class="badge badge-purple" style="margin-bottom:14px">${cat}</span>
      <div class="detail-title">${ev.name}</div>
      <div class="detail-desc">${ev.desc || 'Sin descripción disponible.'}</div>
      <div class="detail-info">
        <div class="detail-info-row"><span>📅</span><span>${formatDate(ev.date)}</span></div>
        <div class="detail-info-row"><span>⏰</span><span>${ev.time} hrs</span></div>
        <div class="detail-info-row"><span>📍</span><span>${ev.city}, Guatemala</span></div>
        <div class="detail-info-row"><span>🏷️</span><span>${cat}</span></div>
        <div class="detail-info-row"><span>🔑</span><span>${ev.code}</span></div>
      </div>
      <div class="detail-price">${currencyGTQ(ev.price)}</div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" onclick="showPage('client')">← Volver</button>
        <button class="btn btn-primary"
                onclick="addToCart('${ev.id}'); showPage('client')">
          🛒 Agregar al carrito
        </button>
      </div>
    </div>`;

  updateCartBadge();
  showPage('detail');
}


/* ═══════════════════════════════════════════════════════
   15. CARRITO DE COMPRAS
═══════════════════════════════════════════════════════ */

/** Agrega un evento al carrito o incrementa su cantidad */
function addToCart(eventId) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === eventId);

  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    const ev = getEvents().find(e => e.id === eventId);
    if (!ev) return;
    cart.push({
      id:    ev.id,
      name:  ev.name,
      price: parseFloat(ev.price),
      img:   ev.img,
      city:  ev.city,
      date:  ev.date,
      qty:   1
    });
  }

  setCart(cart);
  const nombre = cart.find(i => i.id === eventId).name;
  toast(`✓ "${nombre}" agregado al carrito`, 'success');
  updateCartBadge();
}

/** Actualiza el contador del badge del carrito */
function updateCartBadge() {
  const total = getCart().reduce((a, i) => a + i.qty, 0);
  ['cart-badge', 'cart-badge-detail'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = total;
  });
}

/** Abre el modal del carrito */
function openCart() {
  renderCart();
  openModal('modal-cart');
}

/** Renderiza el contenido del carrito */
function renderCart() {
  const cart   = getCart();
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');

  if (!cart.length) {
    body.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <div class="empty-title">Carrito vacío</div>
        <p>Agrega eventos para continuar</p>
      </div>`;
    footer.innerHTML = `<button class="btn btn-secondary" onclick="closeModal('modal-cart')">Cerrar</button>`;
    return;
  }

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const totalEntradas = cart.reduce((a, i) => a + i.qty, 0);

  body.innerHTML = `
    ${cart.map(item => `
      <div class="cart-item">
        ${item.img
          ? `<img class="cart-item-img" src="${item.img}" onerror="this.style.display='none'">`
          : `<div class="cart-item-img"
                 style="display:flex;align-items:center;justify-content:center;font-size:24px">🎵</div>`}
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${currencyGTQ(item.price)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">🗑️</button>
      </div>`).join('')}

    <div class="cart-total-row">
      <span class="cart-total-label">Total (${totalEntradas} entradas)</span>
      <span class="cart-total-val">${currencyGTQ(total)}</span>
    </div>`;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal('modal-cart')">Seguir comprando</button>
    <button class="btn btn-success"   onclick="closeModal('modal-cart'); openCheckout()">
      💳 Comprar ahora
    </button>`;
}

/** Cambia la cantidad de un ítem del carrito */
function changeQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx < 0) return;

  cart[idx].qty = Math.max(0, cart[idx].qty + delta);
  if (cart[idx].qty === 0) cart.splice(idx, 1);

  setCart(cart);
  renderCart();
}

/** Elimina un ítem del carrito */
function removeFromCart(id) {
  setCart(getCart().filter(i => i.id !== id));
  toast('Entrada eliminada del carrito', 'warn');
  renderCart();
}


/* ═══════════════════════════════════════════════════════
   16. CHECKOUT / COMPRA
═══════════════════════════════════════════════════════ */

/** Abre el formulario de checkout */
function openCheckout() {
  const cart = getCart();
  if (!cart.length) { toast('Tu carrito está vacío', 'error'); return; }

  // Restaurar título y formulario
  document.getElementById('modal-checkout').querySelector('.modal-title').textContent = 'Datos del Comprador';
  document.getElementById('modal-checkout').querySelector('.modal-footer').innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal('modal-checkout')">Cancelar</button>
    <button class="btn btn-success"   onclick="doCheckout()">✓ Confirmar Compra</button>`;
  document.getElementById('checkout-body').innerHTML = `
    <div class="grid-2">
      <div class="form-group">
        <label>Número de identificación</label>
        <input id="ch-id"      class="input" placeholder="DPI / Pasaporte">
      </div>
      <div class="form-group">
        <label>Nombre completo</label>
        <input id="ch-name"    class="input" placeholder="Tu nombre">
      </div>
      <div class="form-group">
        <label>Teléfono</label>
        <input id="ch-phone"   class="input" placeholder="+502...">
      </div>
      <div class="form-group">
        <label>Correo electrónico</label>
        <input id="ch-email"   class="input" type="email" placeholder="correo@ejemplo.com">
      </div>
    </div>
    <div class="form-group">
      <label>Dirección</label>
      <input id="ch-address" class="input" placeholder="Tu dirección">
    </div>`;

  openModal('modal-checkout');
}

/** Procesa la compra y guarda la venta */
function doCheckout() {
  const id      = document.getElementById('ch-id').value.trim();
  const name    = document.getElementById('ch-name').value.trim();
  const phone   = document.getElementById('ch-phone').value.trim();
  const email   = document.getElementById('ch-email').value.trim();
  const address = document.getElementById('ch-address').value.trim();

  if (!id || !name || !phone || !email || !address) {
    toast('Completa todos los campos', 'error');
    return;
  }

  const cart     = getCart();
  const total    = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const cities   = [...new Set(cart.map(i => i.city))].join(', ');
  const ticketId = 'TK-' + uid().toUpperCase().slice(0, 8);

  const sale = {
    id: uid(), ticketId,
    date:   new Date().toISOString(),
    city:   cities,
    client: { id, name, phone, email, address },
    items:  cart.map(i => ({ ...i })),
    total
  };

  const sales = getSales();
  sales.push(sale);
  setSales(sales);
  setCart([]);

  closeModal('modal-checkout');
  showSuccessModal(sale);
}

/** Muestra el modal de compra exitosa con datos de la boleta */
function showSuccessModal(sale) {
  document.getElementById('modal-checkout').querySelector('.modal-title').textContent = '¡Compra Realizada!';

  document.getElementById('checkout-body').innerHTML = `
    <div class="checkout-success">
      <div class="success-icon">🎉</div>
      <div class="success-title">¡Compra Realizada con Éxito!</div>
      <p class="text-muted">Tu boleta ha sido asignada. ¡Disfruta el evento!</p>
      <div class="success-ticket">
 
        <div style="margin-top:12px;display:flex;flex-direction:column;gap:6px">
          <div class="text-sm"><span class="text-muted">Cliente:</span> ${sale.client.name}</div>
          <div class="text-sm"><span class="text-muted">Entradas:</span> ${sale.items.reduce((a, i) => a + i.qty, 0)}</div>
          <div class="text-sm"><span class="text-muted">Total:</span>
            <strong class="text-accent">${currencyGTQ(sale.total)}</strong>
          </div>
          <div class="text-sm"><span class="text-muted">Fecha:</span> ${formatDateTime(sale.date)}</div>
        </div>
      </div>
    </div>`;

  document.getElementById('modal-checkout').querySelector('.modal-footer').innerHTML =
    `<button class="btn btn-primary" onclick="closeModal('modal-checkout')">✓ Aceptar</button>`;

  openModal('modal-checkout');
  toast('🎉 ¡Compra realizada! Boleta: ' + sale.ticketId, 'success');
}


/* ═══════════════════════════════════════════════════════
   17. INICIALIZACIÓN
═══════════════════════════════════════════════════════ */
seedData();
updateCartBadge();
showPage('client');
renderClientFilters();
ShowEvents();

// Enter key en el login
document.getElementById('login-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
