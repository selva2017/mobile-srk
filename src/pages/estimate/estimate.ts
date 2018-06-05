import { AlertController } from 'ionic-angular';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { NgForm } from "@angular/forms";

import { Platform } from 'ionic-angular/platform/platform';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Orders } from './../../models/orders';
import { Customer, Site, Reference } from './../../models/customer';
import { Estimate } from '../../models/estimate';
import { Product } from '../../models/product';
import { ProductGroup } from '../../models/product-group';
// import { Estimate } from './../../models/estimate';


@IonicPage()
@Component({
  selector: 'page-estimate',
  templateUrl: 'estimate.html',
})
export class EstimatePage {
  customers: Customer[];
  customer: Customer[] = [];
  // customer1: Customer[] = [];
  orders: Orders[];
  customerName: string;
  loading: any;
  itemGroup: string;
  // itemGroup: string = "Aggregate";
  itemName: string;
  // items: product[] = [];
  items1: Product[] = [];
  distanceKM: string;
  unitsTotal: string;
  unit1: string;
  unit2: string;
  unit4: string;
  unit6: string;
  estimate: Estimate[] = [];
  partialLoadOption: boolean = false;
  products: Product[] = [];
  selectedProduct: Product[] = [];
  productGroupModel: ProductGroup[] = [];
  sites: Site[] = [];
  references: Reference[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // this.customers = [
    //   { "cust_ID": "1", "cust_TYPE": "cus_ty1", "cust_NAME": "cus name1", "cust_ADDRESS_ID": "100", "cust_PHONE1": "", "cust_PHONE2": null, "cust_EMAIL": null, "gst_NUMBER": "123", "balance": "100.00", "cust_CRM_ID": "101", "locality_ID": "201", "reference_ID": "100", "site_CONTACT_NUMBER": "11111111", "site_NAME": "site1", "site_ADDRESS_ID": null },
    //   { "cust_ID": "2", "cust_TYPE": "cus_ty2", "cust_NAME": "cus name2", "cust_ADDRESS_ID": "100", "cust_PHONE1": "", "cust_PHONE2": null, "cust_EMAIL": null, "gst_NUMBER": "123", "balance": "100.00", "cust_CRM_ID": "101", "locality_ID": "201", "reference_ID": "200", "site_CONTACT_NUMBER": "11111111", "site_NAME": "site2", "site_ADDRESS_ID": null }
    // ];
    // this.productGroupModel = [
    //   { "item_Group_ID": "1", "item_Group_Name": "  ROUGH STONE " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  BOULDERS  " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  AGGREGATES  " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  M Sand  " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  TILES " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  BLOCKS  " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  PAVERS  " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  Manual PAVERS " },
    //   { "item_Group_ID": "1", "item_Group_Name": "  Rubber Mould  " }
    //       ];
    // this.products = [{
    //   "productDetails": null,
    //   "product_ID": "100",
    //   "product_NAME": "Rough Stone",
    //   "product_CODE": "RS",
    //   "company_ID": "2",
    //   "product_COST_ID": "99",
    //   "loading_COST": "1500",
    //   "product_UNIT_CONV_ID": "10",
    //   "from_UNIT": "1000",
    //   "from_UNIT_TYPE": "Kgs",
    //   "to_UNIT": "2",
    //   "to_UNIT_TYPE": "Units",
    //   "uom_ID": "1",
    //   "uom": "Units",
    //   "product_COST": "100",
    //   "product_TAX1": "10",
    //   "product_GROUP_ID": "1000",
    //   "product_TAX2": null,
    //   "division_ID": null,
    //   "product_GROUP_NAME": "Aggregate",
    //   "product_GROUP_ID": "1000"
    // },
    // {
    //   "productDetails": [
    //     {
    //       "product_ID": "107",
    //       "product_DETAIL_ID": "87",
    //       "product_DETAIL_NAME": "FLORA YELLOW"
    //     },
    //     {
    //       "product_ID": "107",
    //       "product_DETAIL_ID": "86",
    //       "product_DETAIL_NAME": "FLORA RED"
    //     },
    //     {
    //       "product_ID": "107",
    //       "product_DETAIL_ID": "85",
    //       "product_DETAIL_NAME": "FLORA GREY"
    //     },
    //     {
    //       "product_ID": "107",
    //       "product_DETAIL_ID": "84",
    //       "product_DETAIL_NAME": "FLORA BROWN"
    //     }
    //   ],
    //   "product_ID": "107",
    //   "product_NAME": "R.M FLORA",
    //   "product_CODE": "R.M FLORA",
    //   "company_ID": "2",
    //   "product_COST_ID": "92",
    //   "loading_COST": "0",
    //   "product_UNIT_CONV_ID": "10",
    //   "from_UNIT": "1000",
    //   "from_UNIT_TYPE": "Kgs",
    //   "to_UNIT": "2",
    //   "to_UNIT_TYPE": "Units",
    //   "uom_ID": "1",
    //   "uom": "Units",
    //   "product_COST": "100",
    //   "product_TAX1": "10",
    //   "product_GROUP_ID": "1004",
    //   "product_TAX2": null,
    //   "division_ID": null,
    //   "product_GROUP_NAME": "Tiles",
    //   "product_GROUP_ID": "1004"
    // }];


  }
  //  this.items = [
  //       "productGroups": [
  //       {
  //         "products": [
  //           {
  //             "productDetails": null,
  //             "product_GROUP_ID": "1000",
  //             "product_ID": "100",
  //             "product_NAME": "ROUGH STONE",
  //             "product_CODE": "RS",
  //             "company_ID": "2",
  //             "product_COST_ID": "99",
  //             "loading_COST": "1500",
  //             "product_UNIT_CONV_ID": "10",
  //             "from_UNIT": "1000",
  //             "from_UNIT_TYPE": "Kgs",
  //             "to_UNIT": "2",
  //             "to_UNIT_TYPE": "Units",
  //             "uom_ID": "1",
  //             "uom": "Units",
  //             "product_COST": "100",
  //             "product_TAX1": "10",
  //             "product_TAX2": null
  //           }
  //         ],
  //         "product_GROUP_ID": "1000",
  //         "division_ID": null,
  //         "product_GROUP_NAME": "ROUGH STONE"
  //       },
  //     ],
  //     "division_ID": "100",
  //     "division_NAME": "Quarry"
  //  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstimatePage');
  }

  onItemNameChange(product: Product[]) {
    // console.log("customer");
    console.log(product);
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  onSelectCustomer(customer_id) {
    console.log(customer_id);
    this.authService.fetchSiteDetails(customer_id)
      .subscribe(
        (list: Site[]) => {
          console.log(list);
          this.sites = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    this.authService.fetchReferenceDetails()
      .subscribe(
        (list: Reference[]) => {
          console.log(list);
          this.references = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  onSelectSite(site_name) {
  }
  onSelectReference(reference_name) {
  }
  onChangeTotalUnits() {
    if (this.itemGroup == "HOLLOW BLOCK") {
      this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
      this.estimate['partialLoad'] = this.estimate['unitsTotal'] % 700;
      // this.estimate['partialLoad'] > 0;
      if (this.estimate['partialLoad'] > 0) {
        this.partialLoadOption = true;
      }
    }
  }

  onItemGroupChange(product: Product[], product_group_id, product_group_name) {
    this.authService.fetchProductDetailForGroup(product_group_id)
      .subscribe(
        (list: Product[]) => {
          console.log(list);
          this.products = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    this.itemGroup = "";
    // this.itemGroup = "Aggregate";
    // console.log("inside product group");
    console.log(product_group_name);
    if (product_group_name == "AGGREGATES") {
      // console.log("inside Quarry Division");
      this.itemGroup = "Quarry";
      // this.items1 = product;
    }
    if (product_group_name == "HOLLOW BLOCK") {
      this.itemGroup = "HOLLOW BLOCK";
      // console.log("inside HOLLOW BLOCK Division");
      // console.log(product);
      // console.log(this.estimate['unitsTotal']);
      // this.items1 = product;
    }

    if (product_group_name == "PAVER") {
      // console.log("inside PAVER Division");
      // console.log(product);
      // this.items1 = product;
    }
    // console.log(this.items1);
  }
  // estimateOrder(orders: Orders) {
  estimateOrder() {
    // console.log("orders");
    // console.log(this.customer);
    // this.estimate['customerName'] = this.customer['cust_Name'];
    // this.estimate['itemGroup'] = this.itemGroup;
    // this.estimate['itemGroupName'] = this.customer1['cust_Name']
    // this.estimate['orderDetails']['unit1'] = this.unit1;
    // this.estimate['orderDetails']['unit2'] = this.unit2;
    // this.estimate['orderDetails']['unit4'] = this.unit4;
    // this.estimate['orderDetails']['unit6'] = this.unit6;
    // console.log(this.customer['cust_Name']);
    // console.log(this.itemGroup);
    // console.log(this.customer1['cust_Name']);
    // console.log(this.unit1);
    // console.log(this.unit2);
    // console.log(this.unit4);
    // console.log(this.unit6);
    // console.log(this.estimate);
    // this.orderData.slice();
    // this.orderData.push(orders);
    // console.log(this.orderData);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Customers...'
    });
  }

  ngOnInit() {
    // const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
    this.showLoader();
    this.authService.fetchCustomerData()
      .subscribe(
        (list: Customer[]) => {
          // console.log(list);
          this.customers = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
    // this.authService.fetchItemData()
    //   .subscribe(
    //     (list: Product[]) => {
    //       this.products = list;
    //       console.log(this.products);
    //       this.loading.dismiss();
    //     },
    //     error => {
    //       this.loading.dismiss();
    //       // this.handleError(error.json().error);
    //     }
    //   );
    this.authService.fetchProductGroup()
      .subscribe(
        (list: ProductGroup[]) => {
          this.productGroupModel = list;
          console.log(this.productGroupModel);
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
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