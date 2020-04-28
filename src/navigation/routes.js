import Home from '../Home';

/**
 * A single page of the Levy Gorvy application
 * @param {string[]} route - the routes (array) that direct to the page
 * @param {any} component - the reference to the component
 * @param {string} name - the name of the page, used in navigation
 */

function Page(route, component, name, visible = true, admin = false, icon = null) {
  this.route = route;
  this.component = component;
  this.name = name;
  this.visible = visible;
  this.admin = admin;
  this.icon = icon;
}

export default {

  mainPages: [
    new Page(['/home'], Home, 'Home'),
    // new Page(["/contacts/:id"], Contact, "Contact Detail", false),
  ],
};
