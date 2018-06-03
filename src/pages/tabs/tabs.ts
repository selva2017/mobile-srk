import { LeadPage } from './../lead/lead';
import { EstimatePage } from './../estimate/estimate';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { OrdersPage } from '../orders/orders';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homePage: any = HomePage;
  // tab2Root: any = AboutPage;
  // tab3Root: any = ContactPage;
  ordersPage = OrdersPage;
  leadPage = LeadPage;
  estimatePage = EstimatePage;
  
  role: string;

  constructor(public navCtrl: NavController) {
    if (!localStorage.getItem("token")) {
      navCtrl.setRoot(LoginPage);
    }
  }
  ionViewDidEnter() {
    this.role = localStorage.getItem('role');
    // console.log(this.role);
  }
}
