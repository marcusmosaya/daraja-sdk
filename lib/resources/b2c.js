"use strict";
let HttpClient=require('../HttpClient');
let b2cPaymentrequest=exports.b2cPaymentrequest=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2c/v3/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}