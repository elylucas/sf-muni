import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Menu } from 'ionic-angular';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  @ViewChild('menu') menu: Menu;
  @Input() content;
  @Input() routes: Route[];
  @Output() addRoute = new EventEmitter<Route>();
  @Output() removeRoute = new EventEmitter<Route>();
  selectedRoutes = {};

  constructor() {

  }

  toggle() {
    this.menu.toggle();
  }

  open(event: any, route: Route) {
    event.checked ? this.addRoute.emit(route) : this.removeRoute.emit(route);
  }


}
