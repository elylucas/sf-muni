import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  route: Route;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.route = params.get('route');
  }

}
