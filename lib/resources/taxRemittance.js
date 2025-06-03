"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {TaxRemittanceSchema}=require('./schema/TaxRemmitanceSchema');

let taxRemittance=exports.taxRemittance=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,TaxRemittanceSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/mpesa/b2b/v1/remittax',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}