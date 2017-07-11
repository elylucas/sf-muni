import { Component, ViewChild, Input } from '@angular/core';
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

  routes: Array<Route>;
  selectedRoute: Route = {
    tag: 'E',
    title: 'E-Embarcadero'
  };

  constructor(private transitService: TransitService) {

  }

  ngOnInit() {
    this.transitService.getRoutes()
      .then(routes => {
        this.routes = routes;
        this.selectedRoute = routes[0];
        this.nav.setRoot(HomePage, { route: this.selectedRoute });
      });
  }

  ngAfterViewInit() {
    console.log('avi')

  }

  openPage(route: Route) {
    this.selectedRoute = route;
    this.nav.setRoot(HomePage, { route: this.selectedRoute });
  }

}
