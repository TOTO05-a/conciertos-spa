# 🎵 Conciertos Conectados

Plataforma web para gestión y venta de entradas a conciertos y eventos en Guatemala.

---

## 🚀 Cómo ejecutar en VS Code

### Opción 1 — Live Server (Recomendada)
1. Instala la extensión **Live Server** de Ritwick Dey en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Haz clic derecho sobre `index.html`
4. Selecciona **"Open with Live Server"**
5. El navegador se abre automáticamente en `http://127.0.0.1:5500`

### Opción 2 — Abrir directamente
1. Haz doble clic en `index.html`
2. Se abre en tu navegador sin necesidad de servidor

---

## 🔐 Credenciales de Administrador

| Campo | Valor |
|-------|-------|
| Email | admin@mail.com |
| Contraseña | 123456 |

---

## 📁 Estructura del Proyecto

```
conciertos-conectados/
│
├── index.html      ← Aplicación completa (HTML + CSS + JS embebido)
└── README.md       ← Este archivo
```

> El proyecto es una SPA (Single Page Application) en un solo archivo.
> No requiere npm, instalación ni backend.

---

## ✨ Funcionalidades

### 🌐 Front de Clientes (público)
- Buscador en tiempo real por nombre de evento
- Filtro por ciudad: Guatemala, Quetzaltenango, Escuintla, Antigua
- Filtro por categoría musical
- Vista de detalle del evento
- Carrito de compras con contador de entradas (+/−)
- Checkout con generación de boleta única (ej: TK-A3F8C2D1)

### 🔒 Panel de Administración
- Dashboard con estadísticas en tiempo real
- Módulo de Categorías — CRUD completo
- Módulo de Eventos — CRUD completo con todos los campos
- Módulo de Ventas — historial ordenado por fecha con detalle

---

## 🧩 Web Components implementados

| Componente | Uso |
|---|---|
| `<event-card-wc>` | Tarjeta de evento en la vista cliente |
| `<stat-card-wc>` | Tarjeta de estadística en el dashboard admin |
| `<toast-wc>` | Notificación emergente de confirmación o error |

---

## 💾 Datos en localStorage

| Clave | Contenido |
|---|---|
| `cc_cats` | Categorías |
| `cc_events` | Eventos |
| `cc_sales` | Ventas realizadas |
| `cc_cart` | Carrito actual del usuario |
| `cc_seeded` | Bandera para datos de ejemplo iniciales |

---

## 🏙️ Ciudades disponibles
- Guatemala (Ciudad Capital)
- Quetzaltenango
- Escuintla
- Antigua Guatemala

---

## 🛠️ Stack Tecnológico
- HTML5 + CSS3 + JavaScript ES6+
- Web Components nativos (sin frameworks)
- localStorage para persistencia
- Google Fonts: Syne + DM Sans
- Sin dependencias externas ni npm

---

## 📝 Conventional Commits para GitHub

```bash
git init
git add .
git commit -m "feat: initial project structure"

git commit -m "feat: client view with event grid and hero section"
git commit -m "feat: real-time search and city/category filters"
git commit -m "feat: event detail page with back button"
git commit -m "feat: shopping cart with quantity counter"
git commit -m "feat: checkout form and ticket generation"
git commit -m "feat: admin login with redirect to client view"
git commit -m "feat: admin dashboard with stat-card-wc component"
git commit -m "feat: categories CRUD module"
git commit -m "feat: events CRUD module"
git commit -m "feat: sales module with detail view"
git commit -m "feat: web components event-card-wc and toast-wc"
git commit -m "style: cold color palette with CSS custom properties"
git commit -m "style: responsive layout for mobile and tablet"
git commit -m "docs: add README with setup instructions"
```

---

## 👤 Autor
Proyecto académico individual — Conciertos Conectados  
Repositorio: `Proyecto_Conciertos_ApellidoNombre`
