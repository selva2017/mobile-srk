import { Product } from './../../models/product';
import { Customer, Reference, Site } from './../../models/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from './../../providers/auth-service/auth-service';
import { Orders } from '../../models/orders';
import { SubOrders } from '../../models/sub-orders';

@IonicPage()
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html',
})
export class PricingPage {
  // items = [];
  loading: any;
  orders: Orders[] = [];
  estimatedOrders: Orders[] = [];
  approvedOrders: Orders[] = [];
  rejectedOrders: Orders[] = [];
  loading_complete: boolean;
  category: string;
  estimate = {
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
    // highPriority: ''//to be added when priority is added as a field in db
    // unit1TaxSum: 0,
    // unit1TotalCostSum: 0,
    // unit1LoadingCostSum: 0,
    // unitlTransportCostSum: 0,
  }
  
  constructor(public nav: NavController, private loadingCtrl: LoadingController,
    private authService: AuthService, private alertCtrl: AlertController,
    params: NavParams) {
    // this.subOrders = params.data.item;
    // console.log("Su Order")
    // console.log(this.subOrders);
  }
  role: string;

  ionViewDidEnter() {

  }
  customers: Customer[];
  
  prepareNewPricing(){
    this.authService.fetchCustomerData()
    .subscribe(
      (list: Customer[]) => {
        console.log(list);
        this.customers = list;
        // this.loading.dismiss();
      },
      error => {
        // this.loading.dismiss();
        this.handleError(error.json().error);
      }
    );
  }
  references: Reference[] = [];
  sites: Site[] = [];
  
  onSelectCustomer(customer_id, customer_name) {
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
    this.estimate['siteName'] = site_name;
  }
  onSelectReference1(reference_name) {
    this.estimate['referral1Name'] = reference_name;
  }
  onSelectReference2(reference_name) {
    this.estimate['referral2Name'] = reference_name;
  }
  clearAllData() {
    // this.disableSiteName = true;
    // this.disableItemName = true;
    // this.totalSqFtCount = 0;
    // this.estimate['product'] = '';
    // // this.clearHBCosts();
    // // estimateForm.distanceKM.value = 0;
    // this.estimate['distanceKM'] = '';
    // this.distanceReadOnly = false;
    // this.estimate['unitsTotal'] = '';
    // this.estimate['transportPerKMCost'] = 0;
    // this.estimate['totalProductCost'] = 0;
    // this.estimate['totalTax'] = 0;
    // this.estimate['totalLoadingCost'] = 0;
    // this.estimate['totalTransportCost'] = 0;
    // this.estimate['totalCost'] = 0;
    // this.productPricePerUnit = 0;
    // this.loadingCostPerUnit = 0;
    // // this.estimate['product']['product_COST'] = 0;
    // // this.estimate['product']['loading_COST'] = 0;
    // this.clearProductCosts();
    // this.clearDropdown();
    // this.selectedProduct = [];
    // this.itemGroup = '';
    // this.estimate['partialLoad'] = 0;
    // this.estimate['fullLoads'] = 0;
    // this.showCostSummary = false
  }

  clearDropdown() {
    this.estimate['customerID'] = '';
    this.estimate['siteID'] = '';
    this.estimate['reference1'] = '';
    this.estimate['reference2'] = '';
    this.estimate['productGroupName'] = '';
    this.estimate['product'] = '';
  }

  clearProductCosts() {
    // // this.estimate['unitsTotal'] = 0;
    // this.estimate['unit1'] = 0;
    // this.unit1Total = 0;
    // this.estimate['unit2'] = 0;
    // this.unit2Total = 0;
    // this.estimate['unit4'] = 0;
    // this.unit4Total = 0;
    // this.estimate['unit6'] = 0;
    // this.unit6Total = 0;
    // this.estimate['totalProductCost'] = 0;
    // this.estimate['totalTax'] = 0;
    // this.estimate['totalLoadingCost'] = 0;
    // this.estimate['totalTransportCost'] = 0;
    // this.estimate['totalCost'] = 0;
    // this.unitSumTotal = 0;
    // // this.estimate['product']['product_COST'] = '';
    // // this.estimate['product']['loading_COST'] = '';
  }
  clearHBCosts() {
    // this.estimate['fullLoadsCost'] = 0;
    // this.estimate['fullLoadsTax'] = 0;
    // this.estimate['fullLoadsTransportCost'] = 0;
    // this.estimate['fullLoadsTotalCost'] = 0;
    // this.fullLoadsCostSum = 0;
    // this.fullLoadsTaxSum = 0;
    // this.fullLoadsTransportCostSum = 0;
    // this.fullLoadsTotalCostSum = 0;
    // this.estimate['partialLoadCost'] = 0;
    // this.estimate['partialLoadTax'] = 0;
    // this.estimate['partialLoadTransportCost'] = 0;
    // this.estimate['partialLoadTotalCost'] = 0;
  }
  onItemNameChange(product: Product[], uom) {
    // // //console.log("customer");
    // // //console.log(product);
    // this.estimate['unitsTotal'] = '';
    // this.totalSqFtCount = 0;
    // this.productPricePerUnit = 0;
    // this.loadingCostPerUnit = 0;
    // this.clearProductCosts();
    // this.selectedProduct = product;
    // this.uom = uom;
    // this.showCostSummary = true;
    // //console.log(this.selectedProduct);
    // // console.log(this.estimate);
    // // this.uom = this.estimate['product']['uom'];
  }
  productPricePerUnit: number = 0;
  loadingCostPerUnit: number = 0;
  products: Product[] = [];
  disableSiteName: boolean = true;
  disableItemName: boolean = true;
  itemGroup: string;
  
  onItemGroupChange(product: Product[], product_group_id, product_group_name) {
    this.clearProductCosts();
    this.estimate['distanceKM'] = '';
    // this.distanceReadOnly = false;
    this.estimate['unitsTotal'] = '';
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
  ngOnInit() {
    // this.showLoader();
    this.role = localStorage.getItem('role');
    if (this.role == '1' || this.role == '2') {
      this.prepareNewPricing();
      // this.retrieveAllEstimatedOrders();
    }
    else if (this.role == '3') {
      this.prepareNewPricing();
      // this.retrieveEstimatedOrders();
    }
    this.category = "estimate";
  }
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });

    this.loading.present();
  }

  openNavDetailsPage(item, test) {
    this.nav.push(PricingDetailsPage, { item: item, test });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Network Connection error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
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
  retrieveApprovedOrders() {
    this.showLoader("Collecting Approved Orders....");
    this.approvedOrders = [];
    this.authService.fetchOrderByStatus("APPROVED")
      .subscribe(
        (list: Orders[]) => {
          this.approvedOrders = list;
          // console.log(this.approvedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }
  retrieveAllApprovedOrders() {
    this.showLoader("Collecting Approved Orders....");
    this.approvedOrders = [];
    this.authService.fetchAllOrderByStatus("APPROVED")
      .subscribe(
        (list: Orders[]) => {
          this.approvedOrders = list;
          // console.log(this.approvedOrders);
          // this.loading_complete = true;
          this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          this.handleError(error.json().error);
        }
      );
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
  doRefreshEstimated(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllEstimatedOrders();
    }
    else if (this.role == '3') {
      this.retrieveEstimatedOrders();
    }
    refresher.complete();
  }
  doRefreshApproved(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllApprovedOrders();
    }
    else if (this.role == '3') {
      this.retrieveApprovedOrders();
    }
    refresher.complete();
  }
  doRefreshRejected(refresher) {
    if (this.role == '1' || this.role == '2') {
      this.retrieveAllRejectedOrders();
    }
    else if (this.role == '3') {
      this.retrieveRejectedOrders();
    }
    refresher.complete();
  }

  displayDecimalINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number) {
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }
}
@Component({
  templateUrl: 'pricing-details.html',
})
export class PricingDetailsPage {
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
    this.showLoader("Collecting Order Details....");
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
    // this.nav.push(PricingPage, { item: this.subOrder });
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
    // console.log(order_GROUP_NO);
    this.showLoader("Collecting Rejected Orders...");
    this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "REJECTED")
      .subscribe(
        (success) => {
          this.nav.pop();
          this.nav.push(PricingPage);
          // this.refreshList();
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
  }
  approveOrder(order_GROUP_NO) {
    // console.log(order_GROUP_NO);
    this.showLoader("Collecting Approved Orders....");
    this.authService.updateStatusOfGroupOrder(order_GROUP_NO, "APPROVED")
      .subscribe(
        (success) => {
          // this.refreshList();
          this.nav.pop();
          this.nav.push(PricingPage);
          this.loading.dismiss();
        },
        (error) => console.log(error)
      );
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
}