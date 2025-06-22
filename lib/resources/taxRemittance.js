"use strict";
let HttpClient=require('../HttpClient');
let taxRemittance=exports.taxRemittance=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/remittax',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}