import { state, save } from '../js/state.js'

export const Login = () => {

  setTimeout(() => {
    form.onsubmit = (e) => {
      e.preventDefault()

      console.log("Intento login:", email.value)

      if (email.value === "admin@mail.com" && password.value === "123456") {
        state.user = { email: email.value, role: "admin" }
        save()
        alert("Login exitoso")
        location.hash = "#/dashboard"
      } else {
        console.warn("Credenciales incorrectas")
        alert("Credenciales incorrectas")
      }
    }
  })

  return `
  <form id="form" class="max-w-sm mx-auto bg-gray-800 p-6 rounded">
    <h2 class="mb-4 text-xl">Admin Login</h2>
    <input id="email" placeholder="Email" class="text-black w-full mb-2 p-2">
    <input id="password" type="password" placeholder="Password" class="text-black w-full mb-2 p-2">
    <button class="bg-blue-500 w-full py-2">Entrar</button>
  </form>`
}