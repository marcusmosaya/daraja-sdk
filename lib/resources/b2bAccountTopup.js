"use strict";
let HttpClient=require('../HttpClient');
let b2cAccountTopUp=exports.b2cAccountTopUp=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}