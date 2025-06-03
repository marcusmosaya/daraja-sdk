"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {B2CPaymentRequsetSchema}=require('./schema/B2CPaymentRequestSchema');

let b2cPaymentrequest=exports.b2cPaymentrequest=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,B2CPaymentRequsetSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2c/v3/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}