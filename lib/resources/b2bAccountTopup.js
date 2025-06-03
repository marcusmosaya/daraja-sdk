"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {B2CAccountTopUpSchema}=require('./schema/B2CAccountTopup');

let b2cAccountTopUp=exports.b2cAccountTopUp=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,B2CAccountTopUpSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/paymentrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}