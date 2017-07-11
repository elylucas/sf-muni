import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';

@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html'
})
export class BlankPage {

  route: Route;

  constructor(public navCtrl: NavController, params: NavParams) {

  }

}
