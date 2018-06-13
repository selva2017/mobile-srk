import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Orders } from '../../models/orders';


@Component({
  templateUrl: 'navigation-details.html',
})
export class NavigationDetailsPage {
  orders: Orders[];

}

@Component({
  template: `
<ion-header>
  <ion-navbar>
    <ion-title>Orders</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <button ion-item *ngFor="let item of orders" (click)="openNavDetailsPage(item)" icon-start>
      {{ item.order_GROUP_NO }}
    </button>
  </ion-list>
</ion-content>
`
})
export class LeadPage {
  // items = [];
  loading: any;
  orders: Orders[] = [];
  loading_complete: boolean;

  constructor(public nav: NavController, private loadingCtrl: LoadingController,
    private authService: AuthService, private alertCtrl: AlertController) {

    // this.items = [
    //   {
    //     'title': 'Angular',
    //     'icon': 'angular',
    //     'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
    //     'color': '#E63135'
    //   },
    //   {
    //     'title': 'CSS3',
    //     'icon': 'css3',
    //     'description': 'The latest version of cascading stylesheets - the styling language of the web!',
    //     'color': '#0CA9EA'
    //   },
    //   {
    //     'title': 'HTML5',
    //     'icon': 'html5',
    //     'description': 'The latest version of the web\'s markup language.',
    //     'color': '#F46529'
    //   },
    //   {
    //     'title': 'JavaScript',
    //     'icon': 'javascript',
    //     'description': 'One of the most popular programming languages on the Web!',
    //     'color': '#FFD439'
    //   },
    //   {
    //     'title': 'Sass',
    //     'icon': 'sass',
    //     'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
    //     'color': '#CE6296'
    //   },
    //   {
    //     'title': 'NodeJS',
    //     'icon': 'nodejs',
    //     'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
    //     'color': '#78BD43'
    //   },
    //   {
    //     'title': 'Python',
    //     'icon': 'python',
    //     'description': 'A clear and powerful object-oriented programming language!',
    //     'color': '#3575AC'
    //   },
    //   {
    //     'title': 'Markdown',
    //     'icon': 'markdown',
    //     'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
    //     'color': '#412159'
    //   },
    //   {
    //     'title': 'Tux',
    //     'icon': 'tux',
    //     'description': 'The official mascot of the Linux kernel!',
    //     'color': '#000'
    //   },
    // ]
  }
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
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  retrieveEstimatedOrder() {
    this.authService.fetchOrder()
      .subscribe(
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

  openNavDetailsPage(orders: Orders) {
    this.nav.push(NavigationDetailsPage, { orders: orders });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Network Connection error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}