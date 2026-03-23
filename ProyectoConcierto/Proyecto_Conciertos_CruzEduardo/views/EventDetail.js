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
  <div>
    <h1 class="text-2xl">${e.name}</h1>
    <img src="${e.image}" class="w-full max-w-md">
    <p>${e.description || 'Sin descripción'}</p>
    <p>${e.city}</p>
    <p>${e.date || ''} - ${e.time || ''}</p>
    <p>$${e.price}</p>

    <button id="buy" class="bg-green-500 px-3 py-2 mt-2">Agregar</button>
    <a href="#/" class="block mt-2 text-blue-400">Volver</a>
  </div>
  `
}