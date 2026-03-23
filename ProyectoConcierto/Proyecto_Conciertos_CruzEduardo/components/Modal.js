import { state, save } from '../js/state.js'
import { toast, validateEmail, uid } from '../js/utils.js'

class Modal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="modal" class="hidden fixed inset-0 bg-black/70 flex items-center justify-center">
      <div id="content" class="bg-gray-800 p-6 rounded w-96"></div>
    </div>`
  }

  open(html) {
    document.getElementById('modal').classList.remove('hidden')
    document.getElementById('content').innerHTML = html
  }

  openCart() {
    const total = state.cart.reduce((a, b) => a + b.price, 0)

    this.open(`
      <h2>Carrito</h2>
      ${state.cart.map(i => `<div>${i.name} - $${i.price}</div>`).join('')}
      <p>Total: $${total}</p>
      <button id="buy">Comprar</button>
    `)

    setTimeout(() => {
      document.getElementById('buy').onclick = () => this.form()
    })
  }

  form() {
    this.open(`
      <h2>Datos</h2>
      <input id="name" placeholder="Nombre" class="text-black w-full mb-2">
      <input id="id" placeholder="Identificación" class="text-black w-full mb-2">
      <input id="address" placeholder="Dirección" class="text-black w-full mb-2">
      <input id="phone" placeholder="Teléfono" class="text-black w-full mb-2">
      <input id="email" placeholder="Email" class="text-black w-full mb-2">
      <button id="confirm">Confirmar</button>
    `)

    document.getElementById('confirm').onclick = () => {
      const name = document.getElementById('name').value
      const email = document.getElementById('email').value

      if (!name || !validateEmail(email)) {
        alert("Datos inválidos")
        return
      }

      const sale = {
        id: uid(),
        client: { name, email },
        items: [...state.cart],
        total: state.cart.reduce((a, b) => a + b.price, 0),
        date: new Date().toISOString()
      }

      console.log("Venta creada:", sale)

      state.sales.unshift(sale)
      state.cart = []
      save()

      alert("Compra realizada 🎟️")
      this.close()
    }
  }

  close() {
    document.getElementById('modal').classList.add('hidden')
  }
}

customElements.define('app-modal', Modal)
export const modal = () => document.querySelector('app-modal')