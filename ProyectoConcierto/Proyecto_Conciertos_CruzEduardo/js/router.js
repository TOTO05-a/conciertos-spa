import { state } from './state.js'

const routes = {}

export const addRoute = (path, view, role = null) => {
  routes[path] = { view, role }
}

export const navigate = (path) => {
  console.log("Navegando a:", path)

  const dynamic = Object.keys(routes).find(r => r.includes(':'))
  if (dynamic && path.startsWith(dynamic.split('/:')[0])) {
    const id = path.split('/')[2]
    return document.getElementById('app').innerHTML =
      routes[dynamic].view(id)
  }

  const route = routes[path]
  if (!route) return

  if (route.role && (!state.user || state.user.role !== route.role)) {
    alert("Acceso denegado")
    location.hash = '#/login'
    return
  }

  document.getElementById('app').innerHTML = route.view()
}

window.addEventListener('hashchange', () => navigate(location.hash))