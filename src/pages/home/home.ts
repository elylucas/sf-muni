import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';
import { MenuComponent } from '../../components/menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slides') slides: Slides;
  @ViewChild('menu') menu: MenuComponent;
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
        this.menu.toggle();
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
        this.setupRouteWatcher(route.tag);
        if (this.slides) {
          setTimeout(() => this.slides.slideTo(0), 0);
        }
      });
  }

  removeRoute(route: Route) {
    _.remove(this.routeInfos, r => r.routeConfig.tag === route.tag);
    //change slide if selected route was removed
    if (route.tag === this.selectedRouteInfo.routeConfig.tag && this.routeInfos.length) {
      setTimeout(() => {
        this.slides.slideTo(0);
        this.slideChanged();
      }, 0);
    }
    if(this.routeInfos.length === 0) {
      this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();
    }
  }

  setupRouteWatcher(routeTag, waitPeriod = 5000) {
    this.vehiclesSubscription = Observable.timer(waitPeriod, 5000)
      .subscribe(() => {
        this.transitService.getVehicles(routeTag)
          .then(vehicles => {
            this.selectedRouteInfo = {
              routeConfig: this.selectedRouteInfo.routeConfig,
              vehicles: vehicles
            };
          });
      });
  }

  slideChanged() {
    let targetRouteInfo = this.routeInfos[this.slides.getActiveIndex()];
    if (targetRouteInfo && targetRouteInfo != this.selectedRouteInfo) {
      this.vehiclesSubscription && this.vehiclesSubscription.unsubscribe();
      this.selectedRouteInfo = targetRouteInfo;
      this.setupRouteWatcher(targetRouteInfo.routeConfig.tag, 0);
    }
  }

}
