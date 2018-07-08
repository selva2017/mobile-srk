import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-print',
  templateUrl: 'print.html',
})
export class PrintPage {
 
  coords: any;
  accuracy: any;
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private printer: Printer, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  watch() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
      this.accuracy = resp.coords.accuracy + 'meters';
    }).catch((error) => {
      this.error = 'Error getting location: ' + error;
    })
  }
  print_error: any;
  content: string = "Testing....";
  print() {
    this.printer.isAvailable().then((resp) => {
      this.printer.print(this.content, options);
    }).catch((error) => {
      this.print_error = 'Error connecting : ' + error;
    })

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };

    //  this.printer.print(content, options).then(onSuccess, onError);
  }
}
