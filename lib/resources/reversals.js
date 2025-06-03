"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let ReversalsSchema=require('./schema/ReversalsSchema');

let reverse=exports.reverse=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,ReversalsSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/reversal/v1/request',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}