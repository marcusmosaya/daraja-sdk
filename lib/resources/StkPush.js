"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {StkPushSchema}=require('./schema/StkPushSchema');

let stkPush=exports.stkPush=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,StkPushSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/stkpush/v1/processrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}