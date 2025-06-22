"use strict";
let HttpClient=require('../HttpClient');
let dynamicQr=exports.dynamicQr=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/qrcode/v1/generate',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}

