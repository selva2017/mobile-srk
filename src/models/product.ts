export interface Product {
    company_ID: string;
    from_UNIT: string;
    from_UNIT_TYPE: string;
    loading_COST: string;
    product_CODE: string;
    product_COST: string;
    product_COST_ID: string;
    product_GROUP_ID: string;
    product_ID: string;
    product_NAME: string;
    product_TAX1: string;
    product_TAX2: string;
    product_UNIT_CONV_ID: string;
    to_UNIT: string;
    to_UNIT_TYPE: string;
    uom: string;
    uom_ID: string;
    productDetails: [
      {
        product_ID: string;
        product_DETAIL_ID: string;
        product_DETAIL_NAME: string;
      }
    ]
  }