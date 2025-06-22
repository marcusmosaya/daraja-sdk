"use strict";
let HttpClient=require('../HttpClient');
let stkPush=exports.stkPush=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/stkpush/v1/processrequest',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}