import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { toRoutes, toRouteConfig, toVehicles } from './nextbus.parser';

@Injectable()
export class TransitService {

  constructor(private http: Http) {

  }

  getRoutes(): Promise<Route[]> {
    return this.http
      .get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni')
      .toPromise()
      .then(toRoutes)
      .then(routes => routes);
  }

  getRouteConfigs(routeId: string): Promise<RouteConfig[]> {
    return this.http
      .get(`http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r=${routeId}`)
      .toPromise()
      .then(toRouteConfig)
      .then(routes => routes);
  }

  getVehicles(routeId: string): Promise<Vehicle[]> {
    //const observable = Observable.create(observer => {
    return this.http
      .get(`http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&r=${routeId}&t=0`)
      .toPromise()
      .then(toVehicles)
      .then(vehicles => vehicles);
    //});
    //return observable;

  }


}
