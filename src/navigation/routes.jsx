import React from 'react'
import Home from '../Home'
import Search from '../Search/Search'

class Page {
  constructor(route, component, name, visible = true, admin = false, icon = null) {
    this.route = route
    this.component = component
    this.name = name
    this.visible = visible
    this.admin = admin
    this.icon = icon
  }
}

export default {
  mainPages: [
    new Page(['/home'], Home, 'Home'),
    new Page(['/search'], Search, 'Search'),
  ],
  userPages: [
		new Page(['/details'], <></>, 'Details'),
		new Page(['/clients'], <></>, 'Clients'),
		new Page(['/datalog'], <></>, 'Data Log'),
	],
}
