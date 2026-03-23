import '../components/Navbar.js'
import '../components/Modal.js'

import { addRoute, navigate } from './router.js'

import { Home } from '../views/Home.js'
import { Login } from '../views/Login.js'
import { Dashboard } from '../views/Dashboard.js'
import { Events } from '../views/Events.js'
import { Categories } from '../views/Categories.js'
import { Sales } from '../views/Sales.js'
import { EventDetail } from '../views/EventDetail.js'

addRoute('#/', Home)
addRoute('#/login', Login)
addRoute('#/dashboard', Dashboard, 'admin')
addRoute('#/events', Events, 'admin')
addRoute('#/categories', Categories, 'admin')
addRoute('#/sales', Sales, 'admin')
addRoute('#/event/:id', EventDetail)

navigate(location.hash || '#/')