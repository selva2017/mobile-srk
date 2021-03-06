import { Platform } from 'ionic-angular/platform/platform';
import { CustomerMeeting, CustomerMaster, AddCustomerMeeting } from './../../models/customer-data';
import { UserList } from './../../models/user-list';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, App } from 'ionic-angular';
import { Site } from '../../models/customer';

@Component({
  selector: 'page-lead',
  templateUrl: 'lead.html',
})
export class LeadPage {
  public firstParam;
  customers: any;
  customer_meeting: CustomerMeeting[] = [];
  customer_master: CustomerMaster[] = [];
  current_customers: CustomerMaster[] = [];
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
    // console.log(sales_rep_id);
    // this.sales_rep_name = first_name + ' ' + last_name;
    this.sales_rep_name = sales_rep_id;
  }
  purposes = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Marketing' },
  ];
  site_status = [
    { id: 1, name: 'Basement' },
    { id: 2, name: 'Starting Stage' },
    { id: 3, name: '2n Floor' },
    { id: 4, name: 'Wall fixed' },
  ];
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
  loading: any;
  category: string;
  constructor(public nav: NavController, private authService: AuthService, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private toastCtrl: ToastController, public navParams: NavParams,
    public platform: Platform, app: App) {
    this.firstParam = navParams.get("firstPassed");
    if (this.firstParam != '') {
      this.category = this.firstParam;
      this.getNonBusinessCustomers();
    }

    // this.platform.ready().then(() => {
    //   this.platform.registerBackButtonAction(() => {
    //     app.navPop();
    //   });
    // })

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
          // console.log(list);
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
        "siteId": '',
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
  sites: Site[] = [];
  retrieveSiteofCustomer(customer_id) {
    this.authService.fetchSiteDetails(customer_id)
      .subscribe(
        (list: Site[]) => {
          // //console.log(list);
          this.sites = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );

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
    this.showLoader("Adding the Customer ....");
    this.authService.customerAddition(this.customers)
      .subscribe(
        success => {
          if (success.status == 200) {
            this.clearAll();
            this.loading.dismiss();
            // this.handleMessage("Success");
          }
          else {
            console.log(success.businessError);
            this.clearAll();
            success.businessError! = '' ? this.handleError(success.businessError) : '';
            this.loading.dismiss();
            // this.handleError(success.businessError);
            // this.presentToast(error);
          }
        },
        (error) => {
          console.log(error.businessError);
          this.loading.dismiss();
          // this.handleError("error");
        });
  }
  page_name: string;
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      // content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  onClick(name) {
    this.page_name = name;
  }
  onMeetingHistoryClick(item, option) {
    // console.log(item);
    this.nav.push(CustomerMeetingsPage, { item: item, option });
  }
  clearAll() {
    this.userList['userName'] = '';
    this.customers['cust_NAME'] = '';
    this.customers['alias'] = '';
    this.customers['locality_ID'] = '';
    this.customers['address']['address'] = '';
    this.customers['address']['city'] = '';
    this.customers['address']['state'] = '';
    this.customers['address']['district'] = '';
    this.customers['address']['pinCode'] = '';
    this.customers['cust_PHONE1'] = '';
    this.customers['cust_PHONE2'] = '';
    this.customers['cust_EMAIL'] = '';
    this.customers['gst_NUMBER'] = '';
    this.customers['customerEnquiry']['purposeOfVisit'] = '';
    this.customers['customerEnquiry']['meetingNotes'] = '';
    this.customers['customerEnquiry']['nextFollowUpDate'] = '';
    this.customers['customerEnquiry']['siteStatus'] = '';
    this.customers['customerEnquiry']['materialRequest'] = '';
    this.customers['customerEnquiry']['remark'] = '';
  }
  // onAddNewSite(item, option) {
  //   console.log(item);
  //   this.nav.push(CustomerMeetingsPage, { item: item, option });
  // }
  getNonBusinessCustomers() {
    this.showLoader("Collecting Future Customers....");
    this.authService.fetchCustomerMaster("NON_BUSINESS", "all")
      .subscribe(
        (list) => {
          // console.log(list);
          this.customer_master = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  getBusinessCustomers() {
    this.showLoader("Collecting the Customers....");
    this.authService.fetchCustomerMaster("BUSINESS", "all")
      .subscribe(
        (list) => {
          // console.log(list);
          this.current_customers = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  convertCustomer(customer_id, type) {
    this.showLoader("Adding to the Customers list....");
    this.authService.changeCustomerType(customer_id, type)
      .subscribe(
        (success) => {
          console.log("succes" + success);
          this.nav.pop();
          this.nav.push(LeadPage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => {
          console.log("fail" + error);
          this.nav.pop();
          this.nav.push(LeadPage);
          this.loading.dismiss();
        }
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
  // new_meeting: AddCustomerMeeting[] = [];
  new_meeting = {
    enquiryId: '',
    siteId: '',
    custId: '',
    enquiryDate: '',
    purposeOfVisit: '',
    meetingNotes: '',
    nextFollowUpDate: '',
    siteStatus: '',
    materialRequest: '',
    remark: '',
    status: '',
    reviewedBy: '',
    closedDate: '',
    createdBy: ''
  }
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
    this.option_type == 'view_list' ? this.retrieveCustomerEnquiries() : '';
    this.retrieveSiteofCustomer(this.order);
  }
  retrieveCustomerEnquiries() {
    this.showLoader("Collecting Customer Enquiries....");
    this.authService.fetchCustomerEnquiry(this.order)
      .subscribe(
        (list) => {
          // console.log(list);
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
    this.showLoader("Adding New Site to the Customer....");
    this.authService.addNewSite(site_details)
      .subscribe(
        success => {
          if (success == 200) {
            this.nav.pop();
            this.nav.push(LeadPage, { firstPassed: "view" });
            this.loading.dismiss();
            // this.handleMessage("Success");
          }
          else {
            this.loading.dismiss();
            // this.handleError("error");
          }
        },
        (error) => {
          this.loading.dismiss();
          // this.handleError("error");
          // this.presentToast(error);
        });
  }
  onAddNewMeeting(new_meeting) {
    console.log("onAddNewMeeting");
    console.log(new_meeting);
    this.new_meeting['custId'] = this.order; //option_type stores customer id
    this.showLoader("Adding New Meeting to the Customer....");
    this.authService.addNewMeeting(new_meeting)
      .subscribe(
        success => {
          if (success == 200) {
            this.nav.pop();
            this.nav.push(LeadPage);
            this.loading.dismiss();
            // this.handleMessage("Success");
          }
          else {
            this.loading.dismiss();
            // this.handleError("error");
          }
        },
        (error) => {
          this.loading.dismiss();
          // this.handleError("error");
          // this.presentToast(error);
        });
  }
  onChangeMeetingStatus(enquiry_id, status) {
    this.showLoader("Changing the meeting Status to " + status);
    this.authService.changeCustomerEnquiryStatus(enquiry_id, status)
      .subscribe(
        (success) => {
          this.nav.pop();
          this.nav.push(LeadPage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => {
          console.log(error)
          this.loading.dismiss();
        }
      );
  }
  sites: Site[] = [];
  retrieveSiteofCustomer(customer_id) {
    this.authService.fetchSiteDetails(customer_id)
      .subscribe(
        (list: Site[]) => {
          // //console.log(list);
          this.sites = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
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
  purposes = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Marketing' },
  ];
  site_status = [
    { id: 1, name: 'Basement' },
    { id: 2, name: 'Starting Stage' },
    { id: 3, name: '2n Floor' },
    { id: 4, name: 'Wall fixed' },
  ];
}

