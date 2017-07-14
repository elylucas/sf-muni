import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  route: Route;
  routes: Route[];
  routeConfig: RouteConfig;
  vehiclesObservable: Observable<Vehicle[]>;
  vehiclesSubscription: Subscription;
  vehicles: Vehicle[];

  constructor(public navCtrl: NavController, params: NavParams, private transitService: TransitService) {

  }

  ionViewDidEnter() {
    this.transitService.getRoutes()
      .then(routes => {
        this.routes = routes;
        this.openRoute(routes[0]);
      });
  }

  ionViewDidLeave() {
    this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();
  }

  openRoute(route) {
    this.route = route;

    this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();

    Promise.all([this.transitService.getRouteConfigs(route.tag), this.transitService.getVehicles(route.tag)])
      .then(results => {
        this.routeConfig = results[0][0];
        this.vehicles = results[1];
      });

    this.vehiclesSubscription = Observable.timer(0, 5000)
      .subscribe(() => {
        this.transitService.getVehicles(route.tag)
          .then(vehicles => this.vehicles = vehicles);
      });
  }

}
