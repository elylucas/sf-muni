import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() content;
  @Input() routes: Route[];
  @Output() addRoute = new EventEmitter<Route>();
  @Output() removeRoute = new EventEmitter<Route>();
  selectedRoutes = {};

  constructor() {

  }

  open(event: any, route: Route) {
    event.checked ? this.addRoute.emit(route) : this.removeRoute.emit(route);
  }


}
