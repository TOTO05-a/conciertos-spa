import { state, save } from '../js/state.js'
import { toast } from '../js/utils.js'

export const EventDetail = (id) => {

  const e = state.events.find(x => x.id == id)

  // 🛑 VALIDACIÓN CLAVE
  if (!e) {
    return `<h1>Evento no encontrado</h1>
    <a href="#/">Volver</a>`
  }

  setTimeout(() => {
    const btn = document.getElementById('buy')

    if (btn) {
      btn.onclick = () => {
        state.cart.push(e)
        save()
        toast("Agregado al carrito")
        console.log("Carrito:", state.cart)
      }
    }
  })

 return `
<div class="max-w-3xl mx-auto">

  <img src="${e.image}" class="w-full rounded mb-4">

  <h1 class="text-3xl font-bold mb-2">${e.name}</h1>

  <p class="text-gray-400 mb-2">${e.city}</p>

  <p class="mb-2">${e.date} • ${e.time}</p>

  <p class="mb-4">${e.description}</p>

  <p class="text-green-400 text-2xl font-bold mb-4">$${e.price}</p>

  <button id="buy"
    class="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
    Comprar entrada
  </button>

  <a href="#/" class="block mt-4 text-blue-400">← Volver</a>

</div>
`
} 