import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Orders } from '../../models/orders';
import { SubOrders } from '../../models/sub-orders';
@Component({
  templateUrl: 'navigation-details.html',
})
export class NavigationDetailsPage {
  order;
  order_type;
  subOrders: SubOrders[];
  loading: any;
  role: string;
  showApprove: boolean = false;
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Orders...'
    });

    this.loading.present();
  }
  constructor(public nav: NavController, params: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController) {
    this.role = localStorage.getItem('role');
    // if (this.role == '1' || this.role == '2') {
    //   this.showApprove = true;
    //   console.log(this.showApprove);
    // }
    this.order = params.data.item;
    this.order_type = params.data.test;
    this.showLoader();
    this.authService.fetchSubOrder(this.order['order_GROUP_NO'])
      .subscribe(
        // (list) => {
        (list: SubOrders[]) => {
          this.subOrders = list;
          console.log(this.subOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    // this.nav.push(OrdersPage, { item: this.subOrder });
  }

  displayDecimalINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }  // displayINR(amount: number) {
  //   return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  // }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  rejectOrder(order_GROUP_NO) {
    // console.log(order_GROUP_NO);
    this.showLoader();
    this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "REJECTED")
      .subscribe(
        (success) => {
          this.nav.pop();
          this.nav.push(OrdersPage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
  approveOrder(order_GROUP_NO) {
    // console.log(order_GROUP_NO);
    this.showLoader();
    this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "APPROVED")
      .subscribe(
        (success) => {
          // this.refreshList();
          this.nav.pop();
          this.nav.push(OrdersPage);
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
  getOrderByStatus() {
    this.showLoader();
    this.authService.fetchSubOrder(this.order['order_GROUP_NO'])
      .subscribe(
        // (list) => {
        (list: SubOrders[]) => {
          this.subOrders = list;
          // console.log(this.subOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
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
  estimatedOrders: Orders[] = [];
  approvedOrders: Orders[] = [];
  rejectedOrders: Orders[] = [];
  loading_complete: boolean;
  category: string;

  constructor(public nav: NavController, private loadingCtrl: LoadingController,
    private authService: AuthService, private alertCtrl: AlertController,
    params: NavParams) {
    // this.subOrders = params.data.item;
    // console.log("Su Order")
    // console.log(this.subOrders);
  }
  role: string;

  ionViewDidEnter() {

  }
  ngOnInit() {
    // this.showLoader();
    this.role = localStorage.getItem('role');
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllEstimatedOrders();
    }
    else if (this.role == '3') {
      this.retrieveEstimatedOrders();
    }
    // this.loading.dismiss();
    // this.showLoader();
    // this.estimatedOrders = this.retrieveOrdersByStatus("ESTIMATION");
    // console.log(this.estimatedOrders);
    // this.retrieveApprovedOrders();
    // this.loading.dismiss();
    // this.showLoader();
    // this.approvedOrders = this.retrieveOrdersByStatus("APPROVED");
    // console.log(this.approvedOrders);
    // this.retrieveRejectedOrders();
    // this.loading.dismiss();
    this.category = "estimate";
    // this.estimatedOrders = this.retrieveOrdersByStatus("ESTIMATION");
    // console.log(this.estimatedOrders);
    // this.approvedOrders = this.retrieveOrdersByStatus("APPROVED");
    // console.log(this.approvedOrders);
    // this.rejectedOrders = this.retrieveOrdersByStatus("REJECTED");
    // console.log(this.rejectedOrders);
  }
  // retrieveOrdersByStatus(status) {
  //   this.authService.fetchOrderByStatus(status)
  //     .subscribe(
  //       (list: Orders[]) => {
  //         this.orders = list;
  //         this.loading_complete = true;
  //         this.loading.dismiss();
  //       },
  //       error => {
  //         this.loading.dismiss();
  //         this.handleError(error.json().error);
  //       }
  //     );
  //     return this.orders;
  // }
  // retrieveOrdersByStatus(status) {
  //   this.authService.fetchOrderByStatus(status)
  //     .subscribe(
  //       (list: Orders[]) => {
  //         this.orders = list;
  //         this.loading_complete = true;
  //         this.loading.dismiss();
  //       },
  //       error => {
  //         this.loading.dismiss();
  //         this.handleError(error.json().error);
  //       }
  //     );
  //     return this.orders;
  // }
  // retrieveOrdersByStatus(status) {
  //   this.authService.fetchOrderByStatus(status)
  //     .subscribe(
  //       (list: Orders[]) => {
  //         this.orders = list;
  //         this.loading_complete = true;
  //         this.loading.dismiss();
  //       },
  //       error => {
  //         this.loading.dismiss();
  //         this.handleError(error.json().error);
  //       }
  //     );
  //     return this.orders;
  // }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  openNavDetailsPage(item, test) {
    this.nav.push(NavigationDetailsPage, { item: item, test });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Network Connection error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  retrieveEstimatedOrders() {
    this.showLoader();
    this.estimatedOrders = [];
    this.authService.fetchOrderByStatus("ESTIMATED")
      .subscribe(
        (list: Orders[]) => {
          this.estimatedOrders = list;
          // console.log(this.estimatedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveAllEstimatedOrders() {
    this.showLoader();
    this.estimatedOrders = [];
    this.authService.fetchAllOrderByStatus("ESTIMATED")
      .subscribe(
        (list: Orders[]) => {
          this.estimatedOrders = list;
          // console.log(this.estimatedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveApprovedOrders() {
    this.showLoader();
    this.approvedOrders = [];
    this.authService.fetchOrderByStatus("APPROVED")
      .subscribe(
        (list: Orders[]) => {
          this.approvedOrders = list;
          // console.log(this.approvedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveAllApprovedOrders() {
    this.showLoader();
    this.approvedOrders = [];
    this.authService.fetchAllOrderByStatus("APPROVED")
      .subscribe(
        (list: Orders[]) => {
          this.approvedOrders = list;
          // console.log(this.approvedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveRejectedOrders() {
    this.showLoader();
    this.rejectedOrders = [];
    this.authService.fetchOrderByStatus("REJECTED")
      .subscribe(
        (list: Orders[]) => {
          this.rejectedOrders = list;
          // console.log(this.rejectedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveAllRejectedOrders() {
    this.showLoader();
    this.rejectedOrders = [];
    this.authService.fetchAllOrderByStatus("REJECTED")
      .subscribe(
        (list: Orders[]) => {
          this.rejectedOrders = list;
          // console.log(this.rejectedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  doRefreshEstimated(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllEstimatedOrders();
    }
    else if (this.role == '3') {
      this.retrieveEstimatedOrders();
    }
    refresher.complete();
  }
  doRefreshApproved(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllApprovedOrders();
    }
    else if (this.role == '3') {
      this.retrieveApprovedOrders();
    }
    refresher.complete();
  }
  doRefreshRejected(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllRejectedOrders();
    }
    else if (this.role == '3') {
      this.retrieveRejectedOrders();
    }
    refresher.complete();
  }    // this.showLoader();
  // this.retrieveEstimatedOrders();
  // this.estimatedOrders = this.retrieveOrdersByStatus("ESTIMATION");
  // this.approvedOrders = this.retrieveOrdersByStatus("APPROVED");
  // this.rejectedOrders = this.retrieveOrdersByStatus("REJECTED");
  // this.loading.dismiss();
  // this.retrieveOrdersByStatus("APPROVED")
  // this.authService.fetchOrder()
  //   .subscribe(
  //     (list: Orders[]) => {
  //       this.orders = list;
  //       refresher.complete();
  //       // console.log(this.orders);
  //       this.loading_complete = true;
  //       // this.loading.dismiss();
  //     },
  //     error => {
  //       this.loading.dismiss();
  //       this.handleError(error.json().error);
  //     }
  //   );
  // console.log('Begin async operation', refresher);
  // this.retrieveOrdersByStatus();
  // setTimeout(() => {
  //   console.log('Async operation has ended');
  //   refresher.complete();
  // }, 2000);

  displayDecimalINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  // getEstimatedOrders(refresher) {
  //   this.retrieveOrdersByStatus();
  //   refresher.complete();
  // }
}
