export const uid = () => Date.now().toString()

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const toast = (msg) => {
  const t = document.createElement('div')
  t.className = "fixed bottom-5 right-5 bg-green-600 px-4 py-2 rounded shadow"
  t.innerText = msg
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 2500)
}