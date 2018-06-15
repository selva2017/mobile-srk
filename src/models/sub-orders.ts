export interface SubOrders {
    productDetails: string;
    uom_ID: string;
    unit_TYPE: string;
    unit: string;
    order_PRODUCT_COST: string;
    order_TAX1: string;
    order_TAX2: string;
    order_LOADING_COST: string;
    order_LAYING_COST: string;
    order_TRANSPORT_COST: string;
    order_TOTAL_COST: string;
    sub_ORDER_STATUS: string; OPEN,
    sub_ORDER_MODIFIED_DT: string;
    sub_ORDER_MODIFIED_BY: string;
    loading_TYPE: string;
    sale_DATE: string;
    order_GROUP_NO: string;
    order_NO: string;
    weight: string;
    orderDetails: [
        {
            order_NO: string;
            order_DETAIL_ID: string;
            name: string;
            quantity: string;
        }
    ]
}
