import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slides') slides: Slides;
  routes: Route[];
  routeInfos: RouteInfo[] = [];
  selectedRouteInfo: RouteInfo;
  vehiclesSubscription: Subscription;

  constructor(public navCtrl: NavController, params: NavParams, private transitService: TransitService) {

  }

  ionViewDidEnter() {
    this.transitService.getRoutes()
      .then(routes => {
        this.routes = routes;
        //this.addRoute(routes[0]);
      });
  }

  ionViewDidLeave() {
    this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();
  }

  addRoute(route: Route) {

    this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();

    Promise.all([this.transitService.getRouteConfigs(route.tag), this.transitService.getVehicles(route.tag)])
      .then(results => {
        const routeInfo: RouteInfo = {
          routeConfig: results[0][0],
          vehicles: results[1]
        };
        this.routeInfos = [routeInfo, ...this.routeInfos];
        this.selectedRouteInfo = routeInfo;

        if(this.slides) {
          setTimeout(() => this.slides.slideTo(0), 0);
        }
      });

    // this.vehiclesSubscription = Observable.timer(0, 5000)
    //   .subscribe(() => {
    //     this.transitService.getVehicles(route.tag)
    //       .then(vehicles => this.routeInfos.find(r => r.routeConfig.tag === route.tag).vehicles  = vehicles);
    //   });
  }

  removeRoute(route: Route) {
    _.remove(this.routeInfos, r => r.routeConfig.tag === route.tag);
  }

  slideChanged() {
    this.selectedRouteInfo = this.routeInfos[this.slides.getActiveIndex()];
  }

}
