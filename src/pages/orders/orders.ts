import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Orders } from '../../models/orders';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: Orders[] = [];
  loading_complete: boolean;
  // dayBookList: Daybook[];
  // dayBookDetailsPage = DayBookDetailsPage;
  companyId: string;
  loading: any;
  role: string;

  constructor(private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DayBookPage');
    // this.companyId = localStorage.getItem('companyId');
    // this.role = localStorage.getItem('role');
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  // onRemoveFromList(key: String) {
  //   console.log("item" + key);
  //   this.authService.hideDayBookRow(key)
  //     .subscribe(
  //       // (res: Daybook) => console.log(res),
  //       (success) => {
  //         console.log("success");
  //         this.ngOnInit();
  //       },
  //       (error) => console.log(error)
  //     );
  // }

  ngOnInit() {
    // const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
    this.showLoader();
    this.retrieveEstimatedOrder();
    // }
    // );
  }

  retrieveEstimatedOrder() {
    this.authService.fetchOrder()
      .subscribe(
        (list: Orders[]) => {
          this.orders = list;
          // console.log(this.orders);
          this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
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
}
