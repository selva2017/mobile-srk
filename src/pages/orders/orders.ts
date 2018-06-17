import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Orders } from '../../models/orders';


@Component({
  templateUrl: 'navigation-details.html',
})
export class NavigationDetailsPage {
  order;

  constructor(params: NavParams) {
    this.order = params.data.item;
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
}

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  // items = [];
  loading: any;
  orders: Orders[] = [];
  loading_complete: boolean;

  constructor(public nav: NavController, private loadingCtrl: LoadingController,
    private authService: AuthService, private alertCtrl: AlertController) {
  }
  ngOnInit() {
    this.showLoader();
    this.retrieveEstimatedOrder();
  }
  retrieveEstimatedOrder() {
    this.authService.fetchOrder()
      .subscribe(
        // (list) => {
        (list: Orders[]) => {
          this.orders = list;
          console.log(this.orders);
          this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  openNavDetailsPage(item) {
    this.nav.push(NavigationDetailsPage, { item: item });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Network Connection error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.authService.fetchOrder()
      .subscribe(
        (list: Orders[]) => {
          this.orders = list;
          refresher.complete();
          // console.log(this.orders);
          this.loading_complete = true;
          // this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
    // console.log('Begin async operation', refresher);
    // this.retrieveEstimatedOrder();
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }

}
