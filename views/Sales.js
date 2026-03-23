import { state } from '../js/state.js'

export const Sales = () => {

  const sorted = [...state.sales].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return `
  <h1 class="text-xl mb-4">Ventas</h1>

  ${sorted.map(s => `
    <div class="bg-gray-800 p-3 mb-3">
      <p><b>${s.client.name}</b> (${s.client.email})</p>
      <p>Total: $${s.total}</p>
      <p>${new Date(s.date).toLocaleString()}</p>
    </div>
  `).join('')}
  `
}