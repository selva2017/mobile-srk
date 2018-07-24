import { CustomerMeeting, CustomerMaster } from './../../models/customer-data';
import { UserList } from './../../models/user-list';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-lead',
  templateUrl: 'lead.html',
})
export class LeadPage {

  customers: any;
  customer_meeting: CustomerMeeting[] = [];
  customer_master: CustomerMaster[] = [];
  showMeetingDetails: boolean = false;

  onMeetingNotesChange() {
    this.showMeetingDetails = !this.showMeetingDetails;
  }
  showReferenceDetails: boolean = false;

  referenceOption() {
    this.showReferenceDetails = !this.showReferenceDetails;
  }
  sales_rep_name: string;
  // onSelectSalesRep(first_name, last_name) {
  onSelectSalesRep(sales_rep_id) {
    console.log(sales_rep_id);
    // this.sales_rep_name = first_name + ' ' + last_name;
    this.sales_rep_name = sales_rep_id;
  }
  reference_types = [
    { id: 1, name: 'Engineer' },
    { id: 2, name: 'Masteri' },
    { id: 3, name: 'Other' },

  ];
  state_list = [
    { id: 1, name: 'Tamilnadu' },
    { id: 2, name: 'Kerala' },
    { id: 3, name: 'Karnataka' },

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
  userList: UserList[];

  constructor(public nav: NavController, private authService: AuthService,
    private alertCtrl: AlertController, private toastCtrl: ToastController) {
    // Get Sales Rep names
    // this.authService.getInternalUsers("3")
    this.authService.getInternalUsers("3")
      .subscribe(
        (list) => {
          // this.pricing1 = list;
          this.userList = list;
          // console.log(list);
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    this.authService.fetchCustomerEnquiry("all")//all or id
      .subscribe(
        (list) => {
          console.log(list);
          this.customer_meeting = list;
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );

    this.customers = {
      "sales_REP_ID": '',
      "site_ID": '',
      "cust_ID": "",
      "cust_TYPE": "",
      "cust_NAME": "",
      "cust_ADDRESS_ID": "",
      "cust_PHONE1": "",
      "cust_PHONE2": "",
      "cust_EMAIL": "",
      "gst_NUMBER": "",
      "balance": "",
      "cust_CRM_ID": "",
      "locality_ID": "",
      "reference_ID": "",
      "site_ADDRESS_ID": '',
      "site_CONTACT_NUMBER": '',
      "site_NAME": '',
      "business_CUSTOMER": '',
      "alias": '',
      "address": {
        "addressId": "",
        "address": "",
        "address2": "",
        "city": "",
        "district": "",
        "state": "",
        "pinCode": "",
        "longitude": "",
        "latitude": ""
      },
      "reference": {
        "reference_ID": '',
        "refrer_NAME": "",
        "referer_ADDRESS": "",
        "referer_MOBILE1": "",
        "referer_MOBILE2": "",
        "referer_EMAIL": "",
        "referer_TYPE": ""
      },
      "site": {
        "cust_ID": '',
        "site_ID": '',
        "site_ADDRESS_ID": '',
        "site_CONTACT_NUMBER": "",
        "site_NAME": "",
        "address": {
          "addressId": "",
          "address": "",
          "address2": "",
          "city": "",
          "district": "",
          "pinCode": "",
          "longitude": "",
          "latitude": ""
        }
      },
      "customerEnquiry": {
        "enquiryId": '',
        "custId": '',
        "enquiryDate": '',
        "purposeOfVisit": '',
        "meetingNotes": '',
        "nextFollowUpDate": '',
        "siteStatus": '',
        "materialRequest": '',
        "remark": '',
        "status": '',
        "reviewedBy": '',
        "closedDate": null,
        "createdBy": ''
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
  role: string;
  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  onSubmitCustomer(customer) {
    // console.log(customer);
    customer['customerEnquiry']['status'] = 'NEW';

    if (localStorage.getItem('role') == '3') {
      this.customers['sales_REP_ID'] = localStorage.getItem('employeeId');
      // this.customers['customerEnquiry']['createdBy'] = localStorage.getItem('employeeId');
      // this.estimate['estimation']['salesRepName'] = localStorage.getItem('userName');
    } else {
      this.customers['sales_REP_ID'] = this.sales_rep_name;
    }
    this.customers['customerEnquiry']['createdBy'] = localStorage.getItem('employeeId');
    this.customers['business_CUSTOMER'] = 'NON_BUSINESS';
    // this.estimate['onBehalf'] = localStorage.getItem('employeeId');

    this.authService.customerAddition(this.customers)
      .subscribe(
        success => {
          if (success.status == 200) {
            // this.loading.dismiss();
            // this.handleMessage("Success");
          }
          else {
            console.log(success.businessError);
            // this.loading.dismiss();
            this.handleError(success.businessError);
            // this.presentToast(error);
          }
        },
        (error) => {
          console.log(error.businessError);
          // this.loading.dismiss();
          // this.handleError("error");
        });
  }
  page_name: string;
  onClick(name) {
    this.page_name = name;
  }
  onMeetingHistoryClick(item, option) {
    console.log(item);
    this.nav.push(CustomerMeetingsPage, { item: item, option });
  }
  // onAddNewSite(item, option) {
  //   console.log(item);
  //   this.nav.push(CustomerMeetingsPage, { item: item, option });
  // }
  getNonBusinessCustomers() {
    this.authService.fetchCustomerMaster("NON_BUSINESS", "all")
      .subscribe(
        (list) => {
          console.log(list);
          this.customer_master = list;
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );

  }
  convertCustomer(customer_id, type) {
    this.authService.changeCustomerType(customer_id, type)
      .subscribe(
        (success) => {
          this.nav.pop();
          this.nav.push(LeadPage);
          // this.refreshList();
          // this.loading.dismiss();
        },
        (error) => console.log(error)
      );

  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Message...',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 10000,
      showCloseButton: true,
      closeButtonText: 'Close',
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      // //console.log('Dismissed toast');
    });

    toast.present();
  }
}
@Component({
  templateUrl: 'customer-meetings.html',
})
export class CustomerMeetingsPage {
  order;
  option_type;
  customer_meeting: CustomerMeeting[] = [];
  new_meeting: CustomerMeeting[] = [];
  site: any;
  loading: any;
  role: string;
  showApprove: boolean = false;
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });

    this.loading.present();
  }
  constructor(public nav: NavController, params: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController) {
    this.site = {
      "cust_ID": '',
      "site_ID": null,
      "site_ADDRESS_ID": '',
      "site_CONTACT_NUMBER": "",
      "site_NAME": "",
      "address": {
        "addressId": "",
        "address": "",
        "address2": "",
        "city": "",
        "district": "",
        "pinCode": "",
        "longitude": "",
        "latitude": ""
      }
    }

    this.role = localStorage.getItem('role');
    // if (this.role == '1' || this.role == '2') {
    //   this.showApprove = true;
    //   console.log(this.showApprove);
    // }
    this.order = params.data.item;
    this.option_type = params.data.option;
    this.showLoader("Collecting Customer Enquiries....");
    this.authService.fetchCustomerEnquiry(this.order)
      .subscribe(
        (list) => {
          console.log(list);
          this.customer_meeting = list;
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    // this.nav.push(OrdersPage, { item: this.subOrder });
  }

  onAddNewSite(site_details) {
    site_details['cust_ID'] = this.order; //option_type stores customer id
    this.authService.addNewSite(site_details)
      .subscribe(
        success => {
          if (success == 200) {
            this.nav.pop();
            this.nav.push(LeadPage);
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
  onAddNewMeeting(site_details) {
    site_details['cust_ID'] = this.order; //option_type stores customer id
    this.authService.addNewMeeting(site_details)
      .subscribe(
        success => {
          if (success == 200) {
            this.nav.pop();
            this.nav.push(LeadPage);
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
  onChangeMeetingStatus(enquiry_id, status){
    this.authService.changeCustomerEnquiryStatus(enquiry_id, status)
    .subscribe(
      (success) => {
        this.nav.pop();
        this.nav.push(LeadPage);
        // this.refreshList();
        // this.loading.dismiss();
      },
      (error) => console.log(error)
    );

  }
  // rejectOrder(order_GROUP_NO) {
  //   // console.log(order_GROUP_NO);
  //   this.showLoader("Collecting Rejected Orders...");
  //   this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "REJECTED")
  //     .subscribe(
  //       (success) => {
  //         this.nav.pop();
  //         this.nav.push(OrdersPage);
  //         // this.refreshList();
  //         this.loading.dismiss();
  //       },
  //       (error) => console.log(error)
  //     );
  // }
  // approveOrder(order_GROUP_NO) {
  //   // console.log(order_GROUP_NO);
  //   this.showLoader("Collecting Approved Orders....");
  //   this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "APPROVED")
  //     .subscribe(
  //       (success) => {
  //         // this.refreshList();
  //         this.nav.pop();
  //         this.nav.push(OrdersPage);
  //         this.loading.dismiss();
  //       },
  //       (error) => console.log(error)
  //     );
  // }
  state_list = [
    { id: 1, name: 'Tamilnadu' },
    { id: 2, name: 'Kerala' },
    { id: 3, name: 'Karnataka' },

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

}

