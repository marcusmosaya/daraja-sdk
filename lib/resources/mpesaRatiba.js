"use strict";
let HttpClient=require('../HttpClient');
let ratiba=exports.ratiba=async (payload,configuration,headers)=>{
    try {
        let client_=new HttpClient(configuration);
        let response=await client_.post('/standingorder/v1/createStandingOrderExternal',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}