"use strict";
let utils=require('../utils');
let HttpClient=require('../HttpClient');
let {BillManagerUpdateOptInSchema,BillManagerOptInSchema,BillManagerCancelSingleInvoiceSchema,BillManagerReconsiliationSchema,BillManagerSingleInvoicingSchema}=require('./schema/BillManagerSchema');

let billManagerOptIn=exports.billManagerOptIn=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BillManagerOptInSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/billmanager-invoice/optin',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}

let billManagerSingleInvoicing=exports.billManagerSingleInvoicing=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BillManagerSingleInvoicingSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/billmanager-invoice/single-invoicing',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}
let billManagerUpdateOptIn=exports.billManagerUpdateOptIn=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BillManagerUpdateOptInSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/billmanager-invoice/change-optin-details',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}
let billManagerCancelSingleInvoice=exports.billManagerCancelSingleInvoice=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BillManagerCancelSingleInvoiceSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/billmanager-invoice/cancel-single-invoice',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}
let billManagerReconciliation=exports.billManagerReconciliation=async (payload,configuration,headers)=>{
    try {
        utils.validateSchema(payload,BillManagerReconsiliationSchema,configuration);
        let client_=new HttpClient(configuration);
        let response=await client_.post('/v1/billmanager-invoice/reconciliation',payload,headers);
        return response;
    } catch (error) {
        throw error;
    }

}