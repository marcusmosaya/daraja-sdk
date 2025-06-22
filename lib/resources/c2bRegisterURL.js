"use strict";
let HttpClient=require('../HttpClient');

let c2bRegisterURL=exports.c2bRegisterURL=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/c2b/v1/registerurl',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}