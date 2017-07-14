import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Nav } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() nav: Nav;
  @Input() content;
  @Input() routes: Route[];
  @Output() openRoute = new EventEmitter<Route>();

  selectedRoute: Route;

  constructor(private transitService: TransitService) {

  }

  // ngOnInit() {
  //   this.transitService.getRoutes()
  //     .then(routes => {
  //       this.routes = routes;
  //       this.selectedRoute = routes[0];
  //       this.nav.setRoot(HomePage, { route: this.selectedRoute });
  //     });
  // }

  open(route: Route) {
    this.openRoute.emit(route);
  }


}
