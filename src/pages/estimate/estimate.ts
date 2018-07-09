import { Pricing } from './../../models/pricing';
import { SubOrders } from './../../models/sub-orders';
import { AlertController, ToastController } from 'ionic-angular';
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
  pricing: Pricing[];
  // customerName: string;
  loading: any;
  itemGroup: string;
  // itemGroup: string = "Aggregate";
  productName: string;
  // items: product[] = [];
  items1: Product[] = [];
  distanceKM: string;
  unitsTotal: string;
  unit1: number;
  unit2: number;
  unit4: number;
  unit6: number;
  unit1Total: number = 0;
  unit2Total: number = 0;
  unit4Total: number = 0;
  unit6Total: number = 0;
  unitSumTotal: number = 0
  // estimate: Estimate[] = [];
  partialLoadOption: boolean = false;
  fullLoadOption: boolean = false;
  products: Product[] = [];
  selectedProduct: Product[] = [];
  productGroupModel: ProductGroup[] = [];
  sites: Site[] = [];
  references: Reference[] = [];
  partialLoad: number;
  uom: string = '';
  totalUnitsCountValidation: boolean = false;
  distanceReadOnly: boolean = false;
  showCostSummary: boolean = false;
  disableSiteName: boolean = true;
  disableItemName: boolean = true;
  // estimate: Pricing[]=[];
  estimate = {
    orderGroupNo: '',
    orderDate: '',
    status: '',
    remark: '',
    estimation: {
      customerID: '',
      // itemGroup: '',
      siteID: '',
      reference1: '',
      reference2: '',
      productGroup: '', //itemGroup
      productGroupName: '',
      product: '',
      distanceKM: '',
      unitsTotal: '',
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
      // unit1Total: 0,
      unit1ProductCost: 0,
      unit1Tax: 0,
      unit1LoadingCost: 0,
      unitlTransportCost: 0,
      unit1TotalCost: 0,
      unit2: 0,
      // unit2Total: 0,
      unit2ProductCost: 0,
      unit2Tax: 0,
      unit2LoadingCost: 0,
      unit2TransportCost: 0,
      unit2TotalCost: 0,
      unit4: 0,
      // unit4Total: 0,
      unit4ProductCost: 0,
      unit4Tax: 0,
      unit4LoadingCost: 0,
      unit4TransportCost: 0,
      unit4TotalCost: 0,
      unit6: 0,
      // unit6Total: 0,
      unit6ProductCost: 0,
      unit6Tax: 0,
      unit6LoadingCost: 0,
      unit6TransportCost: 0,
      unit6TotalCost: 0,
      // tiles: '',
      // tilesLoadingCost: 0,
      // tilesTransportCost: 0,
      // tilesSqFtCost: 0,
      // tilesTax: 0,
      // tilesTotalCost: 0,
      // pavers: '',
      // paversLayingCost: 0,
      // paversLoadingCost: 0,
      // paversTransportCost: 0,
      // paversSqFtCost: 0,
      // paversTax: 0,
      // paversTotalCost: 0,
      sqftLoadingCost: 0,
      sqftLayingCost: 0,
      sqftTransportCost: 0,
      sqftUnitCost: 0,

      totalLayingCost: 0,
      unit1KMCost: 0,
      unit2KMCost: 0,
      unit4KMCost: 0,
      unit6KMCost: 0,
      unitKMCostHB: 0,
      unitKMCostPavers: 0,
      unitKMCostTiles: 0,
      taxable: '',
      salesRep: '',
      transportPerKMCost: 0,
      // loadingCost: 0, //not required
      // taxAmount: 0, // not required
      totalProductCost: 0, //end of old model
      totalTax: 0,
      totalLoadingCost: 0,
      totalTransportCost: 0,
      totalCost: 0,
      customerName: '',
      siteName: '',
      salesRepName: '',
      referral1Name: '',
      referral2Name: '',
      orderPriority: ''//to be added when priority is added as a field in db
      // unit1TaxSum: 0,
      // unit1TotalCostSum: 0,
      // unit1LoadingCostSum: 0,
      // unitlTransportCostSum: 0,
    }
  }

  openNavDetailsPage(item, test) {
    this.navCtrl.push(EstimationDetailsPage, { item: item, test });
  }
  aggregateUnitsTotalNotExceedTotalQty() {
    // console.log(Number(this.estimate['estimation']['unit1'] * 1) + Number(this.estimate['estimation']['unit2'] * 2) + Number(this.estimate['estimation']['unit4'] * 4) + Number(this.estimate['estimation']['unit6'] * 6));
    if (Number(this.estimate['estimation']['unit1'] * 1) + Number(this.estimate['estimation']['unit2'] * 2) + Number(this.estimate['estimation']['unit4'] * 4) + Number(this.estimate['estimation']['unit6'] * 6) > Number(this.unitsTotal)) {
      // if (Number(this.estimate['estimation']['unit1'] + this.estimate['estimation']['unit2'] + this.estimate['estimation']['unit4'] + this.estimate['estimation']['unit6']) > this.unitsTotal) {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Your Total Units and Total Breakup Units count should match.',
        buttons: ['OK']
      });

      alert.present();
      this.totalUnitsCountValidation = false;
    }
    else
      this.totalUnitsCountValidation = true;

  }
  aggregateTotalUnitsCountMatch() {
    // console.log(Number(this.estimate['estimation']['unit1'] * 1) + Number(this.estimate['estimation']['unit2'] * 2) + Number(this.estimate['estimation']['unit4'] * 4) + Number(this.estimate['estimation']['unit6'] * 6));
    if (Number(this.estimate['estimation']['unit1'] * 1) + Number(this.estimate['estimation']['unit2'] * 2) + Number(this.estimate['estimation']['unit4'] * 4) + Number(this.estimate['estimation']['unit6'] * 6) != Number(this.unitsTotal)) {
      // if (Number(this.estimate['estimation']['unit1'] + this.estimate['estimation']['unit2'] + this.estimate['estimation']['unit4'] + this.estimate['estimation']['unit6']) > this.unitsTotal) {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Your Total Units and Total Breakup Units are not matching.',
        buttons: ['OK']
      });

      alert.present();
      this.totalUnitsCountValidation = false;
    }
    else
      this.totalUnitsCountValidation = true;

  }
  role: string;
  retrieveAllPriceCheckOrders() {
    this.authService.fetchOrdersNew("ORDER_PRICE_CHECK")
      .subscribe(
        (list: Pricing[]) => {
          this.pricing = list;
          // this.sites = list;
          console.log(this.pricing);
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // this.getGroupOrdersByStatus("APPROVED");
    // this.getGroupOrdersByStatus("ESTIMATION");
    this.retrieveAllPriceCheckOrders();
    // this.pricing = {
    //   "estimation": {
    //     "product": {
    //       "productDetails": [
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_ID": "3013",
    //           "product_DETAIL_NAME": "TILES OPEL BROWN"
    //         },
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_ID": "3014",
    //           "product_DETAIL_NAME": "TILES OPEL GREY"
    //         },
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_ID": "3015",
    //           "product_DETAIL_NAME": "TILES OPEL RED"
    //         },
    //         {
    //           "qty": "997",
    //           "product_ID": "1019",
    //           "product_DETAIL_ID": "3016",
    //           "product_DETAIL_NAME": "TILES OPEL YELLOW"
    //         }
    //       ],
    //       "product_ID": "1019",
    //       "product_CODE": "Tiles Opal Brown",
    //       "product_GROUP_ID": "1004",
    //       "product_NAME": "R.M OPEL Tiles",
    //       "company_ID": "2",
    //       "uom_ID": "1",
    //       "product_TAX1": "9.00",
    //       "product_TAX2": "9.00",
    //       "uom": "Units",
    //       "product_UNIT_CONV_ID": "10",
    //       "from_UNIT": "1000",
    //       "from_UNIT_TYPE": "Kgs",
    //       "to_UNIT": "2",
    //       "to_UNIT_TYPE": "Units",
    //       "product_COST_ID": "2019",
    //       "product_COST": "287",
    //       "loading_COST": "1"
    //     },
    //     "customerID": "1001",
    //     "siteID": "603",
    //     "reference1": "503",
    //     "reference2": "",
    //     "productGroupName": "HOLLOW_BLOCK",
    //     "productGroup": "HOLLOW_BLOCK",
    //     "distanceKM": "10",
    //     "unitsTotal": "1000",
    //     "fullLoads": "1",
    //     "fullLoadsCost": "0",
    //     "fullLoadsTax": "0",
    //     "fullLoadsTransportCost": "0",
    //     "fullLoadsTotalCost": "0",
    //     "partialLoad": "500",
    //     "partialLoadCost": "0",
    //     "partialLoadTax": "0",
    //     "partialLoadTransportCost": "0",
    //     "partialLoadTotalCost": "0",
    //     "unit1": "1",
    //     "unit1ProductCost": "0",
    //     "unit1Tax": "0",
    //     "unit1LoadingCost": "0",
    //     "unitlTransportCost": "25",
    //     "unit1TotalCost": "1855",
    //     "unit2": "2",
    //     "unit2ProductCost": "0",
    //     "unit2Tax": "0",
    //     "unit2LoadingCost": "0",
    //     "unit2TransportCost": "0",
    //     "unit2TotalCost": "0",
    //     "unit4": "4",
    //     "unit4ProductCost": "0",
    //     "unit4Tax": "0",
    //     "unit4LoadingCost": "0",
    //     "unit4TransportCost": "35",
    //     "unit4TotalCost": "7355",
    //     "unit6": "6",
    //     "unit6ProductCost": "0",
    //     "unit6Tax": "0",
    //     "unit6LoadingCost": "0",
    //     "unit6TransportCost": "0",
    //     "unit6TotalCost": "0",
    //     "unit1KMCost": "0",
    //     "unit2KMCost": "0",
    //     "unit4KMCost": "0",
    //     "unit6KMCost": "0",
    //     "unitKMCostHB": "0",
    //     "unitKMCostPavers": "0",
    //     "unitKMCostTiles": "0",
    //     "sqftLoadingCost": "1",
    //     "sqftLayingCost": "0",
    //     "sqftTransportCost": "0",
    //     "sqftUnitCost": "9",
    //     "totalLayingCost": "0",
    //     "taxable": "",
    //     "salesRep": "1010",
    //     "transportPerKMCost": "0",
    //     "totalProductCost": "0",
    //     "totalTax": "0",
    //     "totalLoadingCost": "0",
    //     "totalTransportCost": "0",
    //     "totalCost": "1110",
    //     "customerName": "ABC Inc",
    //     "siteName": "Tirupur 001",
    //     "salesRepName": "null",
    //     "referral1Name": "Arun",
    //     "referral2Name": "",
    //     "orderPriority": ""
    //   },
    //   "orderGroupNo": "1531073105465",
    //   "orderDate": "2018-07-08 00:00:00.0",
    //   "status": "",
    //   "remark": "remarks"
    // };
    // this.pricing = {
    //   "orderGroupNo": "2100",
    //   "orderDate": "2018-09-07",
    //   "status": "ORDERED",
    //   "remark": "Remrk",
    //   "estimation": {
    //     "customerID": "1001",
    //     "siteID": "603",
    //     "reference1": "503",
    //     "reference2": "",
    //     "productGroup": "HOLLOW_BLOCK",
    //     "productGroupName": "HOLLOW_BLOCK",
    //     "product": {
    //       "productDetails": [
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_NAME": "TILES OPEL BROWN",
    //           "product_DETAIL_ID": "3013"
    //         },
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_NAME": "TILES OPEL GREY",
    //           "product_DETAIL_ID": "3014"
    //         },
    //         {
    //           "qty": "1",
    //           "product_ID": "1019",
    //           "product_DETAIL_NAME": "TILES OPEL RED",
    //           "product_DETAIL_ID": "3015"
    //         },
    //         {
    //           "qty": "997",
    //           "product_ID": "1019",
    //           "product_DETAIL_NAME": "TILES OPEL YELLOW",
    //           "product_DETAIL_ID": "3016"
    //         }
    //       ],
    //       "product_ID": "1019",
    //       "product_COST": "28.00",
    //       "product_TAX1": "9.00",
    //       "product_TAX2": "9.00",
    //       "loading_COST": "1",
    //       "uom_ID": "1",
    //       "product_NAME": "R.M OPEL Tiles",
    //       "uom": "Units",
    //       "product_CODE": "Tiles Opal Brown",
    //       "company_ID": "2",
    //       "product_GROUP_ID": "1004",
    //       "to_UNIT_TYPE": "Units",
    //       "product_COST_ID": "2019",
    //       "product_UNIT_CONV_ID": "10",
    //       "from_UNIT": "1000",
    //       "from_UNIT_TYPE": "Kgs",
    //       "to_UNIT": "2",
    //     },
    //     "distanceKM": "10",
    //     "unitsTotal": "1000",
    //     "fullLoads": "1",
    //     "fullLoadsCost": "0",
    //     "fullLoadsTax": "0",
    //     "fullLoadsTransportCost": "0",
    //     "fullLoadsTotalCost": "0",
    //     "partialLoad": "500",
    //     "partialLoadCost": "0",
    //     "partialLoadTax": "0",
    //     "partialLoadTransportCost": "0",
    //     "partialLoadTotalCost": "0",
    //     "unit1": "1",
    //     "unit1ProductCost": "0",
    //     "unit1Tax": "0",
    //     "unit1LoadingCost": "0",
    //     "unitlTransportCost": "25",
    //     "unit1TotalCost": "1855",
    //     "unit2": "2",
    //     "unit2ProductCost": "0",
    //     "unit2Tax": "0",
    //     "unit2LoadingCost": "0",
    //     "unit2TransportCost": "0",
    //     "unit2TotalCost": "0",
    //     "unit4": "4",
    //     "unit4ProductCost": "0",
    //     "unit4Tax": "0",
    //     "unit4LoadingCost": "0",
    //     "unit4TransportCost": "35",
    //     "unit4TotalCost": "7355",
    //     "unit6": "6",
    //     "unit6ProductCost": "0",
    //     "unit6Tax": "0",
    //     "unit6LoadingCost": "0",
    //     "unit6TransportCost": "0",
    //     "unit6TotalCost": "0",
    //     "sqftLoadingCost": "1",
    //     "sqftLayingCost": "0",
    //     "sqftTransportCost": "0",
    //     "sqftUnitCost": "9",
    //     "totalLayingCost": "0",
    //     "unit1KMCost": "0",
    //     "unit2KMCost": "0",
    //     "unit4KMCost": "0",
    //     "unit6KMCost": "0",
    //     "unitKMCostHB": "0",
    //     "unitKMCostPavers": "0",
    //     "unitKMCostTiles": "0",
    //     "taxable": "",
    //     "salesRep": "1010",
    //     "transportPerKMCost": "0",
    //     "totalProductCost": "0",
    //     "totalTax": "0",
    //     "totalLoadingCost": "0",
    //     "totalTransportCost": "0",
    //     "totalCost": "1110",
    //     "customerName": "ABC Inc",
    //     "siteName": "Tirupur 001",
    //     "salesRepName": "null",
    //     "referral1Name": "Arun",
    //     "referral2Name": "",
    //     "orderPriority": ""
    //   }
    // };
    //   this.pricing = [      {
    //     "subOrders": "",
    //     "tax2": "2.50",
    //     "order_CREATED_DT": "2018-06-30 00:00:00.0",
    //     "order_MODIFIED_DT": "2018-06-30 00:00:00.0",
    //     "order_GROUP_NO": "201806300721575686",
    //     "order_DT": "2018-06-30",
    //     "note": "null",
    //     "cust_ID": "1000",
    //     "tax1": "2.50",
    //     "site_ID": "601",
    //     "sales_REP_ID": "1001",
    //     "refrerel1_ID": "500",
    //     "referrel2_ID": "501",
    //     "product_GROUP": "QUARRY",
    //     "delivery_DISTANCE": "25.00",
    //     "total_ORDER_UNIT": "10.00",
    //     "taxable_STATUS": "",
    //     "product_UNIT_COST": "4500.00",
    //     "loading_UNIT_COST": "150.00",
    //     "transport_KM_COST": "0.00",
    //     "laying_COST": "0.00",
    //     "sqft_LOADING_COST": "0.00",
    //     "sqft_LAYING_COST": "0.00",
    //     "sqft_TRANSPORT_COST": "0.00",
    //     "sqft_UNIT_COST": "0.00",
    //     "total_PRODUCT_COST": "45000.00",
    //     "total_TAX1": "2250.00",
    //     "total_TAX2": "2250.00",
    //     "total_LOADING_COST": "1500.00",
    //     "total_TRANSPORT_COST": "2500.00",
    //     "total_LAYING_COST": "0.00",
    //     "total_COST": "51250.00",
    //     "order_STATUS": "ESTIMATED",
    //     "status_FLAG": "ACTIVE",
    //     "order_CREATED_BY": "1001",
    //     "customer_NAME": "VV Traders",
    //     "site_NAME": "ED-001",
    //     "sales_REP_NAME": "null",
    //     "refrerel1_NAME": "Selva",
    //     "refrerel2_NAME": "Raj",
    //     "product_ID": "1014",
    //     "uom_ID": "1",
    //     "product_NAME": "AGGREGATES [ M SAND - P ]",
    //     "uom": "Units",
    //     "order_PRIORITY": "1",
    //     "full_LOAD": "3",
    //     "part_LOAD": "300",
    //     "orderAggregateUnits": [
    //       {
    //         "order_GROUP_NO": "201806301525244816",
    //         "unit_TYPE": "1",
    //         "quantity": "10"
    //       },
    //       {
    //         "order_GROUP_NO": "201806301525244816",
    //         "unit_TYPE": "2",
    //         "quantity": "5"
    //       },
    //       {
    //         "order_GROUP_NO": "201806301525244816",
    //         "unit_TYPE": "4",
    //         "quantity": "1"
    //       }
    //     ],
    //   },
    // ];

    // console.log(this.pricing);
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad EstimatePage');
  }
  clearAllData() {
    this.disableSiteName = true;
    this.disableItemName = true;
    this.totalSqFtCount = 0;
    this.estimate['estimation']['product'] = '';
    // this.clearHBCosts();
    // estimateForm.distanceKM.value = 0;
    this.estimate['estimation']['distanceKM'] = '';
    this.distanceReadOnly = false;
    this.estimate['estimation']['unitsTotal'] = '';
    this.estimate['estimation']['transportPerKMCost'] = 0;
    this.estimate['estimation']['totalProductCost'] = 0;
    this.estimate['estimation']['totalTax'] = 0;
    this.estimate['estimation']['totalLoadingCost'] = 0;
    this.estimate['estimation']['totalTransportCost'] = 0;
    this.estimate['estimation']['totalCost'] = 0;
    this.productPricePerUnit = 0;
    this.loadingCostPerUnit = 0;
    // this.estimate['estimation']['product']['product_COST'] = 0;
    // this.estimate['estimation']['product']['loading_COST'] = 0;
    this.clearProductCosts();
    this.clearDropdown();
    this.selectedProduct = [];
    this.itemGroup = '';
    this.estimate['estimation']['partialLoad'] = 0;
    this.estimate['estimation']['fullLoads'] = 0;
    this.showCostSummary = false
  }

  clearDropdown() {
    this.estimate['estimation']['customerID'] = '';
    this.estimate['estimation']['siteID'] = '';
    this.estimate['estimation']['reference1'] = '';
    this.estimate['estimation']['reference2'] = '';
    this.estimate['estimation']['productGroupName'] = '';
    this.estimate['estimation']['product'] = '';
  }

  clearProductCosts() {
    // this.estimate['estimation']['unitsTotal'] = 0;
    this.estimate['estimation']['unit1'] = 0;
    this.unit1Total = 0;
    this.estimate['estimation']['unit2'] = 0;
    this.unit2Total = 0;
    this.estimate['estimation']['unit4'] = 0;
    this.unit4Total = 0;
    this.estimate['estimation']['unit6'] = 0;
    this.unit6Total = 0;
    this.estimate['estimation']['totalProductCost'] = 0;
    this.estimate['estimation']['totalTax'] = 0;
    this.estimate['estimation']['totalLoadingCost'] = 0;
    this.estimate['estimation']['totalTransportCost'] = 0;
    this.estimate['estimation']['totalCost'] = 0;
    this.unitSumTotal = 0;
    // this.estimate['estimation']['product']['product_COST'] = '';
    // this.estimate['estimation']['product']['loading_COST'] = '';
  }
  clearHBCosts() {
    this.estimate['estimation']['fullLoadsCost'] = 0;
    this.estimate['estimation']['fullLoadsTax'] = 0;
    this.estimate['estimation']['fullLoadsTransportCost'] = 0;
    this.estimate['estimation']['fullLoadsTotalCost'] = 0;
    this.fullLoadsCostSum = 0;
    this.fullLoadsTaxSum = 0;
    this.fullLoadsTransportCostSum = 0;
    this.fullLoadsTotalCostSum = 0;
    this.estimate['estimation']['partialLoadCost'] = 0;
    this.estimate['estimation']['partialLoadTax'] = 0;
    this.estimate['estimation']['partialLoadTransportCost'] = 0;
    this.estimate['estimation']['partialLoadTotalCost'] = 0;
  }
  onItemNameChange(product: Product[], uom) {
    // //console.log("customer");
    // //console.log(product);
    this.estimate['estimation']['unitsTotal'] = '';
    this.totalSqFtCount = 0;
    this.productPricePerUnit = 0;
    this.loadingCostPerUnit = 0;
    this.clearProductCosts();
    this.selectedProduct = product;
    this.uom = uom;
    this.showCostSummary = true;
    //console.log(this.selectedProduct);
    // console.log(this.estimate);
    // this.uom = this.estimate['estimation']['product']['uom'];
  }
  getGroupOrdersByStatus(status) {
    this.authService.fetchOrderByStatus(status)
      .subscribe(
        (list: Site[]) => {
          // console.log(list);
          this.sites = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  onSelectCustomer(customer_id, customer_name) {
    this.estimate['estimation']['customerName'] = customer_name;
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
    this.authService.fetchReferenceDetails()
      .subscribe(
        (list: Reference[]) => {
          // //console.log(list);
          this.references = list;
          this.loading.dismiss();
          this.disableSiteName = false;
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  onSelectSite(site_name) {
    this.estimate['estimation']['siteName'] = site_name;
  }
  onSelectReference1(reference_name) {
    this.estimate['estimation']['referral1Name'] = reference_name;
  }
  onSelectReference2(reference_name) {
    this.estimate['estimation']['referral2Name'] = reference_name;
  }
  productPricePerUnit: number = 0;
  loadingCostPerUnit: number = 0;
  transportPerKMCost: number = 0;
  tax1: number = 0;
  tax2: number = 0;
  taxCost1: number;
  taxCost2: number;
  totalProductCost: number;
  totalCost: number;
  totalTax: number;
  totalLoadingCost: number;
  transportPerKMCostUnit1: number = 0;
  transportPerKMCostUnit2: number = 0;
  transportPerKMCostUnit4: number = 0;
  transportPerKMCostUnit6: number = 0;
  transportPerKMCostHB: number = 0;
  transportPerKMCostPavers: number = 0;
  transportPerKMCostTiles: number = 0;
  paversLayingCost: number = 0;
  transportCostPerSqFt: number = 0;
  productCostPerSqFt: number = 0;

  fullLoadsCostSum: number;
  fullLoadsTaxSum: number;
  fullLoadsTransportCostSum: number;
  fullLoadsTotalCostSum: number;

  unit1CostSum: number = 0;
  unit1TaxSum: number = 0;
  unit1LoadingCostSum: number = 0;
  unitlTransportCostSum: number = 0;
  unit1TotalCostSum: number = 0;
  unit2CostSum: number = 0;
  unit2TaxSum: number = 0;
  unit2LoadingCostSum: number = 0;
  unit2TransportCostSum: number = 0;
  unit2TotalCostSum: number = 0;

  unit4CostSum: number = 0;
  unit4TaxSum: number = 0;
  unit4LoadingCostSum: number = 0;
  unit4TransportCostSum: number = 0;
  unit4TotalCostSum: number = 0;

  unit6CostSum: number = 0;
  unit6TaxSum: number = 0;
  unit6LoadingCostSum: number = 0;
  unit6TransportCostSum: number = 0;
  unit6TotalCostSum: number = 0;

  showTransportCost: boolean = true;
  showLoadingCost: boolean = true;

  calculatedTransportCost: number = 0;
  calculatedSqFtUnitCost: number = 0;
  totalCounter: number = 0;
  totalSqFtCount: number = 0;

  calculateTotals(item: number) {
    this.totalSqFtCount = 0;
    for (var i = 0; i < this.selectedProduct.length; i++) {
      this.totalSqFtCount = Number(this.totalSqFtCount) + Number(this.selectedProduct[i]['qty']);
    }
    if (Number(this.totalSqFtCount) > Number(this.estimate['estimation']['unitsTotal'])) {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Your Total Units and Individual Color counts are not matching.',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  onChangeUnit1(units) {
    this.getCommonCosts();
    this.aggregateUnitsTotalNotExceedTotalQty();
    if (!this.totalUnitsCountValidation) {
      // this.productPricePerUnit = 0;
      this.estimate['estimation']['unit1'] = 0;
    }// if ((this.estimate['estimation']['unit1'] + this.estimate['estimation']['unit2'] + this.estimate['estimation']['unit4'] + this.estimate['estimation']['unit6']) > this.unitsTotal) {
    // }
    // this.estimate['estimation']['unit1Total'] = this.estimate['estimation']['unit1'] * 1;
    this.unit1Total = this.estimate['estimation']['unit1'] * 1;
    this.unitSumTotal = this.unit1Total + this.unit2Total + this.unit4Total + this.unit6Total;
    // console.log(this.unitSumTotal);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit1);

    this.estimate['estimation']['unit1ProductCost'] = this.productPricePerUnit * 1;
    //console.log(this.estimate['estimation']['unit1ProductCost']);
    // this.estimate['estimation']['unit1Tax'] = this.estimate['estimation']['unit1ProductCost'] * ((this.tax1) / 100);
    // NEW for tax
    // this.estimate['estimation']['unit1Tax'] = this.estimate['estimation']['unit1ProductCost'] * ((this.tax1 + this.tax2) / 100);
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['unit1Tax'] = this.estimate['estimation']['unit1ProductCost'] * ((this.tax1 + this.tax2) / 100)) :
      (this.estimate['estimation']['unit1Tax'] = 0);

    //console.log(this.estimate['estimation']['unit1Tax']);
    this.estimate['estimation']['unit1LoadingCost'] = this.loadingCostPerUnit * 1;
    //console.log(this.estimate['estimation']['unit1LoadingCost']);
    this.estimate['estimation']['unitlTransportCost'] = this.transportPerKMCostUnit1 * Number(this.distanceKM);
    //console.log(this.estimate['estimation']['unitlTransportCost']);
    this.estimate['estimation']['unit1TotalCost'] = this.estimate['estimation']['unit1ProductCost'] + this.estimate['estimation']['unit1Tax'] +
      this.estimate['estimation']['unit1LoadingCost'] + this.estimate['estimation']['unitlTransportCost'];
    //console.log(this.estimate['estimation']['unit1TotalCost']);

    this.unit1CostSum = this.estimate['estimation']['unit1ProductCost'] * units;
    //console.log(this.unit1CostSum);
    // NEW for tax
    // this.unit1TaxSum = this.estimate['estimation']['unit1Tax'] * this.estimate['estimation']['unit1'];
    (this.isToggledTax == true) ?
      (this.unit1TaxSum = this.estimate['estimation']['unit1Tax'] * this.estimate['estimation']['unit1']) :
      (this.unit1TaxSum = 0);

    //console.log(this.unit1TaxSum);
    this.unit1LoadingCostSum = this.estimate['estimation']['unit1LoadingCost'] * this.estimate['estimation']['unit1'];
    //console.log(this.unit1LoadingCostSum);
    this.unitlTransportCostSum = this.estimate['estimation']['unitlTransportCost'] * this.estimate['estimation']['unit1'];
    //console.log(this.unitlTransportCostSum);
    this.unit1TotalCostSum = this.estimate['estimation']['unit1TotalCost'] * this.estimate['estimation']['unit1'];
    //console.log(this.unit1TotalCostSum);

    this.calculateAggregateTotal();

    // this.estimate['estimation']['totalProductCost'] = this.unit1CostSum + this.unit2CostSum + this.unit4CostSum + this.unit6CostSum;
    // this.estimate['estimation']['totalTax'] = this.unit1TaxSum + this.unit2TaxSum + this.unit2TaxSum + this.unit2TaxSum;
    // this.estimate['estimation']['totalLoadingCost'] = this.unit1LoadingCostSum + this.unit2LoadingCostSum + this.unit4LoadingCostSum + this.unit6LoadingCostSum;
    // this.estimate['estimation']['totalTransportCost'] = this.unitlTransportCostSum + this.unit2TransportCostSum + this.unit4TransportCostSum + this.unit6TransportCostSum;
    // this.estimate['estimation']['totalCost'] = this.unit1TotalCostSum + this.unit2TotalCostSum + this.unit4TotalCostSum + this.unit6TotalCostSum;
    // this.estimate['estimation']['totalSum'] = this.estimate['estimation']['totalCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost'];



    // this.estimate['estimation']['totalTax'] =
    //   this.estimate['estimation']['unit1TaxSum'] + this.estimate['estimation']['unit2TaxSum'] + this.estimate['estimation']['unit4TaxSum'] + this.estimate['estimation']['unit6TaxSumunit6Tax'];
    // this.estimate['estimation']['totalLoadingCost'] =
    //   this.estimate['estimation']['unit1LoadingCostSum'] + this.estimate['estimation']['unit2LoadingCostSum'] + this.estimate['estimation']['unit4LoadingCostSum'] + this.estimate['estimation']['unit6LoadingCostSum'];
    // this.estimate['estimation']['totalTransportCost'] =
    //   this.estimate['estimation']['unitlTransportCostSum'] + this.estimate['estimation']['unit2TransportCostSum'] + this.estimate['estimation']['unit4TransportCostSum'] + this.estimate['estimation']['unit6TransportCostSum'];
    // this.estimate['estimation']['totalSum'] = this.estimate['estimation']['totalCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalLoadingCost'] + this.estimate['estimation']['totalTransportCost'];

  }
  onChangeUnit2(units) {
    this.getCommonCosts();
    this.aggregateUnitsTotalNotExceedTotalQty();
    if (!this.totalUnitsCountValidation) {
      // this.productPricePerUnit = 0;
      this.estimate['estimation']['unit2'] = 0;
    }
    this.unit2Total = this.estimate['estimation']['unit2'] * 2;
    this.unitSumTotal = this.unit1Total + this.unit2Total + this.unit4Total + this.unit6Total;
    // console.log(this.unitSumTotal);

    // this.estimate['estimation']['unit2Total'] = this.estimate['estimation']['unit2'] * 2;
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit2);

    this.estimate['estimation']['unit2ProductCost'] = this.productPricePerUnit * 2;
    //console.log(this.estimate['estimation']['unit2ProductCost']);
    // this.estimate['estimation']['unit2Tax'] = this.estimate['estimation']['unit2ProductCost'] * ((this.tax1) / 100);
    // ?NEW for tax
    // this.estimate['estimation']['unit2Tax'] = this.estimate['estimation']['unit2ProductCost'] * ((this.tax1 + this.tax2) / 100);
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['unit2Tax'] = this.estimate['estimation']['unit2ProductCost'] * ((this.tax1 + this.tax2) / 100)) :
      (this.estimate['estimation']['unit2Tax'] = 0);

    //console.log("unit2Tax" + this.estimate['estimation']['unit2Tax']);
    this.estimate['estimation']['unit2LoadingCost'] = this.loadingCostPerUnit * 2;
    //console.log(this.estimate['estimation']['unit2LoadingCost']);
    this.estimate['estimation']['unit2TransportCost'] = this.transportPerKMCostUnit2 * Number(this.distanceKM);
    //console.log(this.estimate['estimation']['unit2TransportCost']);
    this.estimate['estimation']['unit2TotalCost'] = this.estimate['estimation']['unit2ProductCost'] + this.estimate['estimation']['unit2Tax'] +
      this.estimate['estimation']['unit2LoadingCost'] + this.estimate['estimation']['unit2TransportCost'];
    //console.log(this.estimate['estimation']['unit2TotalCost']);

    this.unit2CostSum = this.estimate['estimation']['unit2ProductCost'] * units;
    //console.log(this.unit2CostSum);
    // NEW for tax
    // this.unit2TaxSum = this.estimate['estimation']['unit2Tax'] * this.estimate['estimation']['unit2'];

    (this.isToggledTax == true) ?
      (this.unit2TaxSum = this.estimate['estimation']['unit2Tax'] * this.estimate['estimation']['unit2']) :
      (this.unit2TaxSum = 0);
    //console.log(this.unit2TaxSum);
    this.unit2LoadingCostSum = this.estimate['estimation']['unit2LoadingCost'] * this.estimate['estimation']['unit2'];
    //console.log(this.unit2LoadingCostSum);
    this.unit2TransportCostSum = this.estimate['estimation']['unit2TransportCost'] * this.estimate['estimation']['unit2'];
    //console.log(this.unitlTransportCostSum);
    this.unit2TotalCostSum = this.estimate['estimation']['unit2TotalCost'] * this.estimate['estimation']['unit2'];
    //console.log(this.unit2TotalCostSum);
    this.calculateAggregateTotal();
  }
  onChangeUnit4(units) {
    this.getCommonCosts();
    this.aggregateUnitsTotalNotExceedTotalQty();
    if (!this.totalUnitsCountValidation) {
      // this.productPricePerUnit = 0;
      this.estimate['estimation']['unit4'] = 0;
    }

    this.unit4Total = this.estimate['estimation']['unit4'] * 4;
    this.unitSumTotal = this.unit1Total + this.unit2Total + this.unit4Total + this.unit6Total;

    // this.estimate['estimation']['unit4Total'] = this.estimate['estimation']['unit4'] * 4;
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit4);

    this.estimate['estimation']['unit4ProductCost'] = this.productPricePerUnit * 4;
    //console.log(this.estimate['estimation']['unit4ProductCost']);
    // this.estimate['estimation']['unit4Tax'] = this.estimate['estimation']['unit4ProductCost'] * ((this.tax1) / 100);
    // NEW for tax
    // this.estimate['estimation']['unit4Tax'] = this.estimate['estimation']['unit4ProductCost'] * ((this.tax1 + this.tax2) / 100);
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['unit4Tax'] = this.estimate['estimation']['unit4ProductCost'] * ((this.tax1 + this.tax2) / 100)) :
      (this.estimate['estimation']['unit4Tax'] = 0);

    //console.log("unit4Tax" + this.estimate['estimation']['unit4Tax']);
    this.estimate['estimation']['unit4LoadingCost'] = this.loadingCostPerUnit * 4;
    //console.log(this.estimate['estimation']['unit4LoadingCost']);
    this.estimate['estimation']['unit4TransportCost'] = this.transportPerKMCostUnit4 * Number(this.distanceKM);
    //console.log(this.estimate['estimation']['unit4TransportCost']);
    this.estimate['estimation']['unit4TotalCost'] = this.estimate['estimation']['unit4ProductCost'] + this.estimate['estimation']['unit4Tax'] +
      this.estimate['estimation']['unit4LoadingCost'] + this.estimate['estimation']['unit4TransportCost'];
    //console.log(this.estimate['estimation']['unit4TotalCost']);

    this.unit4CostSum = this.estimate['estimation']['unit4ProductCost'] * units;
    //console.log(this.unit4CostSum);
    // NEW for tax
    // this.unit4TaxSum = this.estimate['estimation']['unit4Tax'] * this.estimate['estimation']['unit4'];
    (this.isToggledTax == true) ?
      (this.unit4TaxSum = this.estimate['estimation']['unit4Tax'] * this.estimate['estimation']['unit4']) :
      (this.unit4TaxSum = 0);
    //console.log(this.unit4TaxSum);
    this.unit4LoadingCostSum = this.estimate['estimation']['unit4LoadingCost'] * this.estimate['estimation']['unit4'];
    //console.log(this.unit4LoadingCostSum);
    this.unit4TransportCostSum = this.estimate['estimation']['unit4TransportCost'] * this.estimate['estimation']['unit4'];
    //console.log(this.unit4TransportCostSum);
    this.unit4TotalCostSum = this.estimate['estimation']['unit4TotalCost'] * this.estimate['estimation']['unit4'];
    //console.log(this.unit4TotalCostSum);
    this.calculateAggregateTotal();
  }
  onChangeUnit6(units) {
    // this.getCommonCosts();
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit6);
    this.getCommonCosts();
    this.aggregateUnitsTotalNotExceedTotalQty();
    if (!this.totalUnitsCountValidation) {
      // this.productPricePerUnit = 0;
      this.estimate['estimation']['unit6'] = 0;
    }
    this.unit6Total = this.estimate['estimation']['unit6'] * 6;
    this.unitSumTotal = this.unit1Total + this.unit2Total + this.unit4Total + this.unit6Total;
    console.log(this.unitSumTotal);
    // this.estimate['estimation']['unit6Total'] = this.estimate['estimation']['unit6'] * 6;
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit6);

    this.estimate['estimation']['unit6ProductCost'] = this.productPricePerUnit * 6;
    //console.log(this.estimate['estimation']['unit6ProductCost']);
    // this.estimate['estimation']['unit6Tax'] = this.estimate['estimation']['unit6ProductCost'] * ((this.tax1) / 100);
    // NEW for tax
    // this.estimate['estimation']['unit6Tax'] = this.estimate['estimation']['unit6ProductCost'] * ((this.tax1 + this.tax2) / 100);
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['unit6Tax'] = this.estimate['estimation']['unit6ProductCost'] * ((this.tax1 + this.tax2) / 100)) :
      (this.estimate['estimation']['unit6Tax'] = 0);

    //console.log("unit6Tax" + this.estimate['estimation']['unit6Tax']);
    this.estimate['estimation']['unit6LoadingCost'] = this.loadingCostPerUnit * 6;
    //console.log(this.estimate['estimation']['unit6LoadingCost']);
    this.estimate['estimation']['unit6TransportCost'] = this.transportPerKMCostUnit6 * Number(this.distanceKM);
    //console.log(this.estimate['estimation']['unit6TransportCost']);
    this.estimate['estimation']['unit6TotalCost'] = this.estimate['estimation']['unit6ProductCost'] + this.estimate['estimation']['unit6Tax'] +
      this.estimate['estimation']['unit6LoadingCost'] + this.estimate['estimation']['unit6TransportCost'];
    //console.log(this.estimate['estimation']['unit6TotalCost']);

    this.unit6CostSum = this.estimate['estimation']['unit6ProductCost'] * units;
    //console.log(this.unit6CostSum);
    // NEW for tax
    // this.unit6TaxSum = this.estimate['estimation']['unit6Tax'] * this.estimate['estimation']['unit6'];
    (this.isToggledTax == true) ?
      (this.unit6TaxSum = this.estimate['estimation']['unit6Tax'] * this.estimate['estimation']['unit6']) :
      (this.unit6TaxSum = 0);

    //console.log(this.unit6TaxSum);
    this.unit6LoadingCostSum = this.estimate['estimation']['unit6LoadingCost'] * this.estimate['estimation']['unit6'];
    //console.log(this.unit6LoadingCostSum);
    this.unit6TransportCostSum = this.estimate['estimation']['unit6TransportCost'] * this.estimate['estimation']['unit6'];
    //console.log(this.unitlTransportCostSum);
    this.unit6TotalCostSum = this.estimate['estimation']['unit6TotalCost'] * this.estimate['estimation']['unit6'];
    //console.log(this.unit6TotalCostSum);
    this.calculateAggregateTotal();
  }
  calculateAggregateTotal() {
    this.estimate['estimation']['totalProductCost'] = this.unit1CostSum + this.unit2CostSum + this.unit4CostSum + this.unit6CostSum;
    this.estimate['estimation']['totalTax'] = this.unit1TaxSum + this.unit2TaxSum + this.unit4TaxSum + this.unit6TaxSum;
    this.estimate['estimation']['totalLoadingCost'] = this.unit1LoadingCostSum + this.unit2LoadingCostSum + this.unit4LoadingCostSum + this.unit6LoadingCostSum;
    this.estimate['estimation']['totalTransportCost'] = this.unitlTransportCostSum + this.unit2TransportCostSum + this.unit4TransportCostSum + this.unit6TransportCostSum;
    this.estimate['estimation']['totalCost'] = this.unit1TotalCostSum + this.unit2TotalCostSum + this.unit4TotalCostSum + this.unit6TotalCostSum;
  }

  getCommonCosts() {
    this.productPricePerUnit = Number(this.estimate['estimation']['product']['product_COST']);

    this.loadingCostPerUnit = Number(this.estimate['estimation']['product']['loading_COST']);
    this.tax1 = Number(this.estimate['estimation']['product']['product_TAX1']);
    this.tax2 = Number(this.estimate['estimation']['product']['product_TAX2']);
    this.distanceKM = this.estimate['estimation']['distanceKM'];
    this.unitsTotal = this.estimate['estimation']['unitsTotal'];

    this.transportPerKMCostUnit1 = 25;
    this.transportPerKMCostUnit2 = 30;
    this.transportPerKMCostUnit4 = 35;
    this.transportPerKMCostUnit6 = 50;
  }
  onChangeTotalUnits(units) {
    this.distanceReadOnly = true;
    // this.clearProductCosts();
    //console.log(this.estimate);
    // Identify the Partial Load display and value
    //console.log(this.productPricePerUnit = this.estimate['estimation']['product']['product_COST']);
    //console.log(this.loadingCostPerUnit = this.estimate['estimation']['product']['loading_COST']);
    // this.tax1 = this.estimate['estimation']['product']['product_TAX1'];
    // this.tax2 = this.estimate['estimation']['product']['product_TAX2'];
    //console.log(this.distanceKM = this.estimate['estimation']['distanceKM']);
    //console.log(this.unitsTotal = this.estimate['estimation']['unitsTotal']);
    switch (this.itemGroup) {
      case "QUARRY": {
        this.showTransportCost = true;
        this.showLoadingCost = true;

        // //console.log(this.transportPerKMCostUnit1 = 25);
        // //console.log(this.transportPerKMCostUnit2 = 30);
        // //console.log(this.transportPerKMCostUnit4 = 35);
        // //console.log(this.transportPerKMCostUnit6 = 50);
        // //console.log(this.estimate['estimation']['unit1']);
        // //console.log(this.estimate['estimation']['unit2']);
        // //console.log(this.estimate['estimation']['unit4']);
        // //console.log(this.estimate['estimation']['unit6']);

        // this.estimate['estimation'][''];
        // this.estimate['estimation']['unit1ProductCost'] = this.productPricePerUnit * 1;
        // this.estimate['estimation']['unit1Tax'] = this.estimate['estimation']['unit1ProductCost'] * ((this.tax1 + this.tax2) / 100);
        // this.estimate['estimation']['unit1LoadingCost'] = this.loadingCostPerUnit * 1;
        // this.estimate['estimation']['unitlTransportCost'] = this.transportPerKMCostUnit1 * this.distanceKM;
        // this.estimate['estimation']['unit1TotalCost'] = this.estimate['estimation']['unit1ProductCost'] + this.estimate['estimation']['unit1Tax'] +
        //   this.estimate['estimation']['unit1LoadingCost'] + this.estimate['estimation']['unitlTransportCost'];
        // this.estimate['estimation']['unit1TotalCostSum'] = this.estimate['estimation']['unit1TotalCost'] * this.estimate['estimation']['unit1'];
        // this.estimate['estimation']['unit1TaxSum'] = this.estimate['estimation']['unit1Tax'] * this.estimate['estimation']['unit1'];
        // this.estimate['estimation']['unit1LoadingCostSum'] = this.estimate['estimation']['unit1LoadingCost'] * this.estimate['estimation']['unit1'];
        // this.estimate['estimation']['unitlTransportCostSum'] = this.estimate['estimation']['unitlTransportCost'] * this.estimate['estimation']['unit1'];


        // this.estimate['estimation']['totalProductCost'] =
        //   this.estimate['estimation']['unit1TotalCostSum'] + this.estimate['estimation']['unit2TotalCostSum'] + this.estimate['estimation']['unit4TotalCostSum'] + this.estimate['estimation']['unit6TotalCostSum'];
        // this.estimate['estimation']['totalTax'] =
        //   this.estimate['estimation']['unit1TaxSum'] + this.estimate['estimation']['unit2TaxSum'] + this.estimate['estimation']['unit4TaxSum'] + this.estimate['estimation']['unit6TaxSumunit6Tax'];
        // this.estimate['estimation']['totalLoadingCost'] =
        //   this.estimate['estimation']['unit1LoadingCostSum'] + this.estimate['estimation']['unit2LoadingCostSum'] + this.estimate['estimation']['unit4LoadingCostSum'] + this.estimate['estimation']['unit6LoadingCostSum'];
        // this.estimate['estimation']['totalTransportCost'] =
        //   this.estimate['estimation']['unitlTransportCostSum'] + this.estimate['estimation']['unit2TransportCostSum'] + this.estimate['estimation']['unit4TransportCostSum'] + this.estimate['estimation']['unit6TransportCostSum'];
        // this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalLoadingCost'] + this.estimate['estimation']['totalTransportCost'];
        break;
      }
      case "DESIGNER_TILES": {
        this.getCommonCosts();
        // this.clearProductCosts();
        this.calculateTilesCost();
        // NEW for tax
        this.calculateTotalTilesCost();
        // this.estimate['estimation']['totalProductCost'] = this.estimate['estimation']['sqftUnitCost'] * Number(this.unitsTotal);
        // // console.log(this.estimate['estimation']['totalProductCost']);
        // this.estimate['estimation']['totalTax'] = this.estimate['estimation']['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
        // // console.log(this.estimate['estimation']['totalTax']);
        // // Transport and loading cost has been calculated and included in SQFT Cost
        // this.estimate['estimation']['totalTransportCost'] = 0;
        // this.estimate['estimation']['totalLoadingCost'] = 0;
        // // this.estimate['estimation']['totalTransportCost'] = this.estimate['estimation']['sqftTransportCost'] * this.distanceKM;
        // // this.estimate['estimation']['totalLoadingCost'] = this.estimate['estimation']['sqftLoadingCost'] * this.unitsTotal;
        // this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost'] + this.estimate['estimation']['totalLoadingCost'];
        // // console.log(this.estimate['estimation']['totalCost']);
        // //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        // //console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));
        break;
      }
      case "PAVER": {
        this.getCommonCosts();
        // this.clearProductCosts();
        this.calculatePaverCost();
        // NEW for tax
        this.calculateTotalPaverCost();
        // this.estimate['estimation']['totalProductCost'] = this.estimate['estimation']['sqftUnitCost'] * Number(this.unitsTotal);
        // //console.log(this.estimate['estimation']['totalProductCost']);
        // this.estimate['estimation']['totalTax'] = this.estimate['estimation']['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
        // // Transport and loading cost has been calculated and included in SQFT Cost
        // this.estimate['estimation']['totalTransportCost'] = 0;
        // this.estimate['estimation']['totalLoadingCost'] = 0;
        // // this.estimate['estimation']['totalTransportCost'] = this.estimate['estimation']['sqftTransportCost'] * this.distanceKM;
        // // this.estimate['estimation']['totalLoadingCost'] = this.estimate['estimation']['sqftLoadingCost'] * this.unitsTotal;
        // // Add only Product cost and Tax for the Total 
        // // Product cost inculdes loading, laying and transport data
        // // All these 3 are in taxable calcualtion
        // this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'];

        // // this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost'] + this.estimate['estimation']['totalLoadingCost'] + this.estimate['estimation']['sqftLayingCost'];
        // //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        // //console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));
        break;
      }

      case "HOLLOW_BLOCK": {
        this.getCommonCosts();
        this.clearProductCosts();
        this.clearHBCosts();
        this.calculateHBCost();
        // NEW for tax
        this.calculateTotalHBCost();
        // this.estimate['estimation']['totalProductCost'] = this.fullLoadsCostSum + this.estimate['estimation']['partialLoadCost'];
        // //console.log(this.estimate['estimation']['totalProductCost']);
        // this.estimate['estimation']['totalTax'] = this.fullLoadsTaxSum + this.estimate['estimation']['partialLoadTax'];
        // this.estimate['estimation']['totalTransportCost'] = this.fullLoadsTransportCostSum + this.estimate['estimation']['partialLoadTransportCost'];
        // this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost'];
        break;
      }
    }
  }
  calculateTilesCost() {
    this.showTransportCost = false;
    this.showLoadingCost = false;
    this.transportPerKMCostTiles = 50;
    // this.loadingCostPerUnit = 2;
    // this.loadingCostPerUnit = Number(this.estimate['estimation']['product']['loading_COST']);
    // this.tax1 = Number(this.estimate['estimation']['product']['product_TAX1']);
    // this.tax2 = Number(this.estimate['estimation']['product']['product_TAX2']);
    // this.distanceKM = Number(this.estimate['estimation']['distanceKM']);
    // this.unitsTotal = Number(this.estimate['estimation']['unitsTotal']);
    // console.log(this.unitsTotal);
    // console.log(this.distanceKM);

    this.calculatedTransportCost = this.roundTransportCost((Number(this.distanceKM) * this.transportPerKMCostTiles) / Number(this.unitsTotal));
    // this.calculatedTransportCost = this.roundTransportCost((this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
    // console.log(this.calculatedTransportCost);
    this.calculatedSqFtUnitCost = this.loadingCostPerUnit + this.productPricePerUnit + this.calculatedTransportCost;
    // console.log(this.calculatedSqFtUnitCost);
    this.estimate['estimation']['sqftLoadingCost'] = this.loadingCostPerUnit;
    // console.log(this.estimate['estimation']['sqftLoadingCost']);
    this.estimate['estimation']['sqftTransportCost'] = this.calculatedTransportCost;
    // console.log(this.estimate['estimation']['sqftTransportCost']);
    this.estimate['estimation']['sqftUnitCost'] = this.calculatedSqFtUnitCost;
    // console.log(this.estimate['estimation']['sqftUnitCost']);

  }
  calculateHBCost() {
    this.fullLoadOption = true;
    this.partialLoadOption = false;
    this.showTransportCost = false;
    this.transportPerKMCostHB = 60;

    this.estimate['estimation']['fullLoads'] = Math.floor(Number(this.estimate['estimation']['unitsTotal']) / 700);
    this.estimate['estimation']['partialLoad'] = Number(this.estimate['estimation']['unitsTotal']) % 700;
    if (this.estimate['estimation']['partialLoad'] > 0) {
      this.partialLoadOption = true;
    }
    if (this.estimate['estimation']['fullLoads'] == 0) {
      this.fullLoadOption = false;
    }
    // this.tax1 = Number(this.estimate['estimation']['product']['product_TAX1']);
    // this.tax2 = Number(this.estimate['estimation']['product']['product_TAX2']);
    // console.log(this.estimate['estimation']['fullLoads']); //700*loads
    // console.log(this.estimate['estimation']['partialLoad']); //partial load count
    // console.log(this.tax1);
    // console.log(this.tax2);
    // this.estimate['estimation']['fullLoadsTax'] = (this.estimate['estimation']['fullLoadsCost'] * (this.tax1 + this.tax2) / 100);
    // console.log(this.estimate['estimation']['fullLoadsTax']);
    if (this.fullLoadOption) {
      this.estimate['estimation']['fullLoadsCost'] = this.productPricePerUnit * 700;
      // console.log(this.estimate['estimation']['fullLoadsCost']);
      // this.estimate['estimation']['fullLoadsTax'] = (this.estimate['estimation']['fullLoadsCost'] * (this.tax1) / 100)
      this.estimate['estimation']['fullLoadsTax'] = (this.estimate['estimation']['fullLoadsCost'] * (this.tax1 + this.tax2) / 100)
      // console.log(this.estimate['estimation']['fullLoadsTax']);
      this.estimate['estimation']['fullLoadsTransportCost'] = this.transportPerKMCostHB * Number(this.distanceKM);
      // console.log(this.estimate['estimation']['fullLoadsTransportCost']);
      this.estimate['estimation']['fullLoadsTotalCost'] = (this.estimate['estimation']['fullLoadsCost'] + this.estimate['estimation']['fullLoadsTax'] + this.estimate['estimation']['fullLoadsTransportCost']);
      // console.log(this.estimate['estimation']['fullLoadsTotalCost']);

      this.fullLoadsCostSum = this.estimate['estimation']['fullLoadsCost'] * this.estimate['estimation']['fullLoads'];
      this.fullLoadsTaxSum = this.estimate['estimation']['fullLoadsTax'] * this.estimate['estimation']['fullLoads'];
      this.fullLoadsTransportCostSum = this.estimate['estimation']['fullLoadsTransportCost'] * this.estimate['estimation']['fullLoads'];
      this.fullLoadsTotalCostSum = this.estimate['estimation']['fullLoadsTotalCost'] * this.estimate['estimation']['fullLoads'];
    }
    if (this.partialLoadOption) {


      this.estimate['estimation']['partialLoadCost'] = this.productPricePerUnit * this.estimate['estimation']['partialLoad'];
      // this.estimate['estimation']['partialLoadTax'] = this.estimate['estimation']['partialLoadCost'] * ((this.tax1) / 100);
      this.estimate['estimation']['partialLoadTax'] = this.estimate['estimation']['partialLoadCost'] * ((this.tax1 + this.tax2) / 100);
      this.estimate['estimation']['partialLoadTransportCost'] = this.transportPerKMCostHB * Number(this.distanceKM);
      this.estimate['estimation']['partialLoadTotalCost'] = this.estimate['estimation']['partialLoadCost'] + this.estimate['estimation']['partialLoadTax'] + this.estimate['estimation']['partialLoadTransportCost'];
    }
  }
  calculatePaverCost() {
    this.transportPerKMCostPavers = 50;
    this.paversLayingCost = 5.5; // Only for Pavers

    this.showTransportCost = false;
    this.showLoadingCost = false;
    // this.loadingCostPerUnit = 2;
    // this.loadingCostPerUnit = Number(this.estimate['estimation']['product']['loading_COST']);
    // this.tax1 = Number(this.estimate['estimation']['product']['product_TAX1']);
    // this.tax2 = Number(this.estimate['estimation']['product']['product_TAX2']);
    // this.distanceKM = Number(this.estimate['estimation']['distanceKM']);
    // this.unitsTotal = Number(this.estimate['estimation']['unitsTotal']);
    this.calculatedTransportCost = this.roundTransportCost((Number(this.distanceKM) * this.transportPerKMCostPavers) / Number(this.unitsTotal));
    // console.log(this.calculatedTransportCost);
    this.calculatedSqFtUnitCost = this.loadingCostPerUnit + this.productPricePerUnit + this.calculatedTransportCost + this.paversLayingCost;
    // console.log(calculatedSqFtUnitCost);
    this.estimate['estimation']['sqftLoadingCost'] = this.loadingCostPerUnit;
    // console.log(this.estimate['estimation']['sqftLoadingCost']);
    this.estimate['estimation']['sqftTransportCost'] = this.calculatedTransportCost;
    // console.log(this.estimate['estimation']['sqftTransportCost']);
    this.estimate['estimation']['sqftUnitCost'] = this.calculatedSqFtUnitCost;
    // console.log(this.estimate['estimation']['sqftUnitCost']);
    this.estimate['estimation']['sqftLayingCost'] = this.paversLayingCost;
    // console.log(this.estimate['estimation']['sqftLayingCost']);
  }
  roundTransportCost(cost: number) {
    let int_part = Math.trunc(cost); // returns 3
    let float_part = Number((cost - int_part).toFixed(2)); // return 0.2
    // if (float_part > 0.5) {
    //   return (int_part + 1);
    // }
    // else if (float_part < 0.5 && float_part > 0.1) {
    //   return (int_part + 0.5);
    // }
    if (float_part > 0.1 && float_part < 0.25) {
      return int_part + .25;
    }
    else if (float_part > 0.25 && float_part < 0.50) {
      return int_part + 0.5;
    }
    else if (float_part > 0.50 && float_part < 0.75) {
      return int_part + 0.75;
    }
    else if (float_part > 0.75 && float_part < 0.99) {
      return int_part + 1;
    } else
      return int_part;
  }
  onItemGroupChange(product: Product[], product_group_id, product_group_name) {
    this.clearProductCosts();
    this.estimate['estimation']['distanceKM'] = '';
    // this.distanceReadOnly = false;
    this.estimate['estimation']['unitsTotal'] = '';
    this.productPricePerUnit = 0;
    this.loadingCostPerUnit = 0;
    this.products = [];
    this.authService.fetchProductDetailForGroup(product_group_id)
      .subscribe(
        (list: Product[]) => {
          // //console.log(list);
          this.products = list;
          this.loading.dismiss();
          this.disableItemName = false;
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );

    //     "QUARRY 100"
    // "CRUSHER / BUNKAR 101"
    // "DESIGNER_TILES 102"
    // "HOLLOW_BLOCK 103"
    // "PAVER 104"

    this.itemGroup = "";
    // this.itemGroup = "Aggregate";
    // //console.log("inside onItemGroupChange");
    // //console.log(product_group_name);
    // //console.log(product_group_name);
    if (product_group_name == "100" || product_group_name == "101") {
      // //console.log("inside QUARRY Division");
      this.itemGroup = "QUARRY";
      this.estimate['estimation']['productGroup'] = this.itemGroup;
      // this.items1 = product;
    }
    // if (product_group_name == "101") {
    //   // //console.log("inside QUARRY Division");
    //   this.itemGroup = "CRUSHER / BUNKAR";
    //   // this.items1 = product;
    // }
    if (product_group_name == "103") {
      this.itemGroup = "HOLLOW_BLOCK";
      this.estimate['estimation']['productGroup'] = this.itemGroup;
      // //console.log("inside HOLLOW_BLOCK Division");
      // //console.log(product);
      // //console.log(this.estimate['estimation']['unitsTotal']);
      // this.items1 = product;
    }

    if (product_group_name == "102") {
      this.itemGroup = "DESIGNER_TILES";
      this.estimate['estimation']['productGroup'] = this.itemGroup;
      // //console.log("inside PAVER Division");
      // //console.log(product);
      // this.items1 = product;
      // this.estimate['estimation']['unit1'] = this.estimate['estimation']['unit2'] = this.estimate['estimation']['unit4'] = this.estimate['estimation']['unit6'] = 0;
    }

    if (product_group_name == "104") {
      this.itemGroup = "PAVER";
      this.estimate['estimation']['productGroup'] = this.itemGroup;
      // //console.log("inside PAVER Division");
      // //console.log(product);
      // this.items1 = product;
      // this.estimate['estimation']['unit1'] = this.estimate['estimation']['unit2'] = this.estimate['estimation']['unit4'] = this.estimate['estimation']['unit6'] = 0;
    }

    // if (product_group_name == "104") {
    //   this.itemGroup = "PAVER";
    //   // //console.log("inside PAVER Division");
    //   // //console.log(product);
    //   // this.items1 = product;
    // }
    // //console.log(this.items1);
  }
  // estimateOrder(orders: Orders) {
  submitEstimation() {
    this.estimate['estimation']['salesRep'] = localStorage.getItem('employeeId');
    this.estimate['estimation']['salesRepName'] = localStorage.getItem('firstName');
    switch (this.itemGroup) {
      case "QUARRY": {
        this.aggregateTotalUnitsCountMatch();
        if (this.totalUnitsCountValidation) {
          this.doEstimation();
          break;
        }
        else
          this.aggregateUnitsTotalNotExceedTotalQty();
        break;
      }
      case "PAVER": {
        this.doEstimation();
        break;
      }
      case "DESIGNER_TILES": {
        this.doEstimation();
        break;
      }
      case "HOLLOW_BLOCK": {
        this.doEstimation();
        break;
      }
    }
  }
  estimateOrder(estimateForm) {
    console.log(this.estimate);
    // this.doEstimation();
    this.estimate['estimation']['salesRep'] = localStorage.getItem('employeeId');
    this.estimate['estimation']['salesRepName'] = localStorage.getItem('firstName');
    this.doNewEstimation();
    if (Number(this.unitsTotal) > 0 && Number(this.estimate['estimation']['distanceKM']) > 0) {
      // console.log(estimateForm.distanceKM);
      // console.log(this.estimate);
      this.showConfirm();
    } else {
      this.handleError("Total units and Distance Kms should not be zero...");
    }
    // if (this.itemGroup == "QUARRY") {
    //   if (this.totalUnitsCountValidation) {
    //     this.doEstimation();
    //   }
    //   else if (!this.totalUnitsCountValidation)
    //     this.aggregateUnitsTotalNotExceedTotalQty();
    // }
    // else if (this.itemGroup == "PAVER" || this.itemGroup == "DESIGNER_TILES" || this.itemGroup == "HOLLOW_BLOCK") {
    //   this.doEstimation();
    // }
    // estimateForm.reset();
    // this.estimate['estimation']['customerName'] = this.customer['cust_Name'];
    // this.estimate['estimation']['itemGroup'] = this.itemGroup;
    // this.estimate['estimation']['itemGroupName'] = this.customer1['cust_Name']
    // this.estimate['estimation']['orderDetails']['unit1'] = this.unit1;
    // this.estimate['estimation']['orderDetails']['unit2'] = this.unit2;
    // this.estimate['estimation']['orderDetails']['unit4'] = this.unit4;
    // this.estimate['estimation']['orderDetails']['unit6'] = this.unit6;
    // //console.log(this.customer['cust_Name']);
    // //console.log(this.itemGroup);
    // //console.log(this.customer1['cust_Name']);
    // //console.log(this.unit1);
    // //console.log(this.unit2);
    // //console.log(this.unit4);
    // //console.log(this.unit6);
    // //console.log(this.estimate);
    // this.orderData.slice();
    // this.orderData.push(orders);
    // //console.log(this.orderData);
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      // content: 'Collecting Orders...'
    });

    this.loading.present();
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    // const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
    this.showLoader("Loading Customers...");
    this.authService.fetchCustomerData()
      .subscribe(
        (list: Customer[]) => {
          // //console.log(list);
          this.customers = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );

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
  retrievePriceResponses() {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllRejectedOrders();
    }
    else if (this.role == '3') {
      this.retrieveRejectedOrders();
    }

  }
  doRefreshEstimated(refresher) {
    this.retrievePriceRequests();
    // if (this.role == '1' || this.role == '2') {
    //   this.retrieveAllEstimatedOrders();
    // }
    // else if (this.role == '3') {
    //   this.retrieveEstimatedOrders();
    // }
    refresher.complete();
  }
  doRefreshRejected(refresher) {
    this.retrievePriceResponses();
    // if (this.role == '1' || this.role == '2') {
    //   this.retrieveAllRejectedOrders();
    // }
    // else if (this.role == '3') {
    //   this.retrieveRejectedOrders();
    // }
    refresher.complete();
  }

  retrievePriceRequests() {
    if (this.role == '1' || this.role == '2') {
      // this.retrieveAllEstimatedOrders();
      this.retrieveAllPriceCheckOrders();
    }
    else if (this.role == '3') {
      // this.retrieveEstimatedOrders();
    }
  }
  retrieveRejectedOrders() {
    this.showLoader("Collecting Rejected Orders....");
    this.rejectedOrders = [];
    this.authService.fetchOrderByStatus("REJECTED")
      .subscribe(
        (list: Orders[]) => {
          this.rejectedOrders = list;
          console.log(this.rejectedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  rejectedOrders: Orders[] = [];

  retrieveAllRejectedOrders() {
    this.showLoader("Collecting Rejected Orders....");
    this.rejectedOrders = [];
    this.authService.fetchAllOrderByStatus("REJECTED")
      .subscribe(
        (list: Orders[]) => {
          this.rejectedOrders = list;
          // console.log(this.rejectedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveEstimatedOrders() {
    this.showLoader("Collecting Estimatd Orders....");
    this.estimatedOrders = [];
    this.authService.fetchOrderByStatus("ESTIMATED")
      .subscribe(
        (list: Orders[]) => {
          this.estimatedOrders = list;
          // console.log(this.estimatedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }

  estimatedOrders: Orders[] = [];
  approvedOrders: Orders[] = [];
  retrieveAllEstimatedOrders() {
    this.showLoader("Collecting Estimated Orders....");
    this.estimatedOrders = [];
    this.authService.fetchAllOrderByStatus("ESTIMATED")
      .subscribe(
        (list: Orders[]) => {
          this.estimatedOrders = list;
          // console.log(this.estimatedOrders);
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  private handleMessage(message: string) {
    const alert = this.alertCtrl.create({
      // title: 'Network Connection error!',
      subTitle: "Successfully submitted the Estimation...",
      message: message,
      buttons: ['Ok']
    });
    alert.present();
    // return false;
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      // title: 'Network Connection error!',
      subTitle: "Failed to submit the Estimation...",
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
    // return false;
  }
  isToggledTax: boolean = true;
  isToggledPriority: boolean = false;

  notifyTaxOption(event) {
    this.isToggledTax = !this.isToggledTax;
    this.estimate['estimation']['taxable'] = (this.isToggledTax == true) ? "Yes" : "No";
    this.reCalculateTotals();
    // //console.log("Event: "+ event.checked); 
    //console.log("Toggled Tax: " + this.isToggledTax);
  }
  notifyPriorityOption(event) {
    this.isToggledPriority = !this.isToggledPriority;
    // this.estimate['estimation']['highPriority'] = (this.isToggledPriority == true) ? "Yes" : "No";
  }
  reCalculateTotals() {
    switch (this.itemGroup) {
      case "QUARRY": {
        // this.calculateAggregateTotal();
        // MAy need to call like this
        this.onChangeUnit1(this.estimate['estimation']['unit1']);
        this.onChangeUnit2(this.estimate['estimation']['unit2']);
        this.onChangeUnit4(this.estimate['estimation']['unit4']);
        this.onChangeUnit6(this.estimate['estimation']['unit6']);
        break;
      }
      case "DESIGNER_TILES": {
        this.getCommonCosts();
        this.calculateTilesCost();
        this.calculateTotalTilesCost();
        break;
      }
      case "PAVER": {
        this.getCommonCosts();
        this.calculatePaverCost();
        this.calculateTotalPaverCost();
        break;
      }

      case "HOLLOW_BLOCK": {
        this.getCommonCosts();
        this.calculateHBCost();
        this.calculateTotalHBCost();
        break;
      }
    }
  }

  calculateTotalPaverCost() {
    this.estimate['estimation']['totalProductCost'] = this.estimate['estimation']['sqftUnitCost'] * Number(this.unitsTotal);
    this.estimate['estimation']['totalTax'] = this.estimate['estimation']['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
    // Transport and loading cost has been calculated and included in SQFT Cost
    this.estimate['estimation']['totalTransportCost'] = 0;
    this.estimate['estimation']['totalLoadingCost'] = 0;
    // Add only Product cost and Tax for the Total 
    // Product cost inculdes loading, laying and transport data
    // All these 3 are in taxable calcualtion
    // this.isToggledTax == true)? "yes" : "no";
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax']) : (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost']);
  }

  calculateTotalHBCost() {
    this.estimate['estimation']['totalProductCost'] = this.fullLoadsCostSum + this.estimate['estimation']['partialLoadCost'];
    //console.log(this.estimate['estimation']['totalProductCost']);
    this.estimate['estimation']['totalTax'] = this.fullLoadsTaxSum + this.estimate['estimation']['partialLoadTax'];
    this.estimate['estimation']['totalTransportCost'] = this.fullLoadsTransportCostSum + this.estimate['estimation']['partialLoadTransportCost'];
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost']) :
      (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTransportCost']);
  }

  calculateTotalTilesCost() {
    this.estimate['estimation']['totalProductCost'] = this.estimate['estimation']['sqftUnitCost'] * Number(this.unitsTotal);
    // console.log(this.estimate['estimation']['totalProductCost']);
    this.estimate['estimation']['totalTax'] = this.estimate['estimation']['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
    // console.log(this.estimate['estimation']['totalTax']);
    // Transport and loading cost has been calculated and included in SQFT Cost
    this.estimate['estimation']['totalTransportCost'] = 0;
    this.estimate['estimation']['totalLoadingCost'] = 0;
    // this.estimate['estimation']['totalTransportCost'] = this.estimate['estimation']['sqftTransportCost'] * this.distanceKM;
    // this.estimate['estimation']['totalLoadingCost'] = this.estimate['estimation']['sqftLoadingCost'] * this.unitsTotal;
    (this.isToggledTax == true) ?
      (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTax'] + this.estimate['estimation']['totalTransportCost'] + this.estimate['estimation']['totalLoadingCost']) :
      (this.estimate['estimation']['totalCost'] = this.estimate['estimation']['totalProductCost'] + this.estimate['estimation']['totalTransportCost'] + this.estimate['estimation']['totalLoadingCost']);
    // console.log(this.estimate['estimation']['totalCost']);
  }
  doEstimation() {
    this.showLoader("Submitting the Estimation...");
    // this.handleError("estimation");
    this.authService.sendEstimation(this.estimate)
      .subscribe(
        success => {
          // console.log("success");
          // this.handleMessage("Success");
          // this.ngOnInit();
          // this.clearHBCosts();
          // this.clearProductCosts();
          if (success == 200) {
            this.loading.dismiss();
            this.handleMessage("Success");
            // this.ngOnInit();
            this.clearAllData();
            //   // this.token = true;
            //   // this.token_name = success.token;
            //   // localStorage.setItem('token', this.token_name);
            //   // localStorage.setItem('role', success.role);
            //   // // localStorage.setItem('companyName', success.companyName);
            //   // localStorage.setItem('companyId', success.companyId);
            //   // localStorage.setItem('isAuthenticated', 'true');
            //   // //console.log('Company Id -' + success.companyId);
            //   // //console.log('Role -' + success.role);
            //   // this.isAuthenticated = true;
            //   // this.navCtrl.setRoot(TabsPage);
          }
          else {
            // this.presentToast("error");
            // this.ngOnInit();
            this.loading.dismiss();
            this.handleError("error");
            //   // this.token = false;
            //   // // this.isAuthenticated = false;
            //   // localStorage.setItem('isAuthenticated', 'false');
            //   // this.invalidLogin.emit(true);
          }
        },
        (error) => {
          // (error) => {
          // console.log(error.status);
          // this.handleError(error);
          this.loading.dismiss();
          this.handleError("error");
          // this.presentToast(error);
        });
  }
  doNewEstimation() {
    console.log("new estimate");
    console.log(this.estimate);
    this.showLoader("Submitting the Estimation...");
    // this.handleError("estimation");
    this.authService.sendPriceCheckRequest(this.estimate)
      .subscribe(
        success => {
          // console.log("success");
          // this.handleMessage("Success");
          // this.ngOnInit();
          // this.clearHBCosts();
          // this.clearProductCosts();
          if (success == 200) {
            this.loading.dismiss();
            this.handleMessage("Success");
            // this.ngOnInit();
            this.clearAllData();
            //   // this.token = true;
            //   // this.token_name = success.token;
            //   // localStorage.setItem('token', this.token_name);
            //   // localStorage.setItem('role', success.role);
            //   // // localStorage.setItem('companyName', success.companyName);
            //   // localStorage.setItem('companyId', success.companyId);
            //   // localStorage.setItem('isAuthenticated', 'true');
            //   // //console.log('Company Id -' + success.companyId);
            //   // //console.log('Role -' + success.role);
            //   // this.isAuthenticated = true;
            //   // this.navCtrl.setRoot(TabsPage);
          }
          else {
            // this.presentToast("error");
            // this.ngOnInit();
            this.loading.dismiss();
            this.handleError("error");
            //   // this.token = false;
            //   // // this.isAuthenticated = false;
            //   // localStorage.setItem('isAuthenticated', 'false');
            //   // this.invalidLogin.emit(true);
          }
        },
        (error) => {
          // (error) => {
          // console.log(error.status);
          // this.handleError(error);
          this.loading.dismiss();
          this.handleError("error");
          // this.presentToast(error);
        });
  }

  displayDecimalINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to Submit the Estimate?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.submitEstimation();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
@Component({
  selector: 'estimation-details',
  templateUrl: 'estimation-details.html',
})
@Component({
  selector: 'estimation-details',
  templateUrl: 'estimation-details.html',
})
export class EstimationDetailsPage {
  order;
  order_type;
  subOrders: SubOrders[];
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
    this.role = localStorage.getItem('role');
    // if (this.role == '1' || this.role == '2') {
    //   this.showApprove = true;
    //   console.log(this.showApprove);
    // }
    this.order = params.data.item;
    this.order_type = params.data.test;
    console.log(this.order);
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
  }

  displayDecimalINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }  // displayINR(amount: number) {
  //   return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  // }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  rejectOrder(order_GROUP_NO) {
    console.log(order_GROUP_NO);
    this.showLoader("Collecting Rejected Orders...");
    this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "REJECTED")
      .subscribe(
        (success) => {
          this.nav.pop();
          this.nav.push(EstimatePage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
  sendPriceCheck(row) {
    console.log(row);
    this.doEstimation();
  }
  sendNewEstimation(row) {
    console.log(row);
    this.doNewEstimation();
  }
  approveOrder(order_GROUP_NO) {
    console.log(order_GROUP_NO);
    // this.showLoader("Collecting Approved Orders....");
    // this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "APPROVED")
    //   .subscribe(
    //     (success) => {
    //       // this.refreshList();
    //       this.nav.pop();
    //       this.nav.push(EstimatePage);
    //       this.loading.dismiss();
    //     },
    //     (error) => console.log(error)
    //   );
  }
  getOrderByStatus() {
    this.showLoader("Collecting Orders.....");
    this.authService.fetchSubOrder(this.order['order_GROUP_NO'])
      .subscribe(
        // (list) => {
        (list: SubOrders[]) => {
          this.subOrders = list;
          // console.log(this.subOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  approvePriceCheck(estimateForm) {
    console.log(this.order);
  }
  isToggledTax: boolean = true;
  partialLoadOption: boolean = true;
  doEstimation() {
    console.log("old estimation");
    this.showLoader("Submitting the Estimation...");
    // this.handleError("estimation");
    this.authService.sendPriceCheckRequest(this.order)
      .subscribe(
        success => {
          // console.log("success");
          // this.handleMessage("Success");
          // this.ngOnInit();
          // this.clearHBCosts();
          // this.clearProductCosts();
          if (success == 200) {
            this.loading.dismiss();
            // this.handleMessage("Success");
            // this.ngOnInit();
            // this.clearAllData();
          }
          else {
            // this.presentToast("error");
            // this.ngOnInit();
            this.loading.dismiss();
            // this.handleError("error");
          }
        },
        (error) => {
          // (error) => {
          // console.log(error.status);
          // this.handleError(error);
          this.loading.dismiss();
          // this.handleError("error");
          // this.presentToast(error);
        });
  }
  doNewEstimation() {
    console.log("new  estimation");
    this.showLoader("Submitting the Estimation...");
    // this.handleError("estimation");
    this.authService.sendNewEstimation(this.order)
      .subscribe(
        success => {
          // console.log("success");
          if (success == 200) {
            this.loading.dismiss();
          }
          else {
            this.loading.dismiss();
          }
        },
        (error) => {
          this.loading.dismiss();
        });
  }
  updatePriceCheckOrder(order_GROUP_NO) {
    // console.log(order_GROUP_NO);
    this.showLoader("Collecting Rejected Orders...");
    this.authService.updatePriceCheckStatusOfGroupOrder(order_GROUP_NO, "DELETED")
      .subscribe(
        (success) => {
          // this.nav.pop();
          // this.nav.push(OrdersPage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
}