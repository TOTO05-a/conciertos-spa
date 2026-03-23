import { state, save } from '../js/state.js'
import { EventCard } from '../components/EventCard.js'
import { toast } from '../js/utils.js'

export const Home = () => {

  setTimeout(() => {

    const render = () => {
      const text = search.value.toLowerCase()
      const city = cityFilter.value
      const cat = catFilter.value

      const filtered = state.events.filter(e =>
        e.name.toLowerCase().includes(text) &&
        (!city || e.city === city) &&
        (!cat || e.category === cat)
      )

      list.innerHTML = filtered.length
        ? filtered.map(EventCard).join('')
        : `<p>No hay eventos</p>`

      console.log("Eventos filtrados:", filtered)
    }

    document.querySelectorAll('.buy').forEach(btn => {
      btn.onclick = () => {
        const ev = state.events.find(e => e.id === btn.dataset.id)
        state.cart.push(ev)
        save()
        toast("Agregado al carrito")
        console.log("Carrito:", state.cart)
      }
    })

    search.oninput = render
    cityFilter.onchange = render
    catFilter.onchange = render

    render()
  })

  return `
  <h1 class="text-2xl mb-4">Eventos</h1>

  <input id="search" placeholder="Buscar..." class="text-black p-2 mb-2 w-full">

  <div class="flex gap-2 mb-4">
    <select id="cityFilter" class="text-black p-2">
      <option value="">Ciudad</option>
      <option>Bogota</option>
      <option>Medellin</option>
      <option>Barranquilla</option>
      <option>Bucaramanga</option>
    </select>

    <select id="catFilter" class="text-black p-2">
      <option value="">Categoria</option>
      ${state.categories.map(c => `<option>${c.name}</option>`).join('')}
    </select>
  </div>

  <div id="list" class="grid md:grid-cols-3 gap-4"></div>
  `
}