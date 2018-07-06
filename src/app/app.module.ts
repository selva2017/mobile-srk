import { GatePage } from './../pages/gate/gate';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoadingPage, LoadingDetailsPage } from './../pages/loading/loading';
import { FrontOfficePage } from './../pages/front-office/front-office'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { OrdersPage, NavigationDetailsPage } from './../pages/orders/orders';
import { LeadPage } from './../pages/lead/lead';
import { EstimatePage, EstimationDetailsPage } from './../pages/estimate/estimate';
// import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrdersPage,
    EstimatePage,
    LeadPage,
    NavigationDetailsPage,
    LoadingPage,
    LoadingDetailsPage,
    FrontOfficePage,
    GatePage,
    EstimationDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), BrowserModule, HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrdersPage,
    EstimatePage,
    LeadPage,
    NavigationDetailsPage,
    LoadingPage,
    LoadingDetailsPage,
    FrontOfficePage,
    GatePage,
    EstimationDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService, LoginPage, NavigationDetailsPage, LoadingDetailsPage, EstimationDetailsPage
  ]
})
export class AppModule { }
