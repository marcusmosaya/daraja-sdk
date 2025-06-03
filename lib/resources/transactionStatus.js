"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let TransactionStatusSchema=require('./schema/TransactionStatusSchema');

let transactionStatus=exports.transactionStatus=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,TransactionStatusSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/transactionstatus/v1/query',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}