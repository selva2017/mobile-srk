export interface SubOrders {
    customer_NAME: string, 
    loading_TYPE: string, 
    orderDetails: string, 
    order_GROUP_NO: string, 
    order_LAYING_COST: string, 
    order_LOADING_COST: string,
    order_NO: string, 
    order_PRODUCT_COST: string, 
    order_TAX1: string, 
    order_TAX2: string, 
    order_TOTAL_COST: string,
    order_TRANSPORT_COST: string, 
    ordered_CREATED_BY: string, 
    productDetails: string, 
    product_NAME: string, 
    sale_DATE: string, 
    site_NAME: string, 
    sub_ORDER_MODIFIED_BY: string, 
    sub_ORDER_MODIFIED_DT: string, 
    sub_ORDER_STATUS: string, 
    unit: string, 
    unit_TYPE: string, 
    uom_ID: string, 
    weight: string
}

export interface VehicleList {
    vehicle_ID: string,
    vehicle_TYPE: string,
    vehicle_NAME: string,
    vehicle_CAPACITY: string
}
export interface Employee {
    employeeId: string,
    jobTitleName: string,
    firstName: string,
    lastName: string,
    preferredFullName: string,
    employeeCode: string,
    region: string,
    phoneNumber: string,
    emailAddress: string
}
export interface MachineList {
    machine_ID,
    machine_TYPE,
    machine_NAME,
    machine_CAPACITY,
  }
  export interface YardList {
    yard_ID,
    yard_TYPE,
    yard_NAME,
    yard_CAPACITY,
  }