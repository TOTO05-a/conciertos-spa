import { state, save } from '../js/state.js'

class Navbar extends HTMLElement {
  connectedCallback() { this.render() }

  render() {
  this.innerHTML = `
  <nav class="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 flex justify-between items-center shadow-lg">
    
    <h1 class="font-bold text-xl tracking-wide">🎧 PulseX</h1>
    
    <div class="flex items-center gap-4">
      <a href="#/" class="hover:underline">Inicio</a>

      ${state.user?.role === 'admin'
        ? `<a href="#/dashboard" class="hover:underline">Admin</a>`
        : ''}

      <button id="cart" class="bg-black/30 px-3 py-1 rounded">
        🛒 ${state.cart.length}
      </button>

      ${state.user
        ? `<button id="logout" class="bg-red-500 px-3 py-1 rounded">Salir</button>`
        : `<a href="#/login" class="bg-white text-black px-3 py-1 rounded">Login</a>`}
    </div>
  </nav>`

  setTimeout(() => {
    const btn = document.getElementById('logout')
    if (btn) btn.onclick = () => {
      state.user = null
      save()
      location.hash = '#/'
    }

    const cart = document.getElementById('cart')
    if (cart) {
      cart.onclick = () => import('../components/Modal.js')
        .then(({ modal }) => modal().openCart())
    }
  })
  }
}

customElements.define('app-navbar', Navbar) 
