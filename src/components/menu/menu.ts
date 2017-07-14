import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() content;
  @Input() routes: Route[];
  @Output() openRoute = new EventEmitter<Route>();

  constructor() {

  }

  open(route: Route) {
    this.openRoute.emit(route);
  }


}
