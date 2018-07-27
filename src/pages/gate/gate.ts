import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SubOrders } from '../../models/sub-orders';

@IonicPage()
@Component({
  selector: 'page-gate',
  templateUrl: 'gate.html',
})
export class GatePage {
  weighedOrders: SubOrders[] = [];
  transitOrders: SubOrders[] = [];
  deliveredOrders: SubOrders[] = [];
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    private authService: AuthService, private loadingCtrl: LoadingController) {
  }

  loading: any;
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });
    this.loading.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GatePage');
  }
  // retrieveSubOrders(status) {
  //   status = "all"
  //   this.authService.fetchApprovedSubOrders(status)
  //     .subscribe(
  //       // (list) => {
  //       (list: SubOrders[]) => {
  //         this.weighedOrders = list;
  //         console.log(this.weighedOrders);
  //         // this.loading_complete = true;
  //         // this.loading.dismiss();
  //       },
  //       error => {
  //         // this.loading.dismiss();
  //         // this.handleError(error.json().error);
  //       }
  //     );
  // }
  provideOutPass() {
    alert("Out Pass granted");
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }

  updateSubOrder(sub_order_number,group_order_number, status, refresh_list) {
    console.log(group_order_number,sub_order_number);
    // this.showLoader();
    // this.showLoader("Updating Order Status....");
    this.authService.updateStatusOfSubOrder(sub_order_number, group_order_number,status)
      .subscribe(
        (success) => {
          this.retrieveSubOrders(refresh_list);
          // this.refreshList();
          // this.nav.pop();
          // this.nav.push(OrdersPage);
          // this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
  retrieveSubOrders(status) {
    switch (status) {
      case "WEIGHED": {
        this.weighedOrders = [];
        // status = "APPROVED"
        this.showLoader("Collecting Out Pass Orders....");
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.weighedOrders = list;
              // console.log(this.weighedOrders);
              this.loading.dismiss();
            },
            error => {
              // this.loading.dismiss();
              // this.handleError(error.json().error);
            }
          );
        break;
      }
      case "TRANSIT": {
        // status = "APPROVED"
        this.showLoader("Collecting In Pass Orders....");
        this.transitOrders = [];
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.transitOrders = list;
              // console.log(this.subOrders);
              this.loading.dismiss();
            },
            error => {
              // this.loading.dismiss();
              // this.handleError(error.json().error);
            }
          );
        break;
      }

      case "DELIVERED": {
        // status = "APPROVED"
        this.showLoader("Collecting Delivered Orders....");
        this.deliveredOrders = [];
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.deliveredOrders = list;
              // console.log(this.deliveredOrders);
              this.loading.dismiss();
            },
            error => {
              // this.loading.dismiss();
              // this.handleError(error.json().error);
            }
          );
        break;
      }
    }
  }

}
