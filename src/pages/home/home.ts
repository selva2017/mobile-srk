import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Message } from '../../models/message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;
  showData: boolean = false;
  constructor(public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private alertCtrl: AlertController, splashScreen: SplashScreen) {
    // this.showLoader();
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    // console.log("Constructor...");
    // this.authService.fetchDashboardData()
    //   .subscribe(
    //   (list) => {
    //     this.prodStatistics = list;
    //     this.prod_data = [];
    //     this.prod_month = [];
    //     // this.loading.dismiss();
    //   },
    //   error => {
    //     this.loading.dismiss();
    //     this.handleError(error.json().error);
    //   }
    //   );

    // this.authService.getMessages()
    //   .subscribe(
    //   (list) => {
    //     this.messages = list;
    //     console.log("Message count");
    //     console.log(list);
    //     this.loading.dismiss();
    //   },
    //   error => {
    //     this.loading.dismiss();
    //   }
    //   );
    // this.showData = true;
    splashScreen.hide();
  }

  category: string;
  companyId: string;
  data1: number;
  data2: number;
  data3: number;
  data4: number;
  graph_data: number[];
  numbers = new Array();
  pet: string = "Production";
  today: number = Date.now();
  prod_data: any[];
  prod_month: any[];
  messages: Message[];

  // ionViewDidEnter() {
    ngOnInit() {
    this.category = "production";
    // console.log("Did enter...");
    // const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
    // console.log(token);
    this.authService.fetchCustomerData()
      .subscribe(
      (list) => {
        this.showLoader();
        this.prod_data = [];
        this.prod_month = [];
        // console.log(this.prodStatistics.productionSummaries.length);
        // for(var i=0; i < this.prodStatistics.productionSummaries.length; i++)
        //   if (Number(this.prodStatistics.productionSummaries[i].amount) > 0) {
        //     this.prod_data[i] = Number(this.prodStatistics.productionSummaries[i].amount/1000);
        //     this.prod_month[i] = this.prodStatistics.productionSummaries[i].month;
        // }
        // console.log(this.prod_data.length);
        // console.log(this.prod_data);
        // console.log(this.prod_month);
        // this.numbers.push(Number(this.prodStatistics.stockWeek/1000));
        // this.numbers.push(Number(this.prodStatistics.stockMonth/1000));
        // this.numbers.push(Number(this.prodStatistics.stockQuarter/1000));
        // this.numbers.push(Number(this.prodStatistics.stockYear)/1000);
        this.loading.dismiss();
        // Call the chart from here
        // this.barChart = this.getLineChart();
        // this.barChart = this.getBarChart();
      },
      error => {
        console.log("cust")
        // this.loading.dismiss();
        this.handleError(error.json().error);
      }
      );

    // this.authService.getMessages()
    //   .subscribe(
    //   (list) => {
    //     this.showLoader();
    //     this.messages = list;
    //     // console.log(this.messages);
    //     // console.log(list);
    //     this.loading.dismiss();
    //   },
    //   error => {
    //     // this.loading.dismiss();
    //     // this.handleError(error.json().error);
    //   }
    //   );
  }
  // );
  // this.data1 = [this.prodStatistics[0].stockWeek, this.prodStatistics[0].stockMonth, this.prodStatistics[0].stockQuarter, this.prodStatistics[0].stockYear];
  // }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Network Connection error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.companyId = localStorage.getItem('companyId');
    // this wont get prod_data so need to call getLineChat() from Constructor
    // console.log('ionViewDidLoad ChartJsPage');

  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }

  logout() {
    // this.authService.logout().then((result) => {
    // this.loading.dismiss();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    // }, (err) => {
    // this.loading.dismiss();
    // this.presentToast(err);
    // });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Home page ...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }

}