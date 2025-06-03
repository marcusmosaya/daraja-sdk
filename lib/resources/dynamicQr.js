"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {DynamicQrCodeSchema}=require('./schema/DynamicQrcodeSchema');

let dynamicQr=exports.dynamicQr=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,DynamicQrCodeSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/qrcode/v1/generate',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}

