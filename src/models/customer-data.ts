export interface CustomerData {
    sales_REP_ID: string;
    site_ID: string;
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
    site_ADDRESS_ID: string;
    site_CONTACT_NUMBER: string;
    site_NAME: string;
    business_CUSTOMER: string;
    alias: string;
    address: {
        addressId: string;
        address: string;
        address2: string;
        city: string;
        district: string;
        state: string;
        pinCode: string;
        longitude: string;
        latitude: string;
    } ,
    reference: {
        reference_ID: string;
        refrer_NAME: string;
        referer_ADDRESS: string;
        referer_MOBILE1: string;
        referer_MOBILE2: string;
        referer_EMAIL: string;
        referer_TYPE: string;
    } ,
    site: {
        cust_ID: string;
        site_ID: string;
        site_ADDRESS_ID: string;
        site_CONTACT_NUMBER: string;
        site_NAME: string;
        address: {
            addressId: string;
            address: string;
            address2: string;
            city: string;
            district: string;
            pinCode: string;
            longitude: string;
            latitude: string;
        }
    }, 
    customerEnquiry: {
        enquiryId: string;
        custId: string;
        enquiryDate: string;
        purposeOfVisit: string;
        meetingNotes: string;
        nextFollowUpDate: string;
        siteStatus: string;
        materialRequest: string;
        remark: string;
        status: string;
        reviewedBy: string;
        closedDate: string;
        createdBy: string;
    }
}

export interface CustomerMeeting {
    enquiryId: string;
    siteName: string;
    custId: string;
    enquiryDate: string;
    purposeOfVisit: string;
    meetingNotes: string;
    nextFollowUpDate: string;
    siteStatus: string;
    materialRequest: string;
    remark: string;
    status: string;
    reviewedBy: string;
    closedDate: string;
    createdBy: string;
}
export interface AddCustomerMeeting {
    enquiryId: string;
    custId: string;
    enquiryDate: string;
    purposeOfVisit: string;
    meetingNotes: string;
    nextFollowUpDate: string;
    siteStatus: string;
    materialRequest: string;
    remark: string;
    status: string;
    reviewedBy: string;
    closedDate: string;
    createdBy: string;
}

export interface CustomerMaster {
    address: {
        address: string;
        address2: string;
        addressId: string;
        city: string;
        district: string;
        latitude: string;
        longitude: string;
        pinCode: string;
        state: string;
    }
    alias: string;
    balance: string;
    business_CUSTOMER: string;
    cust_ADDRESS_ID: string;
    cust_CRM_ID: string;
    cust_EMAIL: string;
    cust_ID: string;
    cust_NAME: string;
    cust_PHONE1: string;
    cust_PHONE2: string;
    cust_TYPE: string;
    customerEnquiry: string;
    gst_NUMBER: string;
    localities: string;
    locality_ID: string;
    reference: string;
    reference_ID: string;
    sales_REP_ID: string;
    site: string;
    site_ADDRESS_ID: string;
    site_CONTACT_NUMBER: string;
    site_ID: string;
    site_NAME: string;
}

//Not used and created in component
export interface Site {
    cust_ID: string;
    site_ID: string;
    site_ADDRESS_ID: string;
    site_CONTACT_NUMBER: string;
    site_NAME:  string;
    address: {
        addressId:  string;
        address: string;
        city:  string;
        district: string;
        pinCode:  string;
        state:  string;
        address2: string;
        longitude: string;
        latitude:  string;
    }
}