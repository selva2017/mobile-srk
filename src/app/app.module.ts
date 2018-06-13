import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { OrdersPage } from './../pages/orders/orders';
import { LeadPage, NavigationDetailsPage } from './../pages/lead/lead';
import { EstimatePage } from './../pages/estimate/estimate';

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
    NavigationDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),BrowserModule,HttpModule
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
    NavigationDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, LoginPage,NavigationDetailsPage
  ]
})
export class AppModule {}
