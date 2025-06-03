"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {MPesaRatibaSchema}=require('./schema/MpesaRatibaSchema');

let ratiba=exports.ratiba=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,MPesaRatibaSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/standingorder/v1/createStandingOrderExternal',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}