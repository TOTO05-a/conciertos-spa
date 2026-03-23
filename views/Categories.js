import { state, save } from '../js/state.js'
import { uid } from '../js/utils.js'

export const Categories = () => {

  setTimeout(() => {

    form.onsubmit = (e) => {
      e.preventDefault()

      const cat = {
        id: uid(),
        name: name.value,
        description: desc.value
      }

      console.log("Categoria creada:", cat)

      state.categories.push(cat)
      save()
      location.reload()
    }

    document.querySelectorAll('.delete').forEach(btn => {
      btn.onclick = () => {
        state.categories = state.categories.filter(c => c.id !== btn.dataset.id)
        save()
        location.reload()
      }
    })

  })

  return `
  <h1 class="text-xl mb-4">Categorias</h1>

  <form id="form" class="grid gap-2 mb-4">
    <input id="name" placeholder="Nombre" class="text-black p-2">
    <input id="desc" placeholder="Descripcion" class="text-black p-2">
    <button class="bg-green-500 py-2">Agregar</button>
  </form>

  ${state.categories.map(c => `
    <div class="bg-gray-800 p-2 mb-2">
      ${c.name}
      <button class="delete bg-red-500 px-2" data-id="${c.id}">X</button>
    </div>
  `).join('')}
  `
}