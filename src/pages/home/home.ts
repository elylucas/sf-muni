import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransitService } from '../../services/transit.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private transitService: TransitService) {

  }

  ionViewDidLoad() {
    this.transitService.getRoutes()
      .then(routes => console.log(routes));
  }

}
