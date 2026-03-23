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
<h1 class="text-3xl font-bold mb-4">🎤 Eventos Disponibles</h1>

<input id="search" placeholder="Buscar eventos..."
  class="text-black p-3 mb-3 w-full rounded shadow">

<div class="flex gap-3 mb-5 flex-wrap">

  <select id="cityFilter" class="text-black p-2 rounded">
    <option value="">Ciudad</option>
    <option>Bogota</option>
    <option>Medellin</option>
    <option>Barranquilla</option>
    <option>Bucaramanga</option>
  </select>

  <select id="catFilter" class="text-black p-2 rounded">
    <option value="">Categoria</option>
    ${state.categories.map(c => `<option>${c.name}</option>`).join('')}
  </select>

</div>

<div id="list" class="grid md:grid-cols-3 gap-6"></div>
`
} 
