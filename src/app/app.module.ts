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
import { LeadPage, CustomerMeetingsPage } from './../pages/lead/lead';
import { EstimatePage, EstimationDetailsPage } from './../pages/estimate/estimate';
import { PrintPage } from './../pages/print/print';
import { Printer } from '@ionic-native/printer';
import { Geolocation } from '@ionic-native/geolocation';

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
    CustomerMeetingsPage,
    NavigationDetailsPage,
    LoadingPage,
    LoadingDetailsPage,
    FrontOfficePage,
    GatePage,
    EstimationDetailsPage,
    PrintPage
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
    CustomerMeetingsPage,
    LoadingPage,
    LoadingDetailsPage,
    FrontOfficePage,
    GatePage,
    EstimationDetailsPage,
    PrintPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Printer,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService, LoginPage, NavigationDetailsPage, LoadingDetailsPage, EstimationDetailsPage,
    CustomerMeetingsPage
  ]
})
export class AppModule { }
