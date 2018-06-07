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
// import { Estimate } from '../../models/estimate';
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
  // customerName: string;
  loading: any;
  itemGroup: string;
  // itemGroup: string = "Aggregate";
  productName: string;
  // items: product[] = [];
  items1: Product[] = [];
  distanceKM: number;
  unitsTotal: number;
  unit1: number;
  unit2: number;
  unit4: number;
  unit6: number;
  // estimate: Estimate[] = [];
  partialLoadOption: boolean = false;
  products: Product[] = [];
  selectedProduct: Product[] = [];
  productGroupModel: ProductGroup[] = [];
  sites: Site[] = [];
  references: Reference[] = [];
  partialLoad: number;
  estimate = {
    customerID: '',
    // itemGroup: '',
    siteID: '',
    reference1: '',
    reference2: '',
    productGroupName: '',
    product: '',
    distanceKM: 0,
    unitsTotal: 0,
    fullLoads: 0,
    fullLoadsCost: 0,
    fullLoadsTax: 0,
    fullLoadsTransportCost: 0,
    fullLoadsTotalCost: 0,
    partialLoad: 0,
    partialLoadCost: 0,
    partialLoadTax: 0,
    partialLoadTransportCost: 0,
    partialLoadTotalCost: 0,
    unit1: 0,
    unit1Cost: 0,
    unit1Tax: 0,
    unit1LoadingCost: 0,
    unitlTransportCost: 0,
    unit1TotalCost: 0,
    unit2: 0,
    unit2Cost: 0,
    unit2Tax: 0,
    unit2LoadingCost: 0,
    unit2TransportCost: 0,
    unit2TotalCost: 0,
    unit4: 0,
    unit4Cost: 0,
    unit4Tax: 0,
    unit4LoadingCost: 0,
    unit4TransportCost: 0,
    unit4TotalCost: 0,
    unit6: 0,
    unit6Cost: 0,
    unit6Tax: 0,
    unit6LoadingCost: 0,
    unit6TransportCost: 0,
    unit6TotalCost: 0,
    tiles: '',
    tilesLoadingCost: 0,
    tilesTransportCost: 0,
    tilesSqFtCost: 0,
    tilesTax: 0,
    tilesTotalCost: 0,
    pavers: '',
    paversLayingCost: 0,
    paversLoadingCost: 0,
    paversTransportCost: 0,
    paversSqFtCost: 0,
    paversTax: 0,
    paversTotalCost: 0,
    taxable: '',
    salesRep: '',
    transportPerKMCost: 0,
    loadingCost: 0,
    taxAmount: 0,
    totalCost: 0
  }
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad EstimatePage');
  }

  onItemNameChange(product: Product[]) {
    // console.log("customer");
    // console.log(product);
    this.selectedProduct = product;
    // console.log(this.selectedProduct);
  }

  onSelectCustomer(customer_id) {
    // console.log(customer_id);
    this.authService.fetchSiteDetails(customer_id)
      .subscribe(
        (list: Site[]) => {
          // console.log(list);
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
          // console.log(list);
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
  productPricePerUnit: number;
  loadingCostPerUnit: number;
  transportPerKMCost: number;
  tax1: number;
  tax2: number;
  taxCost1: number;
  taxCost2: number;
  totalCost: number;
  totalProductCost: number;
  totalTax: number;
  totalLoadingCost: number;
  transportPerKMCostUnit1: number;
  transportPerKMCostUnit2: number;
  transportPerKMCostUnit4: number;
  transportPerKMCostUnit6: number;
  transportPerKMCostHB: number;
  transportPerKMCostPavers: number;
  transportPerKMCostTiles: number;
  paversLayingCost: number;
  transportCostPerSqFt: number;
  productCostPerSqFt: number;

  onChangeTotalUnits(units) {
    console.log(this.estimate);
    // Identify the Partial Load display and value
    console.log(this.productPricePerUnit = this.estimate['product']['product_COST']);
    console.log(this.loadingCostPerUnit = this.estimate['product']['loading_COST']);
    console.log(this.tax1 = this.estimate['product']['product_TAX1']);
    console.log(this.tax2 = this.estimate['product']['product_TAX2']);
    console.log(this.distanceKM = this.estimate['distanceKM']);
    console.log(this.unitsTotal = this.estimate['unitsTotal']);
    switch (this.itemGroup) {
      case "Quarry": {
        console.log(this.transportPerKMCostUnit1 = 25);
        console.log(this.transportPerKMCostUnit2 = 30);
        console.log(this.transportPerKMCostUnit4 = 35);
        console.log(this.transportPerKMCostUnit6 = 50);
        console.log(this.estimate['unit1']);
        console.log(this.estimate['unit2']);
        console.log(this.estimate['unit4']);
        console.log(this.estimate['unit6']);
        break;
      }
      case "DESIGNER TILES": {
        this.transportPerKMCostTiles = 50;
        console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));
        break;
      }
      case "PAVER": {
        this.transportPerKMCostPavers = 50;
        this.paversLayingCost = 5.50; // Only for Pavers
        console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostPavers) / this.unitsTotal);
        console.log(this.productCostPerSqFt = this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt + this.loadingCostPerUnit);
        break;
      }
      case "HOLLOW BLOCK": {
        this.transportPerKMCostHB = 60;
        console.log(this.estimate['fullLoads']); //700*loads
        console.log(this.estimate['partialLoad']); //partial load count
        break;
      }
    }
    if (this.itemGroup == "HOLLOW BLOCK") {
      this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
      this.estimate['partialLoad'] = this.estimate['unitsTotal'] % 700;
      // this.estimate['partialLoad'] > 0;
      if (this.estimate['partialLoad'] > 0) {
        this.partialLoadOption = true;
      }
    }
    // Price, Tax, Loading, Tax and Total Cost calc
    // console.log('product_COST');
    // console.log(this.estimate['product']['product_COST']);
    // this.productPricePerUnit = this.estimate['product']['product_COST'];
    // console.log('loading_COST');
    // console.log(this.estimate['product']['loading_COST']);
    // this.loadingCostPerUnit = this.estimate['product']['loading_COST'];
    // console.log('distanceKM');
    // console.log(this.estimate['distanceKM']);
    // this.transportPerKMCost = this.estimate['distanceKM'] * 25;
    // console.log('product_TAX1');
    // console.log(this.estimate['product']['product_TAX1']);
    // this.taxCost1 = this.estimate['product']['product_TAX1'] = 2.5;
    // console.log('product_TAX2');
    // console.log(this.estimate['product']['product_TAX2']);
    // this.taxCost2 = this.estimate['product']['product_TAX2'] = 2.5;

    // this.totalProductCost = this.productPricePerUnit * this.estimate['unitsTotal'];
    // console.log('totalProductCost');
    // console.log(this.totalProductCost);
    // this.totalTax = (this.taxCost1 / 100) * this.totalProductCost + (this.taxCost2 / 100) * this.totalProductCost;
    // // console.log('totalTax');
    // // console.log(totalTax);
    // this.totalLoadingCost = this.loadingCostPerUnit * this.estimate['unitsTotal'];
    // this.totalCost = this.totalProductCost + this.totalTax +
    //   + this.transportPerKMCost + this.totalLoadingCost;
    // console.log('totalCost');
    // console.log(this.totalCost);

    // if (this.itemGroup == "HOLLOW BLOCK") {
    //   this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
    //   this.partialLoad = this.estimate['unitsTotal'] % 700;
    //   // this.estimate['partialLoad'] > 0;
    //   if (this.estimate['unitsTotal'] % 700 > 0) {
    //     this.partialLoadOption = true;
    //     this.estimate['partialLoad'] = 1;
    //   }
    // }
  }

  onItemGroupChange(product: Product[], product_group_id, product_group_name) {
    this.authService.fetchProductDetailForGroup(product_group_id)
      .subscribe(
        (list: Product[]) => {
          // console.log(list);
          this.products = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );

    //     "Quarry 100"
    // "CRUSHER / BUNKAR 101"
    // "DESIGNER TILES 102"
    // "HOLLOW BLOCK 103"
    // "PAVER 104"

    this.itemGroup = "";
    // this.itemGroup = "Aggregate";
    // console.log("inside onItemGroupChange");
    // console.log(product_group_name);
    // console.log(product_group_name);
    if (product_group_name == "100" || product_group_name == "101") {
      // console.log("inside Quarry Division");
      this.itemGroup = "Quarry";
      // this.items1 = product;
    }
    // if (product_group_name == "101") {
    //   // console.log("inside Quarry Division");
    //   this.itemGroup = "CRUSHER / BUNKAR";
    //   // this.items1 = product;
    // }
    if (product_group_name == "103") {
      this.itemGroup = "HOLLOW BLOCK";
      // console.log("inside HOLLOW BLOCK Division");
      // console.log(product);
      // console.log(this.estimate['unitsTotal']);
      // this.items1 = product;
    }

    if (product_group_name == "102" || product_group_name == "104") {
      this.itemGroup = "DESIGNER TILES";
      // console.log("inside PAVER Division");
      // console.log(product);
      // this.items1 = product;
      this.estimate['unit1'] = this.estimate['unit2'] = this.estimate['unit4'] = this.estimate['unit6'] = 0;
    }

    // if (product_group_name == "104") {
    //   this.itemGroup = "PAVER";
    //   // console.log("inside PAVER Division");
    //   // console.log(product);
    //   // this.items1 = product;
    // }
    // console.log(this.items1);
  }
  // estimateOrder(orders: Orders) {
  estimateOrder(estimateForm) {
    // console.log(estimateForm);
    console.log(this.estimate);
    this.doEstimation();
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
          // console.log(this.productGroupModel);
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
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
  isToggledTax: boolean = true;

  notifyTaxOption(event) {
    this.isToggledTax = !this.isToggledTax;
    // console.log("Event: "+ event.checked); 
    console.log("Toggled Tax: " + this.isToggledTax);
  }
  doEstimation() {
    this.showLoader();
    this.authService.sendEstimation(this.estimate)
      .subscribe(
        success => {
          // console.log(success);

          if (success.statusMessage == "AUTH_SUCCESS") {
            // this.token = true;
            // this.token_name = success.token;
            // localStorage.setItem('token', this.token_name);
            // localStorage.setItem('role', success.role);
            // // localStorage.setItem('companyName', success.companyName);
            // localStorage.setItem('companyId', success.companyId);
            // localStorage.setItem('isAuthenticated', 'true');
            // console.log('Company Id -' + success.companyId);
            // console.log('Role -' + success.role);
            // this.isAuthenticated = true;
            // this.navCtrl.setRoot(TabsPage);
            // this.loading.dismiss();
          }
          else {
            // this.token = false;
            // // this.isAuthenticated = false;
            // localStorage.setItem('isAuthenticated', 'false');
            // this.loading.dismiss();
            // this.invalidLogin.emit(true);
          }
        },
        (error) => {
          // this.loading.dismiss();
          // this.presentToast(error);
        });
  }
}