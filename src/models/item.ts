export interface Item {

    division_ID: string;
    division_NAME: string;
    productGroups: [
        {
            division_ID: string;
            product_GROUP_ID: string;
            product_GROUP_NAME: string;
            products: [
                {
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
            ]
        }
    ];
    // productGroups: [
    //     {
    //         products: [
    //             {
    //                 productDetails: [
    //                     {
    //                         product_ID: string;
    //                         product_DETAIL_ID: string;
    //                         product_DETAIL_NAME: string;
    //                     }
    //                 ],
    //                 // productDetails: string;
    //                 product_GROUP_ID: string;
    //                 product_ID: string;
    //                 product_NAME: string;
    //                 product_CODE: string;
    //                 company_ID: string;
    //                 product_COST_ID: string;
    //                 loading_COST: string;
    //                 product_UNIT_CONV_ID: string;
    //                 from_UNIT: string;
    //                 from_UNIT_TYPE: string;
    //                 to_UNIT: string;
    //                 to_UNIT_TYPE: string;
    //                 uom_ID: string;
    //                 uom: string;
    //                 product_COST: string;
    //                 product_TAX1: string;
    //                 product_TAX2: string;
    //             }
    //         ],
    //         product_GROUP_ID: string;
    //         division_ID: string;
    //         product_GROUP_NAME: string;
    //     },
    //     {
    //         products: string;
    //         product_GROUP_ID: string;
    //         division_ID: string;
    //         product_GROUP_NAME: string;
    //     }
    // ]
}