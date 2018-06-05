export interface Customer {
    cust_ID: string;
    cust_TYPE: string;
    cust_NAME: string;
    cust_ADDRESS_ID: string;
    cust_PHONE1: string;
    cust_PHONE2: string;
    cust_EMAIL: string;
    gst_NUMBER: string;
    balance: string;
    cust_CRM_ID: string;
    locality_ID: string;
    reference_ID: string;
    site_CONTACT_NUMBER: string;
    site_ADDRESS_ID: string;
    site_ID: string;
}

export interface Site {
    cust_ID: string;
    site_ID: string;
    site_ADDRESS_ID: string;
    site_CONTACT_NUMBER: string;
    site_NAME: string;
}

export interface Reference {
    referer_ADDRESS: string;
    referer_MOBILE1: string;
    refrer_NAME: string;
    referer_MOBILE2: string;
    referer_EMAIL: string;
    referer_TYPE: string;
    reference_ID: string;
}