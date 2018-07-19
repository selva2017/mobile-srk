import { AuthService } from './../../providers/auth-service/auth-service';
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

  customers: any;
  showSiteDetails: boolean = false;

  siteOption() {
    this.showSiteDetails = !this.showSiteDetails;
  }
  showReferenceDetails: boolean = false;

  referenceOption() {
    this.showReferenceDetails = !this.showReferenceDetails;
  }

  reference_types = [
    { id: 1, name: 'Engineer' },
    { id: 2, name: 'Masteri' },
    { id: 3, name: 'Other' },

  ];

  cities = [
    { id: 1, name: 'Perundurai' },
    { id: 2, name: 'Tiruppur' },
    { id: 3, name: 'Coimbatore' },
    { id: 4, name: 'Mettupalayam' },
    { id: 5, name: 'Salem' },
    { id: 7, name: 'Namakkal' }
  ];
  districts = [
    { id: 1, name: 'Erode' },
    { id: 2, name: 'Tiruppur' },
    { id: 3, name: 'Coimbatore' },
    { id: 4, name: 'Nilgris' },
    { id: 5, name: 'Salem' },
    { id: 7, name: 'Namakkal' }
  ];
  constructor(private authService: AuthService) {
    this.customers = {
      "sales_REP_ID": 1001,
      "site_ID": null,
      "cust_ID": "",
      "cust_TYPE": "Contract",
      "cust_NAME": "VV Traders",
      "cust_ADDRESS_ID": "",
      "cust_PHONE1": "9566778916",
      "cust_PHONE2": "7010953117",
      "cust_EMAIL": "s2@s.com",
      "gst_NUMBER": "GST007",
      "balance": "30000.00",
      "cust_CRM_ID": "101",
      "locality_ID": "",
      "reference_ID": "",
      "site_ADDRESS_ID": null,
      "site_CONTACT_NUMBER": null,
      "site_NAME": null,
      "address": {
        "addressId": "",
        "address": "123",
        "city": "chennai",
        "district": "ch",
        "pinCode": "12345"
      },
      "reference": {
        "reference_ID": null,
        "refrer_NAME": "Suresh",
        "referer_ADDRESS": "no 13",
        "referer_MOBILE1": "923456725",
        "referer_MOBILE2": "82534212",
        "referer_EMAIL": "a@gmail.com",
        "referer_TYPE": "Manager"
      },
      "site": {
        "cust_ID": null,
        "site_ID": null,
        "site_ADDRESS_ID": null,
        "site_CONTACT_NUMBER": "82345634",
        "site_NAME": "Tour",
        "address": {
          "addressId": "",
          "address": "123",
          "city": "chennai",
          "district": "ch",
          "pinCode": "12345"
        }
      }
    }
    // this.customers = {
    //   "sales_REP_ID": '',
    //   "site_ID": '',
    //   "cust_ID": "",
    //   "cust_TYPE": "",
    //   "cust_NAME": "",
    //   "cust_ADDRESS_ID": "",
    //   "cust_PHONE1": "",
    //   "cust_PHONE2": "",
    //   "cust_EMAIL": "",
    //   "gst_NUMBER": "",
    //   "balance": "",
    //   "cust_CRM_ID": "",
    //   "locality_ID": "",
    //   "reference_ID": "",
    //   "site_ADDRESS_ID": '',
    //   "site_CONTACT_NUMBER": '',
    //   "site_NAME": '',
    //   "address": {
    //     "addressId": "",
    //     "address": "",
    //     "city": "",
    //     "district": "",
    //     "pinCode": ""
    //   }
    // }
    //   this.customers = {
    //   "sales_REP_ID": '1001',
    //   "site_ID": '',
    //   "cust_ID": "",
    //   "cust_TYPE": "Contract",
    //   "cust_NAME": "VV Traders",
    //   "cust_ADDRESS_ID": "",
    //   "cust_PHONE1": "1166778916",
    //   "cust_PHONE2": "1010953117",
    //   "cust_EMAIL": "s2@s.com",
    //   "gst_NUMBER": "GST007",
    //   "balance": "30000.00",
    //   "cust_CRM_ID": "101",
    //   "locality_ID": "",
    //       "reference_ID": {
    //     "name": "",
    //     "type": "",
    //     "phone": ""
    //   },
    //   "site_ADDRESS_ID": 'null',
    //   "site_CONTACT_NUMBER": 'null',
    //   "site_NAME": 'null',
    //   "address" : {
    //     "addressId": "",
    //     "address": "123",
    //     "city": "chennai",
    //     "district": "ch",
    //     "pinCode": "12345"
    //   }
    // }
  }

  ngOnInit() {
  }
  onSubmitCustomer(customer) {
    console.log(customer);;
    this.customers['sales_REP_ID'] = localStorage.getItem('employeeId');
    this.authService.customerAddition(this.customers)
      .subscribe(
        success => {
          if (success == 200) {
            // this.loading.dismiss();
            // this.handleMessage("Success");
          }
          else {
            // this.loading.dismiss();
            // this.handleError("error");
          }
        },
        (error) => {
          // this.loading.dismiss();
          // this.handleError("error");
          // this.presentToast(error);
        });
  }
}