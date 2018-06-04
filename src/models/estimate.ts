export interface Estimate {
    customerName: string;
    itemGroup: string;
    siteName: string;
    reference1: string;
    reference2: string;
    itemGroupName: string;
    itemName: string;
    unitsTotal: string;
    distanceKM: string;
    orderDetails: [
        {
            unit1: string;
            unit2: string;
            unit4: string;
            unit6: string;
        }];
    fullLoads: string;
    partialLoad: string;
}