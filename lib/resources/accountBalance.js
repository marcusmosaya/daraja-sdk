"use strict";
let HttpClient=require('../HttpClient');
let accountBalance=exports.accountBalance=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/accountbalance/v1/query',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}