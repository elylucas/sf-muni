import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TransitService } from '../services/transit.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/topromise';
import 'rxjs/add/observable/timer';
import { MenuComponent } from '../components/menu/menu';
import { BlankPage } from '../pages/blank/blank';
import { MapComponent } from '../components/map/map';

@NgModule({
  declarations: [
    BlankPage,
    MyApp,
    HomePage,
    MenuComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BlankPage,
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TransitService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
