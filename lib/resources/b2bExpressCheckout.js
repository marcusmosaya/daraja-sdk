"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {B2BExpressCheckoutSchema}=require('./schema/B2BExpressCheckout');

let b2bExpressCheckout=exports.b2bExpressCheckout=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,B2BExpressCheckoutSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/ussdpush/get-msisdn',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}