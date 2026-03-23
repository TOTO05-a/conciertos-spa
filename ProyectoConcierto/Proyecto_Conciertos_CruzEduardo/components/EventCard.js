export const EventCard = (e) => `
<div class="bg-gray-800 p-3 rounded hover:scale-105 transition">
  <img src="${e.image}" class="h-40 w-full object-cover">
  <h2 class="text-lg">${e.name}</h2>
  <p>${e.city}</p>
  <p>${e.date} - ${e.time}</p>
  <p class="font-bold">$${e.price}</p>

  <a href="#/event/${e.id}" class="text-blue-400 block">Ver</a>

  <button data-id="${e.id}" class="buy bg-green-600 mt-2 px-2 py-1 w-full">
    Agregar
  </button>
</div>
`