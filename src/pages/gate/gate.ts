import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SubOrders } from '../../models/sub-orders';

@IonicPage()
@Component({
  selector: 'page-gate',
  templateUrl: 'gate.html',
})
export class GatePage {
  weighedOrders: SubOrders[] = [];
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GatePage');
  }
  retrieveSubOrders(status) {
    status = "all"
    this.authService.fetchApprovedSubOrders(status)
      .subscribe(
        // (list) => {
        (list: SubOrders[]) => {
          this.weighedOrders = list;
          console.log(this.weighedOrders);
          // this.loading_complete = true;
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  provideOutPass() {
    alert("Out Pass granted");
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
}
