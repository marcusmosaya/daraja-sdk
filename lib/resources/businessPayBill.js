"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {BusinessPayBillSchema}=require('./schema/BusinessPayBillSchema');

let businessPayBill=exports.businessPayBill=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BusinessPayBillSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}