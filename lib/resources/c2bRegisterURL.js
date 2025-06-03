"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {C2BRegisterURLSchema}=require('./schema/C2BRegisterURLSchema');

let c2bRegisterURL=exports.c2bRegisterURL=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,C2BRegisterURLSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/c2b/v1/registerurl',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}