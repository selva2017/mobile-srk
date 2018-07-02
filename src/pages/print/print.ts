import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
// import { Printer, PrintOptions } from 'ionic-native';

@IonicPage()
@Component({
  selector: 'page-print',
  templateUrl: 'print.html',
})
export class PrintPage {
  
  print() {

    // Printer.isAvailable().then(function () {
    //   Printer.print("https://www.techiediaries.com").then(function () {
    //     alert("printing done successfully !");
    //   }, function () {
    //     alert("Error while printing !");
    //   });
    // }, function () {
    //   alert('Error : printing is unavailable on your device ');
    // });

  }
  //   constructor(private printer: Printer) { 
  //     this.printer.isAvailable().then(onSuccess, onError);

  // let options: PrintOptions = {
  //      name: 'MyDocument',
  //      printerId: 'printer007',
  //      duplex: true,
  //      landscape: true,
  //      grayscale: true
  //    };

  // this.printer.print(content, options).then(onSuccess, onError);
  //   }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrintPage');
  }

}
