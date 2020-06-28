import Home from '../Home'

class Page {
  constructor(
    route,
    component,
    name,
    visible = true,
    admin = false,
    icon = null
  ) {
    this.route = route
    this.component = component
    this.name = name
    this.visible = visible
    this.admin = admin
    this.icon = icon
  }
}

export default {
  mainPages: [new Page(['/home'], Home, 'Home')],
}
