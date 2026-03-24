export const EventCard = (e) => `
<div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

  <img src="${e.image}" class="h-48 w-full object-cover">

  <div class="p-4 space-y-2">
    <h2 class="text-lg font-bold">${e.name}</h2>
    <p class="text-sm text-gray-400">${e.city}</p>
    <p class="text-sm">${e.date} • ${e.time}</p>

    <p class="text-green-400 font-bold text-lg">$${e.price}</p>

    <div class="flex justify-between items-center mt-2">
      <a href="#/event/${e.id}" class="text-blue-400 hover:underline">Ver</a>

      <button data-id="${e.id}" 
        class="buy bg-green-600 px-3 py-1 rounded hover:bg-green-700">
        Agregar
      </button>
    </div>
  </div>
</div>
`
