/* ═══════════════════════════════════════════════════════
   CONCIERTOS CONECTADOS — components.js
   Web Components personalizados
═══════════════════════════════════════════════════════ */

/* ── Web Component: <event-card-wc> ─────────────────────
   Uso: <event-card-wc data='{"id":"...","name":"..."}'></event-card-wc>
   Renderiza la tarjeta de un evento en la vista de clientes.
──────────────────────────────────────────────────────── */
class EventCardWC extends HTMLElement {
  connectedCallback() {
    const data   = JSON.parse(this.getAttribute('data') || '{}');
    const hasImg = data.img && data.img.trim() !== '';
    const cat    = (getCats().find(c => c.id == data.catId) || {}).name || '—';

    this.innerHTML = `
      <div class="event-card" onclick="openDetail('${data.id}')">

        ${hasImg
          ? `<img
               class="event-img"
               src="${data.img}"
               alt="${data.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
             >`
          : ''}

        <div class="event-img-placeholder" ${hasImg ? 'style="display:none"' : ''}>🎵</div>

        <div class="event-body">
          <div class="event-name">${data.name}</div>
          <div class="event-meta">
            <span>📅 ${formatDate(data.date)} · ⏰ ${data.time}</span>
            <span>📍 ${data.city}</span>
            <span><span class="badge badge-purple">${cat}</span></span>
          </div>
          <div class="event-price">Q ${parseFloat(data.price).toFixed(2)}</div>
          <div class="event-footer">
            <button
              class="btn btn-primary btn-sm"
              onclick="event.stopPropagation(); addToCart('${data.id}')">
              + Agregar
            </button>
            <button
              class="btn btn-secondary btn-sm"
              onclick="event.stopPropagation(); openDetail('${data.id}')">
              Ver más
            </button>
          </div>
        </div>

      </div>`;
  }
}
customElements.define('event-card-wc', EventCardWC);


/* ── Web Component: <stat-card-wc> ──────────────────────
   Uso: <stat-card-wc label="Ventas" value="12" sub="Pedidos" icon="💰"></stat-card-wc>
   Renderiza una tarjeta de estadística en el dashboard.
──────────────────────────────────────────────────────── */
class StatCardWC extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '0';
    const sub   = this.getAttribute('sub')   || '';
    const icon  = this.getAttribute('icon')  || '📊';

    this.innerHTML = `
      <div class="stat-card">
        <div class="stat-label">${icon} ${label}</div>
        <div class="stat-value">${value}</div>
        ${sub ? `<div class="stat-sub">${sub}</div>` : ''}
      </div>`;
  }
}
customElements.define('stat-card-wc', StatCardWC);


/* ── Web Component: <toast-wc> ──────────────────────────
   Uso: <toast-wc msg="Texto" type="success|error|warn|info"></toast-wc>
   Muestra una notificación flotante temporal (3 segundos).
──────────────────────────────────────────────────────── */
class ToastWC extends HTMLElement {
  connectedCallback() {
    const msg  = this.getAttribute('msg')  || '';
    const type = this.getAttribute('type') || 'info';

    this.innerHTML = `<div class="toast ${type}">${msg}</div>`;

    setTimeout(() => {
      const el = this.querySelector('.toast');
      if (el) el.style.animation = 'fadeOut .3s ease forwards';
      setTimeout(() => this.remove(), 300);
    }, 3000);
  }
}
customElements.define('toast-wc', ToastWC);
