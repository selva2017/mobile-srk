import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  transportAllocatedOrders: SubOrders[] = [];

  updateSubOrder(sub_order_number, status, refresh_list) {
    console.log(sub_order_number, status);
    // this.showLoader();
    this.authService.updateStatusOfSubOrder(sub_order_number, status)
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
    this.transportAllocatedOrders = [];
    // status = "APPROVED"
    this.authService.fetchApprovedSubOrders(status)
      .subscribe(
        // (list) => {
        (list: SubOrders[]) => {
          this.transportAllocatedOrders = list;
          // console.log(this.transportAllocatedOrders);
          // this.loading_complete = true;
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
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
    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Alderaan',
    //   value: 'value1',
    //   checked: true
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Bespin',
    //   value: 'value2'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Coruscant',
    //   value: 'value3'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Endor',
    //   value: 'value4'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Hoth',
    //   value: 'value5'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Jakku',
    //   value: 'value6'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Naboo',
    //   value: 'value6'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Takodana',
    //   value: 'value6'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'Tatooine',
    //   value: 'value6'
    // });
    // alert.addInput(
    //   {
    //     name: 'title',
    //     placeholder: 'Title'
    //   },
    // );
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
  constructor(public alerCtrl: AlertController, private authService: AuthService) {
    this.retrieveSubOrders("ALLOCATED");
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
        "vehicle_NAME": "TRUCK2",
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
        "yard_NAME": "Yard 1 ",
        "yard_CAPACITY": "1000"
      },
      {
        "yard_ID": "1002",
        "yard_TYPE": "100",
        "yard_NAME": "Yard 2",
        "yard_CAPACITY": "1001"
      },
      {
        "yard_ID": "1003",
        "yard_TYPE": "101",
        "yard_NAME": "Yard 3",
        "yard_CAPACITY": "1002"
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