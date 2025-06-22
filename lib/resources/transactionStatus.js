"use strict";
let HttpClient=require('../HttpClient');
let transactionStatus=exports.transactionStatus=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/transactionstatus/v1/query',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}