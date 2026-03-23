import { state, save } from '../js/state.js'

class Navbar extends HTMLElement {
  connectedCallback() { this.render() }

  render() {
    this.innerHTML = `
    <nav class="bg-gray-900 p-4 flex justify-between">
      <h1 class="font-bold">PulseX</h1>
      <div>
        <a href="#/">Inicio</a>
        ${state.user?.role === 'admin' ? `<a href="#/dashboard">Admin</a>` : ''}
        <button id="cart">🛒 (${state.cart.length})</button>
        ${state.user
        ? `<button id="logout">Salir</button>`
        : `<a href="#/login">Login</a>`}
      </div>
    </nav>`

    setTimeout(() => {
      const btn = document.getElementById('logout')
      if (btn) btn.onclick = () => {
        state.user = null
        save()
        location.hash = '#/'
      }
    })
  }
}

customElements.define('app-navbar', Navbar)