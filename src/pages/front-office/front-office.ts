import { AuthService } from './../../providers/auth-service/auth-service';
import { SubOrders, VehicleList } from './../../models/sub-orders';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-front-office',
  templateUrl: 'front-office.html',
})
export class FrontOfficePage {


  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontOfficePage');
  }
  approvedOrders: SubOrders[] = [];
  allocatedOrders: SubOrders[] = [];
  loadedOrders: SubOrders[] = [];
  subOrders: SubOrders[];
  a: string;
  vehicles: VehicleList[];
  gaming: string;
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  // displayINR(amount: number) {
  //   return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  // }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  allocateVehicle(item, status) {
    console.log(item);
    console.log(status);
  }
  testRadioOpen: boolean;
  testRadioResult;
  Code = [];
  data = [
    { name: "label1", visible: false, object2: "1" },
    { name: "label2", visible: true, object2: "2" },

  ];

  loading: any;
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });

    this.loading.present();
  }
  // doRadio() {

  //   // prompt.present();
  // }
  //   alert.setTitle('Lightsaber color');

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Blue',
  //     value: 'blue',
  //     checked: true
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Green',
  //     value: 'green'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Red',
  //     value: 'red'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Yellow',
  //     value: 'yellow'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Purple',
  //     value: 'purple'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'White',
  //     value: 'white'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Black',
  //     value: 'black'
  //   });

  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: data => {
  //       console.log('Radio data:', data);
  //       this.testRadioOpen = false;
  //       this.testRadioResult = data;
  //     }
  //   });

  //   alert.present().then(() => {
  //     this.testRadioOpen = true;
  //   });
  // }
  retrieveSubOrders(status) {
    console.log(status);
    switch (status) {
      case "APPROVED": {
        this.approvedOrders = [];
        // status = "APPROVED"
        this.showLoader("Collecting Approved Orders....");
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.approvedOrders = list;
              console.log(this.approvedOrders);
              this.loading.dismiss();
            },
            error => {
              // this.loading.dismiss();
              // this.handleError(error.json().error);
            }
          );
        break;
      }
      case "ALLOCATED": {
        // status = "APPROVED"
        this.allocatedOrders = [];
        this.showLoader("Collecting Allocated Orders....");
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.allocatedOrders = list;
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

      case "LOADED": {
        // status = "APPROVED"
        this.loadedOrders = [];
        this.showLoader("Collecting Loaded Orders....");
        this.authService.fetchApprovedSubOrders(status)
          .subscribe(
            (list: SubOrders[]) => {
              this.loadedOrders = list;
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
    }
  }

  updateSubOrder(sub_order_number,order_group_number, status, refresh_list) {
    // console.log(sub_order_number, status, refresh_list);
    // this.showLoader();
    // this.showLoader("Updating the Order....");
    this.authService.updateStatusOfSubOrder(sub_order_number,order_group_number, status)
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

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    private authService: AuthService, private loadingCtrl: LoadingController) {

    this.vehicles = [
      {
        "vehicle_ID": "TN 33 AC 8841",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 1 ",
        "vehicle_CAPACITY": "1 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8842",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 2",
        "vehicle_CAPACITY": "1 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8843",
        "vehicle_TYPE": "101",
        "vehicle_NAME": "TRUCK 3",
        "vehicle_CAPACITY": "2 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8844",
        "vehicle_TYPE": "101",
        "vehicle_NAME": "TRUCK 4",
        "vehicle_CAPACITY": "3 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8845",
        "vehicle_TYPE": "102",
        "vehicle_NAME": "TRUCK 5",
        "vehicle_CAPACITY": "4 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8846",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 6",
        "vehicle_CAPACITY": "5 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8847",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 7",
        "vehicle_CAPACITY": "8 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8848",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 8",
        "vehicle_CAPACITY": "8 Unit"
      },
      {
        "vehicle_ID": "TN 33 AC 8849",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 9",
        "vehicle_CAPACITY": "8 Unit"
      },
      {
        "vehicle_ID": "010",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 10",
        "vehicle_CAPACITY": "10 Unit"
      },
    ];

  }
  doRadio(sub_order_number,order_group_number, status, refresh_list) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Vehicle');
    for (var i = 0; i < this.vehicles.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.vehicles[i].vehicle_ID + ' - (' + this.vehicles[i].vehicle_CAPACITY + ')',
        value: this.vehicles[i].vehicle_NAME,
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Allocate',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.updateSubOrder(sub_order_number, order_group_number,status, refresh_list);
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Weight',
      message: "Enter the Loaded Truck Weight",
      inputs: [
        {
          name: 'weight',
          placeholder: 'Enter the Weight'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
