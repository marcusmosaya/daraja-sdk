"use strict";
let HttpClient=require('../HttpClient');

let businessPayBill=exports.businessPayBill=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}