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
  fullLoadOption: boolean = false;
  products: Product[] = [];
  selectedProduct: Product[] = [];
  productGroupModel: ProductGroup[] = [];
  sites: Site[] = [];
  references: Reference[] = [];
  partialLoad: number;
  uom: string = '';
  totalUnitsCountValidation: boolean = false;
  estimate = {
    customerID: '',
    // itemGroup: '',
    siteID: '',
    reference1: '',
    reference2: '',
    productGroup: '', //itemGroup
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
    unit1ProductCost: 0,
    unit1Tax: 0,
    unit1LoadingCost: 0,
    unitlTransportCost: 0,
    unit1TotalCost: 0,
    unit2: 0,
    unit2ProductCost: 0,
    unit2Tax: 0,
    unit2LoadingCost: 0,
    unit2TransportCost: 0,
    unit2TotalCost: 0,
    unit4: 0,
    unit4ProductCost: 0,
    unit4Tax: 0,
    unit4LoadingCost: 0,
    unit4TransportCost: 0,
    unit4TotalCost: 0,
    unit6: 0,
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
    customerName: 0,
    siteName: 0,
    salesRepName: '',
    referral1Name: 0,
    referral2Name: 0
    // unit1TaxSum: 0,
    // unit1TotalCostSum: 0,
    // unit1LoadingCostSum: 0,
    // unitlTransportCostSum: 0,
  }
  totalUnitsCountCheck() {
    // console.log(Number(this.estimate['unit1'] * 1) + Number(this.estimate['unit2'] * 2) + Number(this.estimate['unit4'] * 4) + Number(this.estimate['unit6'] * 6));
    if (Number(this.estimate['unit1'] * 1) + Number(this.estimate['unit2'] * 2) + Number(this.estimate['unit4'] * 4) + Number(this.estimate['unit6'] * 6) > this.unitsTotal) {
      // if (Number(this.estimate['unit1'] + this.estimate['unit2'] + this.estimate['unit4'] + this.estimate['unit6']) > this.unitsTotal) {
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
  checkTotalUnitsMatch() {
    // console.log(Number(this.estimate['unit1'] * 1) + Number(this.estimate['unit2'] * 2) + Number(this.estimate['unit4'] * 4) + Number(this.estimate['unit6'] * 6));
    if (Number(this.estimate['unit1'] * 1) + Number(this.estimate['unit2'] * 2) + Number(this.estimate['unit4'] * 4) + Number(this.estimate['unit6'] * 6) != this.unitsTotal) {
      // if (Number(this.estimate['unit1'] + this.estimate['unit2'] + this.estimate['unit4'] + this.estimate['unit6']) > this.unitsTotal) {
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
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
    //console.log('ionViewDidLoad EstimatePage');
  }
  clearAllData() {
    // this.clearHBCosts();
    // estimateForm.distanceKM.value = 0;
    this.estimate['distanceKM'] = 0;
    this.estimate['unitsTotal'] = 0;
    this.estimate['transportPerKMCost'] = 0;
    this.estimate['totalProductCost'] = 0;
    this.estimate['totalTax'] = 0;
    this.estimate['totalLoadingCost'] = 0;
    this.estimate['totalTransportCost'] = 0;
    this.estimate['totalCost'] = 0;
    this.estimate['product']['product_COST'] = 0;
    this.estimate['product']['loading_COST'] = 0;
    this.clearProductCosts();
    this.clearDropdown();
  }

  clearDropdown() {
    this.estimate['siteID'] = '0';
    this.estimate['reference1'] = '0';
    this.estimate['reference2'] = '0';
    this.estimate['productGroupName'] = '0';
    // this.estimate['product'] = '0';
  }
  clearProductCosts() {
    // this.estimate['unitsTotal'] = 0;
    this.estimate['unit1'] = 0;
    this.estimate['unit2'] = 0;
    this.estimate['unit4'] = 0;
    this.estimate['unit6'] = 0;
    this.estimate['totalProductCost'] = 0;
    this.estimate['totalTax'] = 0;
    this.estimate['totalLoadingCost'] = 0;
    this.estimate['totalTransportCost'] = 0;
    this.estimate['totalCost'] = 0;
    // this.estimate['product']['product_COST'] = '';
    // this.estimate['product']['loading_COST'] = '';

  }
  clearHBCosts() {
    this.estimate['fullLoadsCost'] = 0;
    this.estimate['fullLoadsTax'] = 0;
    this.estimate['fullLoadsTransportCost'] = 0;
    this.estimate['fullLoadsTotalCost'] = 0;
    this.fullLoadsCostSum = 0;
    this.fullLoadsTaxSum = 0;
    this.fullLoadsTransportCostSum = 0;
    this.fullLoadsTotalCostSum = 0;
    this.estimate['partialLoadCost'] = 0;
    this.estimate['partialLoadTax'] = 0;
    this.estimate['partialLoadTransportCost'] = 0;
    this.estimate['partialLoadTotalCost'] = 0;
  }
  onItemNameChange(product: Product[]) {
    // //console.log("customer");
    // //console.log(product);
    this.clearProductCosts();
    this.selectedProduct = product;
    //console.log(this.selectedProduct);
    // console.log(this.estimate);
    // this.uom = this.estimate['product']['uom'];
  }

  onSelectCustomer(customer_id, customer_name) {
    // //console.log(customer_id);
    this.estimate['customerName'] = customer_name;
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
    this.authService.fetchReferenceDetails()
      .subscribe(
        (list: Reference[]) => {
          // //console.log(list);
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
    this.estimate['siteName'] = site_name;
  }
  onSelectReference(reference_name) {
    this.estimate['referral1Name'] = reference_name;
    this.estimate['referral2Name'] = reference_name;
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

  onChangeUnit1(units) {
    this.getCommonCosts();
    this.totalUnitsCountCheck();
    // if ((this.estimate['unit1'] + this.estimate['unit2'] + this.estimate['unit4'] + this.estimate['unit6']) > this.unitsTotal) {
    // }

    // console.log(this.totalUnitsCount);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit1);

    this.estimate['unit1ProductCost'] = this.productPricePerUnit * 1;
    //console.log(this.estimate['unit1ProductCost']);
    // this.estimate['unit1Tax'] = this.estimate['unit1ProductCost'] * ((this.tax1) / 100);
    this.estimate['unit1Tax'] = this.estimate['unit1ProductCost'] * ((this.tax1 + this.tax2) / 100);
    //console.log(this.estimate['unit1Tax']);
    this.estimate['unit1LoadingCost'] = this.loadingCostPerUnit * 1;
    //console.log(this.estimate['unit1LoadingCost']);
    this.estimate['unitlTransportCost'] = this.transportPerKMCostUnit1 * this.distanceKM;
    //console.log(this.estimate['unitlTransportCost']);
    this.estimate['unit1TotalCost'] = this.estimate['unit1ProductCost'] + this.estimate['unit1Tax'] +
      this.estimate['unit1LoadingCost'] + this.estimate['unitlTransportCost'];
    //console.log(this.estimate['unit1TotalCost']);

    this.unit1CostSum = this.estimate['unit1ProductCost'] * units;
    //console.log(this.unit1CostSum);
    this.unit1TaxSum = this.estimate['unit1Tax'] * this.estimate['unit1'];
    //console.log(this.unit1TaxSum);
    this.unit1LoadingCostSum = this.estimate['unit1LoadingCost'] * this.estimate['unit1'];
    //console.log(this.unit1LoadingCostSum);
    this.unitlTransportCostSum = this.estimate['unitlTransportCost'] * this.estimate['unit1'];
    //console.log(this.unitlTransportCostSum);
    this.unit1TotalCostSum = this.estimate['unit1TotalCost'] * this.estimate['unit1'];
    //console.log(this.unit1TotalCostSum);

    this.calculateAggregateTotal();

    // this.estimate['totalProductCost'] = this.unit1CostSum + this.unit2CostSum + this.unit4CostSum + this.unit6CostSum;
    // this.estimate['totalTax'] = this.unit1TaxSum + this.unit2TaxSum + this.unit2TaxSum + this.unit2TaxSum;
    // this.estimate['totalLoadingCost'] = this.unit1LoadingCostSum + this.unit2LoadingCostSum + this.unit4LoadingCostSum + this.unit6LoadingCostSum;
    // this.estimate['totalTransportCost'] = this.unitlTransportCostSum + this.unit2TransportCostSum + this.unit4TransportCostSum + this.unit6TransportCostSum;
    // this.estimate['totalCost'] = this.unit1TotalCostSum + this.unit2TotalCostSum + this.unit4TotalCostSum + this.unit6TotalCostSum;
    // this.estimate['totalSum'] = this.estimate['totalCost'] + this.estimate['totalTax'] + this.estimate['totalTransportCost'];



    // this.estimate['totalTax'] =
    //   this.estimate['unit1TaxSum'] + this.estimate['unit2TaxSum'] + this.estimate['unit4TaxSum'] + this.estimate['unit6TaxSumunit6Tax'];
    // this.estimate['totalLoadingCost'] =
    //   this.estimate['unit1LoadingCostSum'] + this.estimate['unit2LoadingCostSum'] + this.estimate['unit4LoadingCostSum'] + this.estimate['unit6LoadingCostSum'];
    // this.estimate['totalTransportCost'] =
    //   this.estimate['unitlTransportCostSum'] + this.estimate['unit2TransportCostSum'] + this.estimate['unit4TransportCostSum'] + this.estimate['unit6TransportCostSum'];
    // this.estimate['totalSum'] = this.estimate['totalCost'] + this.estimate['totalTax'] + this.estimate['totalLoadingCost'] + this.estimate['totalTransportCost'];

  }
  onChangeUnit2(units) {
    this.getCommonCosts();
    this.totalUnitsCountCheck();
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit2);

    this.estimate['unit2ProductCost'] = this.productPricePerUnit * 2;
    //console.log(this.estimate['unit2ProductCost']);
    // this.estimate['unit2Tax'] = this.estimate['unit2ProductCost'] * ((this.tax1) / 100);
    this.estimate['unit2Tax'] = this.estimate['unit2ProductCost'] * ((this.tax1 + this.tax2) / 100);
    //console.log("unit2Tax" + this.estimate['unit2Tax']);
    this.estimate['unit2LoadingCost'] = this.loadingCostPerUnit * 2;
    //console.log(this.estimate['unit2LoadingCost']);
    this.estimate['unit2TransportCost'] = this.transportPerKMCostUnit2 * this.distanceKM;
    //console.log(this.estimate['unit2TransportCost']);
    this.estimate['unit2TotalCost'] = this.estimate['unit2ProductCost'] + this.estimate['unit2Tax'] +
      this.estimate['unit2LoadingCost'] + this.estimate['unit2TransportCost'];
    //console.log(this.estimate['unit2TotalCost']);

    this.unit2CostSum = this.estimate['unit2ProductCost'] * units;
    //console.log(this.unit2CostSum);
    this.unit2TaxSum = this.estimate['unit2Tax'] * this.estimate['unit2'];
    //console.log(this.unit2TaxSum);
    this.unit2LoadingCostSum = this.estimate['unit2LoadingCost'] * this.estimate['unit2'];
    //console.log(this.unit2LoadingCostSum);
    this.unit2TransportCostSum = this.estimate['unit2TransportCost'] * this.estimate['unit2'];
    //console.log(this.unitlTransportCostSum);
    this.unit2TotalCostSum = this.estimate['unit2TotalCost'] * this.estimate['unit2'];
    //console.log(this.unit2TotalCostSum);
    this.calculateAggregateTotal();
  }
  onChangeUnit4(units) {
    this.getCommonCosts();
    this.totalUnitsCountCheck();
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit4);

    this.estimate['unit4ProductCost'] = this.productPricePerUnit * 4;
    //console.log(this.estimate['unit4ProductCost']);
    // this.estimate['unit4Tax'] = this.estimate['unit4ProductCost'] * ((this.tax1) / 100);
    this.estimate['unit4Tax'] = this.estimate['unit4ProductCost'] * ((this.tax1 + this.tax2) / 100);
    //console.log("unit4Tax" + this.estimate['unit4Tax']);
    this.estimate['unit4LoadingCost'] = this.loadingCostPerUnit * 4;
    //console.log(this.estimate['unit4LoadingCost']);
    this.estimate['unit4TransportCost'] = this.transportPerKMCostUnit4 * this.distanceKM;
    //console.log(this.estimate['unit4TransportCost']);
    this.estimate['unit4TotalCost'] = this.estimate['unit4ProductCost'] + this.estimate['unit4Tax'] +
      this.estimate['unit4LoadingCost'] + this.estimate['unit4TransportCost'];
    //console.log(this.estimate['unit4TotalCost']);

    this.unit4CostSum = this.estimate['unit4ProductCost'] * units;
    //console.log(this.unit4CostSum);
    this.unit4TaxSum = this.estimate['unit4Tax'] * this.estimate['unit4'];
    //console.log(this.unit4TaxSum);
    this.unit4LoadingCostSum = this.estimate['unit4LoadingCost'] * this.estimate['unit4'];
    //console.log(this.unit4LoadingCostSum);
    this.unit4TransportCostSum = this.estimate['unit4TransportCost'] * this.estimate['unit4'];
    //console.log(this.unit4TransportCostSum);
    this.unit4TotalCostSum = this.estimate['unit4TotalCost'] * this.estimate['unit4'];
    //console.log(this.unit4TotalCostSum);
    this.calculateAggregateTotal();
  }
  onChangeUnit6(units) {
    // this.getCommonCosts();
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit6);
    this.getCommonCosts();
    this.totalUnitsCountCheck();
    //console.log(this.productPricePerUnit);
    //console.log(this.loadingCostPerUnit);
    //console.log(this.transportPerKMCostUnit6);

    this.estimate['unit6ProductCost'] = this.productPricePerUnit * 6;
    //console.log(this.estimate['unit6ProductCost']);
    // this.estimate['unit6Tax'] = this.estimate['unit6ProductCost'] * ((this.tax1) / 100);
    this.estimate['unit6Tax'] = this.estimate['unit6ProductCost'] * ((this.tax1 + this.tax2) / 100);
    //console.log("unit6Tax" + this.estimate['unit6Tax']);
    this.estimate['unit6LoadingCost'] = this.loadingCostPerUnit * 6;
    //console.log(this.estimate['unit6LoadingCost']);
    this.estimate['unit6TransportCost'] = this.transportPerKMCostUnit6 * this.distanceKM;
    //console.log(this.estimate['unit6TransportCost']);
    this.estimate['unit6TotalCost'] = this.estimate['unit6ProductCost'] + this.estimate['unit6Tax'] +
      this.estimate['unit6LoadingCost'] + this.estimate['unit6TransportCost'];
    //console.log(this.estimate['unit6TotalCost']);

    this.unit6CostSum = this.estimate['unit6ProductCost'] * units;
    //console.log(this.unit6CostSum);
    this.unit6TaxSum = this.estimate['unit6Tax'] * this.estimate['unit6'];
    //console.log(this.unit6TaxSum);
    this.unit6LoadingCostSum = this.estimate['unit6LoadingCost'] * this.estimate['unit6'];
    //console.log(this.unit6LoadingCostSum);
    this.unit6TransportCostSum = this.estimate['unit6TransportCost'] * this.estimate['unit6'];
    //console.log(this.unitlTransportCostSum);
    this.unit6TotalCostSum = this.estimate['unit6TotalCost'] * this.estimate['unit6'];
    //console.log(this.unit6TotalCostSum);
    this.calculateAggregateTotal();
  }
  calculateAggregateTotal() {
    this.estimate['totalProductCost'] = this.unit1CostSum + this.unit2CostSum + this.unit4CostSum + this.unit6CostSum;
    this.estimate['totalTax'] = this.unit1TaxSum + this.unit2TaxSum + this.unit4TaxSum + this.unit6TaxSum;
    this.estimate['totalLoadingCost'] = this.unit1LoadingCostSum + this.unit2LoadingCostSum + this.unit4LoadingCostSum + this.unit6LoadingCostSum;
    this.estimate['totalTransportCost'] = this.unitlTransportCostSum + this.unit2TransportCostSum + this.unit4TransportCostSum + this.unit6TransportCostSum;
    this.estimate['totalCost'] = this.unit1TotalCostSum + this.unit2TotalCostSum + this.unit4TotalCostSum + this.unit6TotalCostSum;
  }

  getCommonCosts() {
    this.productPricePerUnit = Number(this.estimate['product']['product_COST']);

    this.loadingCostPerUnit = Number(this.estimate['product']['loading_COST']);
    this.tax1 = Number(this.estimate['product']['product_TAX1']);
    this.tax2 = Number(this.estimate['product']['product_TAX2']);
    this.distanceKM = Number(this.estimate['distanceKM']);
    this.unitsTotal = Number(this.estimate['unitsTotal']);

    this.transportPerKMCostUnit1 = 25;
    this.transportPerKMCostUnit2 = 30;
    this.transportPerKMCostUnit4 = 35;
    this.transportPerKMCostUnit6 = 50;
  }
  onChangeTotalUnits(units) {
    // this.clearProductCosts();
    //console.log(this.estimate);
    // Identify the Partial Load display and value
    //console.log(this.productPricePerUnit = this.estimate['product']['product_COST']);
    //console.log(this.loadingCostPerUnit = this.estimate['product']['loading_COST']);
    // this.tax1 = this.estimate['product']['product_TAX1'];
    // this.tax2 = this.estimate['product']['product_TAX2'];
    //console.log(this.distanceKM = this.estimate['distanceKM']);
    //console.log(this.unitsTotal = this.estimate['unitsTotal']);
    switch (this.itemGroup) {
      case "QUARRY": {
        this.showTransportCost = true;
        this.showLoadingCost = true;

        // //console.log(this.transportPerKMCostUnit1 = 25);
        // //console.log(this.transportPerKMCostUnit2 = 30);
        // //console.log(this.transportPerKMCostUnit4 = 35);
        // //console.log(this.transportPerKMCostUnit6 = 50);
        // //console.log(this.estimate['unit1']);
        // //console.log(this.estimate['unit2']);
        // //console.log(this.estimate['unit4']);
        // //console.log(this.estimate['unit6']);

        // this.estimate[''];
        // this.estimate['unit1ProductCost'] = this.productPricePerUnit * 1;
        // this.estimate['unit1Tax'] = this.estimate['unit1ProductCost'] * ((this.tax1 + this.tax2) / 100);
        // this.estimate['unit1LoadingCost'] = this.loadingCostPerUnit * 1;
        // this.estimate['unitlTransportCost'] = this.transportPerKMCostUnit1 * this.distanceKM;
        // this.estimate['unit1TotalCost'] = this.estimate['unit1ProductCost'] + this.estimate['unit1Tax'] +
        //   this.estimate['unit1LoadingCost'] + this.estimate['unitlTransportCost'];
        // this.estimate['unit1TotalCostSum'] = this.estimate['unit1TotalCost'] * this.estimate['unit1'];
        // this.estimate['unit1TaxSum'] = this.estimate['unit1Tax'] * this.estimate['unit1'];
        // this.estimate['unit1LoadingCostSum'] = this.estimate['unit1LoadingCost'] * this.estimate['unit1'];
        // this.estimate['unitlTransportCostSum'] = this.estimate['unitlTransportCost'] * this.estimate['unit1'];


        // this.estimate['totalProductCost'] =
        //   this.estimate['unit1TotalCostSum'] + this.estimate['unit2TotalCostSum'] + this.estimate['unit4TotalCostSum'] + this.estimate['unit6TotalCostSum'];
        // this.estimate['totalTax'] =
        //   this.estimate['unit1TaxSum'] + this.estimate['unit2TaxSum'] + this.estimate['unit4TaxSum'] + this.estimate['unit6TaxSumunit6Tax'];
        // this.estimate['totalLoadingCost'] =
        //   this.estimate['unit1LoadingCostSum'] + this.estimate['unit2LoadingCostSum'] + this.estimate['unit4LoadingCostSum'] + this.estimate['unit6LoadingCostSum'];
        // this.estimate['totalTransportCost'] =
        //   this.estimate['unitlTransportCostSum'] + this.estimate['unit2TransportCostSum'] + this.estimate['unit4TransportCostSum'] + this.estimate['unit6TransportCostSum'];
        // this.estimate['totalCost'] = this.estimate['totalProductCost'] + this.estimate['totalTax'] + this.estimate['totalLoadingCost'] + this.estimate['totalTransportCost'];
        break;
      }
      case "DESIGNER_TILES": {
        this.getCommonCosts();
        // this.clearProductCosts();
        this.showTransportCost = false;
        this.showLoadingCost = false;
        this.transportPerKMCostTiles = 50;
        // this.loadingCostPerUnit = 2;
        // this.loadingCostPerUnit = Number(this.estimate['product']['loading_COST']);
        // this.tax1 = Number(this.estimate['product']['product_TAX1']);
        // this.tax2 = Number(this.estimate['product']['product_TAX2']);
        // this.distanceKM = Number(this.estimate['distanceKM']);
        // this.unitsTotal = Number(this.estimate['unitsTotal']);
        // console.log(this.unitsTotal);
        // console.log(this.distanceKM);

        this.calculatedTransportCost = ((this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        // this.calculatedTransportCost = this.roundTransportCost((this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        // console.log(this.calculatedTransportCost);
        this.calculatedSqFtUnitCost = this.loadingCostPerUnit + this.productPricePerUnit + this.calculatedTransportCost;
        // console.log(this.calculatedSqFtUnitCost);
        this.estimate['sqftLoadingCost'] = this.loadingCostPerUnit;
        // console.log(this.estimate['sqftLoadingCost']);
        this.estimate['sqftTransportCost'] = this.calculatedTransportCost;
        // console.log(this.estimate['sqftTransportCost']);
        this.estimate['sqftUnitCost'] = this.calculatedSqFtUnitCost;
        // console.log(this.estimate['sqftUnitCost']);

        this.estimate['totalProductCost'] = this.estimate['sqftUnitCost'] * this.unitsTotal;
        // console.log(this.estimate['totalProductCost']);
        this.estimate['totalTax'] = this.estimate['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
        // console.log(this.estimate['totalTax']);
        // Transport and loading cost has been calculated and included in SQFT Cost
        this.estimate['totalTransportCost'] = 0;
        this.estimate['totalLoadingCost'] = 0;
        // this.estimate['totalTransportCost'] = this.estimate['sqftTransportCost'] * this.distanceKM;
        // this.estimate['totalLoadingCost'] = this.estimate['sqftLoadingCost'] * this.unitsTotal;
        this.estimate['totalCost'] = this.estimate['totalProductCost'] + this.estimate['totalTax'] + this.estimate['totalTransportCost'] + this.estimate['totalLoadingCost'];
        // console.log(this.estimate['totalCost']);
        //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        //console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));
        break;
      }
      case "PAVER": {
        this.getCommonCosts();
        // this.clearProductCosts();
        this.transportPerKMCostPavers = 50;
        this.paversLayingCost = 5.50; // Only for Pavers

        this.showTransportCost = false;
        this.showLoadingCost = false;
        // this.loadingCostPerUnit = 2;
        // this.loadingCostPerUnit = Number(this.estimate['product']['loading_COST']);
        // this.tax1 = Number(this.estimate['product']['product_TAX1']);
        // this.tax2 = Number(this.estimate['product']['product_TAX2']);
        // this.distanceKM = Number(this.estimate['distanceKM']);
        // this.unitsTotal = Number(this.estimate['unitsTotal']);
        this.calculatedTransportCost = this.roundTransportCost((this.distanceKM * this.transportPerKMCostPavers) / this.unitsTotal);
        // console.log(this.calculatedTransportCost);
        this.calculatedSqFtUnitCost = this.loadingCostPerUnit + this.productPricePerUnit + this.calculatedTransportCost + this.paversLayingCost;
        // console.log(calculatedSqFtUnitCost);
        this.estimate['sqftLoadingCost'] = this.loadingCostPerUnit;
        // console.log(this.estimate['sqftLoadingCost']);
        this.estimate['sqftTransportCost'] = this.calculatedTransportCost;
        // console.log(this.estimate['sqftTransportCost']);
        this.estimate['sqftUnitCost'] = this.calculatedSqFtUnitCost;
        // console.log(this.estimate['sqftUnitCost']);
        this.estimate['sqftLayingCost'] = this.paversLayingCost;
        // console.log(this.estimate['sqftLayingCost']);

        this.estimate['totalProductCost'] = this.estimate['sqftUnitCost'] * this.unitsTotal;
        //console.log(this.estimate['totalProductCost']);
        this.estimate['totalTax'] = this.estimate['totalProductCost'] * ((this.tax1 + this.tax2) / 100);
        // Transport and loading cost has been calculated and included in SQFT Cost
        this.estimate['totalTransportCost'] = 0;
        this.estimate['totalLoadingCost'] = 0;
        // this.estimate['totalTransportCost'] = this.estimate['sqftTransportCost'] * this.distanceKM;
        // this.estimate['totalLoadingCost'] = this.estimate['sqftLoadingCost'] * this.unitsTotal;
        // Add only Product cost and Tax for the Total 
        // Product cost inculdes loading, laying and transport data
        // All these 3 are in taxable calcualtion
        this.estimate['totalCost'] = this.estimate['totalProductCost'] + this.estimate['totalTax'];

        // this.estimate['totalCost'] = this.estimate['totalProductCost'] + this.estimate['totalTax'] + this.estimate['totalTransportCost'] + this.estimate['totalLoadingCost'] + this.estimate['sqftLayingCost'];
        //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
        //console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));
        break;
      }

      case "HOLLOW_BLOCK": {
        this.getCommonCosts();
        this.clearProductCosts();
        this.clearHBCosts();

        this.fullLoadOption = true;
        this.partialLoadOption = false;
        this.showTransportCost = false;
        this.transportPerKMCostHB = 60;

        this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
        this.estimate['partialLoad'] = this.estimate['unitsTotal'] % 700;
        if (this.estimate['partialLoad'] > 0) {
          this.partialLoadOption = true;
        }
        if (this.estimate['fullLoads'] == 0) {
          this.fullLoadOption = false;
        }
        // this.tax1 = Number(this.estimate['product']['product_TAX1']);
        // this.tax2 = Number(this.estimate['product']['product_TAX2']);
        // console.log(this.estimate['fullLoads']); //700*loads
        // console.log(this.estimate['partialLoad']); //partial load count
        // console.log(this.tax1);
        // console.log(this.tax2);
        // this.estimate['fullLoadsTax'] = (this.estimate['fullLoadsCost'] * (this.tax1 + this.tax2) / 100);
        // console.log(this.estimate['fullLoadsTax']);
        if (this.fullLoadOption) {
          this.estimate['fullLoadsCost'] = this.productPricePerUnit * 700;
          // console.log(this.estimate['fullLoadsCost']);
          // this.estimate['fullLoadsTax'] = (this.estimate['fullLoadsCost'] * (this.tax1) / 100)
          this.estimate['fullLoadsTax'] = (this.estimate['fullLoadsCost'] * (this.tax1 + this.tax2) / 100)
          // console.log(this.estimate['fullLoadsTax']);
          this.estimate['fullLoadsTransportCost'] = this.transportPerKMCostHB * this.distanceKM;
          // console.log(this.estimate['fullLoadsTransportCost']);
          this.estimate['fullLoadsTotalCost'] = (this.estimate['fullLoadsCost'] + this.estimate['fullLoadsTax'] + this.estimate['fullLoadsTransportCost']);
          // console.log(this.estimate['fullLoadsTotalCost']);

          this.fullLoadsCostSum = this.estimate['fullLoadsCost'] * this.estimate['fullLoads'];
          this.fullLoadsTaxSum = this.estimate['fullLoadsTax'] * this.estimate['fullLoads'];
          this.fullLoadsTransportCostSum = this.estimate['fullLoadsTransportCost'] * this.estimate['fullLoads'];
          this.fullLoadsTotalCostSum = this.estimate['fullLoadsTotalCost'] * this.estimate['fullLoads'];
        }
        if (this.partialLoadOption) {


          this.estimate['partialLoadCost'] = this.productPricePerUnit * this.estimate['partialLoad'];
          // this.estimate['partialLoadTax'] = this.estimate['partialLoadCost'] * ((this.tax1) / 100);
          this.estimate['partialLoadTax'] = this.estimate['partialLoadCost'] * ((this.tax1 + this.tax2) / 100);
          this.estimate['partialLoadTransportCost'] = this.transportPerKMCostHB * this.distanceKM;
          this.estimate['partialLoadTotalCost'] = this.estimate['partialLoadCost'] + this.estimate['partialLoadTax'] + this.estimate['partialLoadTransportCost'];
        }

        this.estimate['totalProductCost'] = this.fullLoadsCostSum + this.estimate['partialLoadCost'];
        //console.log(this.estimate['totalProductCost']);
        this.estimate['totalTax'] = this.fullLoadsTaxSum + this.estimate['partialLoadTax'];
        this.estimate['totalTransportCost'] = this.fullLoadsTransportCostSum + this.estimate['partialLoadTransportCost'];
        this.estimate['totalCost'] = this.estimate['totalProductCost'] + this.estimate['totalTax'] + this.estimate['totalTransportCost'];
        break;
      }
    }

    // switch (this.itemGroup) {
    //   case "QUARRY": {
    //     //console.log(this.transportPerKMCostUnit1 = 25);
    //     //console.log(this.transportPerKMCostUnit2 = 30);
    //     //console.log(this.transportPerKMCostUnit4 = 35);
    //     //console.log(this.transportPerKMCostUnit6 = 50);
    //     //console.log(this.estimate['unit1']);
    //     //console.log(this.estimate['unit2']);
    //     //console.log(this.estimate['unit4']);
    //     //console.log(this.estimate['unit6']);
    //     break;
    //   }
    //   case "DESIGNER_TILES": {
    //     this.transportPerKMCostTiles = 50;
    //     //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostTiles) / this.unitsTotal);
    //     //console.log(this.productCostPerSqFt = (this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt));

    //     this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 850);
    //     this.estimate['partialLoad'] = this.estimate['unitsTotal'] % 850;
    //     // this.estimate['partialLoad'] > 0;
    //     if (this.estimate['partialLoad'] > 0) {
    //       this.partialLoadOption = true;
    //     }

    //     break;
    //   }
    //   case "PAVER": {
    //     this.transportPerKMCostPavers = 50;
    //     this.paversLayingCost = 5.50; // Only for Pavers
    //     //console.log(this.transportCostPerSqFt = (this.distanceKM * this.transportPerKMCostPavers) / this.unitsTotal);
    //     //console.log(this.productCostPerSqFt = this.productPricePerUnit + this.loadingCostPerUnit + this.transportCostPerSqFt + this.loadingCostPerUnit);
    //     break;
    //   }
    //   case "HOLLOW_BLOCK": {
    //     this.transportPerKMCostHB = 60;
    //     //console.log(this.estimate['fullLoads']); //700*loads
    //     //console.log(this.estimate['partialLoad']); //partial load count
    //     break;
    //   }
    // }
    // if (this.itemGroup == "HOLLOW_BLOCK") {
    //   this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
    //   this.estimate['partialLoad'] = this.estimate['unitsTotal'] % 700;
    //   // this.estimate['partialLoad'] > 0;
    //   if (this.estimate['partialLoad'] > 0) {
    //     this.partialLoadOption = true;
    //   }
    // }
    // Price, Tax, Loading, Tax and Total Cost calc
    // //console.log('product_COST');
    // //console.log(this.estimate['product']['product_COST']);
    // this.productPricePerUnit = this.estimate['product']['product_COST'];
    // //console.log('loading_COST');
    // //console.log(this.estimate['product']['loading_COST']);
    // this.loadingCostPerUnit = this.estimate['product']['loading_COST'];
    // //console.log('distanceKM');
    // //console.log(this.estimate['distanceKM']);
    // this.transportPerKMCost = this.estimate['distanceKM'] * 25;
    // //console.log('product_TAX1');
    // //console.log(this.estimate['product']['product_TAX1']);
    // this.taxCost1 = this.estimate['product']['product_TAX1'] = 2.5;
    // //console.log('product_TAX2');
    // //console.log(this.estimate['product']['product_TAX2']);
    // this.taxCost2 = this.estimate['product']['product_TAX2'] = 2.5;

    // this.totalProductCost = this.productPricePerUnit * this.estimate['unitsTotal'];
    // //console.log('totalProductCost');
    // //console.log(this.totalProductCost);
    // this.totalTax = (this.taxCost1 / 100) * this.totalProductCost + (this.taxCost2 / 100) * this.totalProductCost;
    // // //console.log('totalTax');
    // // //console.log(totalTax);
    // this.totalLoadingCost = this.loadingCostPerUnit * this.estimate['unitsTotal'];
    // this.totalProductCost = this.totalProductCost + this.totalTax +
    //   + this.transportPerKMCost + this.totalLoadingCost;
    // //console.log('totalProductCost');
    // //console.log(this.totalProductCost);

    // if (this.itemGroup == "HOLLOW_BLOCK") {
    //   this.estimate['fullLoads'] = Math.floor(this.estimate['unitsTotal'] / 700);
    //   this.partialLoad = this.estimate['unitsTotal'] % 700;
    //   // this.estimate['partialLoad'] > 0;
    //   if (this.estimate['unitsTotal'] % 700 > 0) {
    //     this.partialLoadOption = true;
    //     this.estimate['partialLoad'] = 1;
    //   }
    // }
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
    this.authService.fetchProductDetailForGroup(product_group_id)
      .subscribe(
        (list: Product[]) => {
          // //console.log(list);
          this.products = list;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          // this.handleError(error.json().error);
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
      this.estimate['productGroup'] = this.itemGroup;
      // this.items1 = product;
    }
    // if (product_group_name == "101") {
    //   // //console.log("inside QUARRY Division");
    //   this.itemGroup = "CRUSHER / BUNKAR";
    //   // this.items1 = product;
    // }
    if (product_group_name == "103") {
      this.itemGroup = "HOLLOW_BLOCK";
      this.estimate['productGroup'] = this.itemGroup;
      // //console.log("inside HOLLOW_BLOCK Division");
      // //console.log(product);
      // //console.log(this.estimate['unitsTotal']);
      // this.items1 = product;
    }

    if (product_group_name == "102") {
      this.itemGroup = "DESIGNER_TILES";
      this.estimate['productGroup'] = this.itemGroup;
      // //console.log("inside PAVER Division");
      // //console.log(product);
      // this.items1 = product;
      // this.estimate['unit1'] = this.estimate['unit2'] = this.estimate['unit4'] = this.estimate['unit6'] = 0;
    }

    if (product_group_name == "104") {
      this.itemGroup = "PAVER";
      this.estimate['productGroup'] = this.itemGroup;
      // //console.log("inside PAVER Division");
      // //console.log(product);
      // this.items1 = product;
      // this.estimate['unit1'] = this.estimate['unit2'] = this.estimate['unit4'] = this.estimate['unit6'] = 0;
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
  estimateOrder(estimateForm) {
    // console.log(estimateForm.distanceKM);
    // console.log(this.estimate);
    this.estimate['salesRep'] = '100';
    this.estimate['salesRepName'] = 'Selva';
    switch (this.itemGroup) {
      case "QUARRY": {
        this.checkTotalUnitsMatch();
        if (this.totalUnitsCountValidation) {
          this.doEstimation();
          break;
        }
        else
          this.totalUnitsCountCheck();
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
    // if (this.itemGroup == "QUARRY") {
    //   if (this.totalUnitsCountValidation) {
    //     this.doEstimation();
    //   }
    //   else if (!this.totalUnitsCountValidation)
    //     this.totalUnitsCountCheck();
    // }
    // else if (this.itemGroup == "PAVER" || this.itemGroup == "DESIGNER_TILES" || this.itemGroup == "HOLLOW_BLOCK") {
    //   this.doEstimation();
    // }
    // estimateForm.reset();
    // this.estimate['customerName'] = this.customer['cust_Name'];
    // this.estimate['itemGroup'] = this.itemGroup;
    // this.estimate['itemGroupName'] = this.customer1['cust_Name']
    // this.estimate['orderDetails']['unit1'] = this.unit1;
    // this.estimate['orderDetails']['unit2'] = this.unit2;
    // this.estimate['orderDetails']['unit4'] = this.unit4;
    // this.estimate['orderDetails']['unit6'] = this.unit6;
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
          // //console.log(list);
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
    //       //console.log(this.products);
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

  private handleMessage(message: string) {
    const alert = this.alertCtrl.create({
      // title: 'Network Connection error!',
      subTitle: "Successfully submitted the Estimation...",
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      // title: 'Network Connection error!',
      subTitle: "Failed to submit the Estimation...",
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  isToggledTax: boolean = true;

  notifyTaxOption(event) {
    this.isToggledTax = !this.isToggledTax;
    // //console.log("Event: "+ event.checked); 
    //console.log("Toggled Tax: " + this.isToggledTax);
  }
  doEstimation() {
    // this.showLoader();
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
            //   // this.loading.dismiss();
          }
          else {
            // this.presentToast("error");
            // this.ngOnInit();
            this.handleError("error");
            //   // this.token = false;
            //   // // this.isAuthenticated = false;
            //   // localStorage.setItem('isAuthenticated', 'false');
            //   // this.loading.dismiss();
            //   // this.invalidLogin.emit(true);
          }
        },
        (error) => {
          // (error) => {
          // console.log(error.status);
          // this.handleError(error);
          this.handleError("error");
          // this.presentToast(error);
          // this.loading.dismiss();
        });
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
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
}