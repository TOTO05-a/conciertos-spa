import { state, save } from '../js/state.js'
import { uid } from '../js/utils.js'

export const Events = () => {

  setTimeout(() => {

    form.onsubmit = (e) => {
      e.preventDefault()

      const event = {
        id: uid(),
        name: name.value,
        category: category.value,
        price: Number(price.value),
        city: city.value,
        date: date.value,
        time: time.value,
        image: image.value,
        description: description.value
      }

      console.log("Evento creado:", event)

      state.events.push(event)
      save()
      location.reload()
    }

    document.querySelectorAll('.delete').forEach(btn => {
      btn.onclick = () => {
        state.events = state.events.filter(e => e.id !== btn.dataset.id)
        save()
        location.reload()
      }
    })

  })

  return `
  <h1 class="text-xl mb-4">Eventos</h1>

  <form id="form" class="grid gap-2 mb-4">
    <input id="name" placeholder="Nombre" class="text-black p-2">
    <input id="price" placeholder="Precio" class="text-black p-2">
    <input id="date" type="date" class="text-black p-2">
    <input id="time" type="time" class="text-black p-2">

    <select id="city" class="text-black p-2">
      <option>Bogota</option>
      <option>Medellin</option>
      <option>Barranquilla</option>
      <option>Bucaramanga</option>
    </select>

    <select id="category" class="text-black p-2">
      ${state.categories.map(c => `<option>${c.name}</option>`).join('')}
    </select>

    <input id="image" placeholder="Imagen URL" class="text-black p-2">
    <textarea id="description" placeholder="Descripcion" class="text-black p-2"></textarea>

    <button class="bg-blue-500 py-2">Crear</button>
  </form>

  <div>
    ${state.events.map(e => `
      <div class="bg-gray-800 p-2 mb-2">
        ${e.name} - ${e.city}
        <button class="delete bg-red-500 px-2" data-id="${e.id}">X</button>
      </div>
    `).join('')}
  </div>
  `
}