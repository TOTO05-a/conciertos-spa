export const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  events: JSON.parse(localStorage.getItem('events')) || [],
  categories: JSON.parse(localStorage.getItem('categories')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  sales: JSON.parse(localStorage.getItem('sales')) || []
}

export const save = () => {
  Object.keys(state).forEach(k => {
    localStorage.setItem(k, JSON.stringify(state[k]))
  })
}