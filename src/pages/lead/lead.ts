import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lead',
  templateUrl: 'lead.html',
})
export class LeadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadPage');
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  orders = [] = [{
    order_ID: '',
    order_QTY: ''
  }];
  onSelectCustomer(customer_name) {
    
    console.log(customer_name);
  }
  public addrow(): void {

    console.log(this.orders);
    
    this.orders.push({
      order_ID: '',
      order_QTY: '',
      
    });
  }
   public products: Array < { product_ID: string, product_TYPE: string, product_NAME: string, product_GROUP: string, product_PRICE: string, product_QTY: string } > = [
  {
    "product_ID": "001",
    "product_TYPE": "100",
    "product_NAME": "Paper 100 inch",
    "product_GROUP": "1000",
    "product_PRICE": "100.00",
    "product_QTY": ""
  },
  {
    "product_ID": "002",
    "product_TYPE": "100",
    "product_NAME": "Copier",
    "product_GROUP": "1001",
    "product_PRICE": "20.00",
    "product_QTY": ""
  },
  {
    "product_ID": "003",
    "product_TYPE": "101",
    "product_NAME": "NoteBooks 3 x 12",
    "product_GROUP": "1002",
    "product_PRICE": "12.00",
    "product_QTY": ""
  },
  {
    "product_ID": "004",
    "product_TYPE": "101",
    "product_NAME": "NoteBooks 4 x 5",
    "product_GROUP": "1003",
    "product_PRICE": "15.00",
    "product_QTY": ""
  },
  {
    "product_ID": "005",
    "product_TYPE": "102",
    "product_NAME": "NoteBooks 5 x 9",
    "product_GROUP": "1004",
    "product_PRICE": "30.00",
    "product_QTY": ""
  }];
}