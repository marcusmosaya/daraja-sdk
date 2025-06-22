"use strict";
let HttpClient=require('../HttpClient');
let b2bExpressCheckout=exports.b2bExpressCheckout=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/ussdpush/get-msisdn',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}