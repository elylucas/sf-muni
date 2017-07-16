import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { toRoutes, toRouteConfig, toVehicles } from './nextbus.parser';

const baseUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?';

@Injectable()
export class TransitService {

  constructor(private http: Http) {

  }

  getRoutes(): Promise<Route[]> {
    return this.http
      .get(`${baseUrl}command=routeList&a=sf-muni`)
      .toPromise()
      .then(toRoutes);
  }

  getRouteConfigs(routeId: string): Promise<RouteConfig[]> {
    return this.http
      .get(`${baseUrl}command=routeConfig&a=sf-muni&r=${routeId}`)
      .toPromise()
      .then(toRouteConfig);
  }

  getVehicles(routeId: string): Promise<Vehicle[]> {
    return this.http
      .get(`${baseUrl}command=vehicleLocations&a=sf-muni&r=${routeId}&t=0`)
      .toPromise()
      .then(toVehicles);
  }


}
