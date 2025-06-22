"use strict";
let HttpClient=require('../HttpClient');
let reverse=exports.reverse=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/reversal/v1/request',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}