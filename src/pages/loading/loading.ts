import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { SubOrders, VehicleList, Employee, MachineList, YardList } from './../../models/sub-orders';

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {
  testRadioOpen: boolean;
  testRadioResult;
  testCheckboxOpen: boolean;
  testCheckboxResult;
  test: string;
  vehicles: VehicleList[];
  employees: Employee[];
  machines: MachineList[];
  yards: YardList[];
  startHrMtr: string;
  endHrMtr: string;
  data: any[] = [
    { name: "label1", visible: false, object2: "1" },
    { name: "label2", visible: true, object2: "2" },

  ];
  // transportAllocatedOrders: SubOrders[] = [];
  allocatedOrders: SubOrders[] = [];
  loadedOrders: SubOrders[] = [];

  loading: any;
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });
    this.loading.present();
  }
  openNavDetailsPage(item) {
    this.nav.push(LoadingDetailsPage, { item: item });
  }
  doRefreshLoading(refresher) {
    this.retrieveSubOrders("ALLOCATED");
    refresher.complete();
  }
  updateSubOrder(sub_order_number,group_order_number, status, refresh_list) {
    // console.log(sub_order_number, status);
    // this.showLoader();
    // this.showLoader("Updating the Order....");
    this.authService.updateStatusOfSubOrder(sub_order_number,group_order_number, status)
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
  // retrieveSubOrders(status) {
  //   this.transportAllocatedOrders = [];
  //   // status = "APPROVED"
  //   this.showLoader("Collecting Orders ready for Loading....");
  //   this.authService.fetchApprovedSubOrders(status)
  //     .subscribe(
  //       // (list) => {
  //       (list: SubOrders[]) => {
  //         this.transportAllocatedOrders = list;
  //         // console.log(this.transportAllocatedOrders);
  //         // this.loading_complete = true;
  //         this.loading.dismiss();
  //       },
  //       error => {
  //         // this.loading.dismiss();
  //         // this.handleError(error.json().error);
  //       }
  //     );
  // }
  machineLoading: boolean = true; notifyLoadingOption(event) {
    this.machineLoading = !this.machineLoading; // console.log("Event:"+ event.checked); 
    console.log("Toggled Load: " + this.machineLoading);
  }

  doRadioYard() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Yard');
    for (var i = 0; i < this.yards.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.yards[i].yard_NAME,
        value: this.yards[i].yard_NAME,
      });

    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  doCheckbox() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Employees');

    for (var i = 0; i < this.employees.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.employees[i].firstName,
        value: this.employees[i].employeeId,
      });
      // alert.addInput(
      //   {
      //     type: 'textbox',
      //     name: 'title',
      //     placeholder: 'Title'
      //   },
      // );
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }
  constructor(public alerCtrl: AlertController, private authService: AuthService,
    private loadingCtrl: LoadingController, public nav: NavController) {
    this.retrieveSubOrders("ALLOCATED");
    this.employees = [
      {
        "employeeId": "100",
        "jobTitleName": "Developer",
        "firstName": "Ram",
        "lastName": "Raj",
        "preferredFullName": "Romin Irani",
        "employeeCode": "E1",
        "region": "CA",
        "phoneNumber": "408-1234567",
        "emailAddress": "romin.k.irani@gmail.com"
      },
      {
        "employeeId": "101",
        "jobTitleName": "Developer",
        "firstName": "Vivek",
        "lastName": "K",
        "preferredFullName": "Neil Irani",
        "employeeCode": "E2",
        "region": "CA",
        "phoneNumber": "408-1111111",
        "emailAddress": "neilrirani@gmail.com"
      },
      {
        "employeeId": "102",
        "jobTitleName": "Program Directory",
        "firstName": "Senthil",
        "lastName": "Kumar",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
      },
    ];
    this.vehicles = [
      {
        "vehicle_ID": "001",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 1 ",
        "vehicle_CAPACITY": "1000"
      },
      {
        "vehicle_ID": "002",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 2",
        "vehicle_CAPACITY": "1001"
      },
      {
        "vehicle_ID": "003",
        "vehicle_TYPE": "101",
        "vehicle_NAME": "TRUCK 3",
        "vehicle_CAPACITY": "1002"
      },
      {
        "vehicle_ID": "004",
        "vehicle_TYPE": "101",
        "vehicle_NAME": "TRUCK 4",
        "vehicle_CAPACITY": "1003"
      },
      {
        "vehicle_ID": "005",
        "vehicle_TYPE": "102",
        "vehicle_NAME": "TRUCK 5",
        "vehicle_CAPACITY": "1004"
      },
      {
        "vehicle_ID": "006",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 6",
        "vehicle_CAPACITY": "1005"
      },
      {
        "vehicle_ID": "007",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 7",
        "vehicle_CAPACITY": "1006"
      },
      {
        "vehicle_ID": "008",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 8",
        "vehicle_CAPACITY": "1007"
      },
      {
        "vehicle_ID": "009",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 9",
        "vehicle_CAPACITY": "1008"
      },
      {
        "vehicle_ID": "010",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 10",
        "vehicle_CAPACITY": "1009"
      },
    ];
    this.machines = [
      {
        "machine_ID": "001",
        "machine_TYPE": "100",
        "machine_NAME": "Machine 1 ",
        "machine_CAPACITY": "1000"
      },
      {
        "machine_ID": "002",
        "machine_TYPE": "100",
        "machine_NAME": "Machine 2",
        "machine_CAPACITY": "1001"
      },
      {
        "machine_ID": "003",
        "machine_TYPE": "101",
        "machine_NAME": "Machine 3",
        "machine_CAPACITY": "1002"
      },
    ];
    this.yards = [
      {
        "yard_ID": "1001",
        "yard_TYPE": "100",
        "yard_NAME": "QUARRY",
        "yard_CAPACITY": "1000"
      },
      {
        "yard_ID": "1002",
        "yard_TYPE": "100",
        "yard_NAME": "TILES",
        "yard_CAPACITY": "1001"
      },
      {
        "yard_ID": "1003",
        "yard_TYPE": "101",
        "yard_NAME": "PAVER",
        "yard_CAPACITY": "1002"
      },
      {
        "yard_ID": "1004",
        "yard_TYPE": "111",
        "yard_NAME": "HOLLOW BLOCKS",
        "yard_CAPACITY": "100"
      },
    ];
  }

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Vehicle');
    for (var i = 0; i < this.vehicles.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.vehicles[i].vehicle_NAME,
        value: this.vehicles[i].vehicle_NAME,
      });
    }
    // alert.addInput({
    //   type: 'radio',
    //   label: 'Blue',
    //   value: 'blue',
    //   checked: true
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Green',
    //   value: 'green'
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Red',
    //   value: 'red'
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Yellow',
    //   value: 'yellow'
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Purple',
    //   value: 'purple'
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'White',
    //   value: 'white'
    // });

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Black',
    //   value: 'black'
    // });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  ngOnInit() {
  }
}

@Component({
  templateUrl: 'loading-details.html',
})
export class LoadingDetailsPage {
  order_type;
  order: SubOrders[];
  loading: any;
  role: string;
  showApprove: boolean = false;
  employees: Employee[];
  machines: MachineList[];
  yards: YardList[];
  vehicles: VehicleList[];
  testRadioYardOpen: boolean;
  testRadioMachineOpen: boolean;
  testRadioYardResult: string;
  testRadioMachineResult: string;
  testCheckboxOpen: boolean;
  testCheckboxResult: string;

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });

    this.loading.present();
  }

  constructor(public alerCtrl: AlertController, public nav: NavController, params: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController) {
    this.role = localStorage.getItem('role');
    // if (this.role == '1' || this.role == '2') {
    //   this.showApprove = true;
    //   console.log(this.showApprove);
    // }
    this.order = params.data.item;
    // console.log(this.order);
    // this.order_type = params.data.test;
    // this.showLoader("Collecting Order Details....");
    // this.authService.fetchSubOrder(this.order['order_GROUP_NO'])
    //   .subscribe(
    //     // (list) => {
    //     (list: SubOrders[]) => {
    //       this.subOrders = list;
    //       // console.log(this.subOrders);
    //       // this.loading_complete = true;
    //       this.loading.dismiss();
    //     },
    //     error => {
    //       // this.loading.dismiss();
    //       // this.handleError(error.json().error);
    //     }
    //   );
    // this.nav.push(OrdersPage, { item: this.subOrder });
    this.employees = [
      {
        "employeeId": "100",
        "jobTitleName": "Developer",
        "firstName": "Romin",
        "lastName": "Irani",
        "preferredFullName": "Romin Irani",
        "employeeCode": "E1",
        "region": "CA",
        "phoneNumber": "408-1234567",
        "emailAddress": "romin.k.irani@gmail.com"
      },
      {
        "employeeId": "101",
        "jobTitleName": "Developer",
        "firstName": "Neil",
        "lastName": "Irani",
        "preferredFullName": "Neil Irani",
        "employeeCode": "E2",
        "region": "CA",
        "phoneNumber": "408-1111111",
        "emailAddress": "neilrirani@gmail.com"
      },
      {
        "employeeId": "102",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
      },
    ];
    this.machines = [
      {
        "machine_ID": "001",
        "machine_TYPE": "100",
        "machine_NAME": "Machine 1 ",
        "machine_CAPACITY": "1000"
      },
      {
        "machine_ID": "002",
        "machine_TYPE": "100",
        "machine_NAME": "Machine 2",
        "machine_CAPACITY": "1001"
      },
      {
        "machine_ID": "003",
        "machine_TYPE": "101",
        "machine_NAME": "Machine 3",
        "machine_CAPACITY": "1002"
      },
    ];
    this.yards = [
      {
        "yard_ID": "1001",
        "yard_TYPE": "100",
        "yard_NAME": "QUARRY",
        "yard_CAPACITY": "1000"
      },
      {
        "yard_ID": "1002",
        "yard_TYPE": "100",
        "yard_NAME": "TILES",
        "yard_CAPACITY": "1001"
      },
      {
        "yard_ID": "1003",
        "yard_TYPE": "101",
        "yard_NAME": "PAVER",
        "yard_CAPACITY": "1002"
      },
      {
        "yard_ID": "1004",
        "yard_TYPE": "111",
        "yard_NAME": "HOLLOW BLOCKS",
        "yard_CAPACITY": "100"
      },
    ];
    this.vehicles = [
      {
        "vehicle_ID": "001",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 1 ",
        "vehicle_CAPACITY": "1000"
      },
      {
        "vehicle_ID": "002",
        "vehicle_TYPE": "100",
        "vehicle_NAME": "TRUCK 2",
        "vehicle_CAPACITY": "1001"
      },
      {
        "vehicle_ID": "003",
        "vehicle_TYPE": "101",
        "vehicle_NAME": "TRUCK 3",
        "vehicle_CAPACITY": "1002"
      },
      {
        "vehicle_ID": "005",
        "vehicle_TYPE": "102",
        "vehicle_NAME": "TRUCK 5",
        "vehicle_CAPACITY": "1004"
      },
      {
        "vehicle_ID": "006",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 6",
        "vehicle_CAPACITY": "1005"
      },
      {
        "vehicle_ID": "007",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 7",
        "vehicle_CAPACITY": "1006"
      },
      {
        "vehicle_ID": "008",
        "vehicle_TYPE": "103",
        "vehicle_NAME": "TRUCK 8",
        "vehicle_CAPACITY": "1007"
      },
      {
        "vehicle_ID": "009",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 9",
        "vehicle_CAPACITY": "1008"
      },
      {
        "vehicle_ID": "010",
        "vehicle_TYPE": "104",
        "vehicle_NAME": "TRUCK 10",
        "vehicle_CAPACITY": "1009"
      },
    ];
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  machineLoading: boolean = true;
  notifyLoadingOption(event) {
    this.testRadioYardResult = '';
    this.testCheckboxResult = '';
    this.testRadioMachineResult = '';
    this.machineLoading = !this.machineLoading; // console.log("Event:"+ event.checked); 
    console.log("Toggled Load: " + this.machineLoading);
  }

  doRadioYard() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Yard');
    for (var i = 0; i < this.yards.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.yards[i].yard_NAME,
        value: this.yards[i].yard_NAME,
      });

    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioYardOpen = false;
        this.testRadioYardResult = data;
        console.log('Radio data:', this.testRadioYardResult);
      }
    });

    alert.present().then(() => {
      this.testRadioYardOpen = true;
    });
  }

  doCheckbox() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Employees');

    for (var i = 0; i < this.employees.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.employees[i].firstName,
        value: this.employees[i].employeeId,
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }
  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Select Vehicle');
    for (var i = 0; i < this.vehicles.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.vehicles[i].vehicle_NAME,
        value: this.vehicles[i].vehicle_NAME,
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioMachineOpen = false;
        this.testRadioMachineResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioMachineOpen = true;
    });
  }

  updateSubOrder(sub_order_number, order_group_number, status) {
    console.log(sub_order_number, status);
    // this.showLoader();
    // this.showLoader("Updating the Order....");
    this.authService.updateStatusOfSubOrder(sub_order_number,order_group_number, status)
      .subscribe(
        (success) => {
          // this.retrieveSubOrders(refresh_list);
          // this.refreshList();
          this.nav.pop();
          this.nav.push(LoadingPage);
          // this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }

}