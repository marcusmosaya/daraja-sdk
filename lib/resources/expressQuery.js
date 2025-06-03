"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {ExpressQuerySchema}=require('./schema/ExpressQuerySchema');

let expressQuery=exports.expressQuery=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,ExpressQuerySchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/stkpushquery/v1/query',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}