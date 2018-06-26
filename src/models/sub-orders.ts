export interface SubOrders {
    subOrders: string;
    site_ID: string;
    cust_ID: string;
    site_NAME: string;
    sales_REP_ID: string;
    refrerel1_ID: string;
    referrel2_ID: string;
    product_ID: string;
    product_GROUP: string;
    delivery_DISTANCE: string;
    total_ORDER_UNIT: string;
    taxable_STATUS: string;
    product_UNIT_COST: string;
    tax1: string;
    tax2: string;
    loading_UNIT_COST: string;
    transport_KM_COST: string;
    laying_COST: string;
    sqft_LOADING_COST: string;
    sqft_LAYING_COST: string;
    sqft_TRANSPORT_COST: string;
    sqft_UNIT_COST: string;
    total_PRODUCT_COST: string;
    total_TAX1: string;
    total_TAX2: string;
    total_LOADING_COST: string;
    total_TRANSPORT_COST: string;
    total_LAYING_COST: string;
    total_COST: string;
    order_STATUS: string;
    uom_ID: string;
    status_FLAG: string;
    note: string;
    order_CREATED_BY: string;
    product_NAME: string;
    customer_NAME: string;
    sales_REP_NAME: string;
    refrerel1_NAME: string;
    refrerel2_NAME: string;
    uom: string; 
    order_GROUP_NO: string;
    order_DT: string;
    order_CREATED_DT: string;
    order_MODIFIED_DT: string;
}

export interface vehicleList {
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