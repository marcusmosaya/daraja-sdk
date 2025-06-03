"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {AccountBalanceSchema}=require('./schema/AccountBalanceSchema');

let accountBalance=exports.accountBalance=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,AccountBalanceSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/accountbalance/v1/query',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}