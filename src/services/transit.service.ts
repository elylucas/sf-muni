import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { toRoutes } from './nextbus.parser';



@Injectable()
export class TransitService {

  constructor(private http: Http) {

  }

  getRoutes() {
    return this.http
        .get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni')
        .toPromise()
        .then(toRoutes)
        .then(routes => routes);
  }


}
