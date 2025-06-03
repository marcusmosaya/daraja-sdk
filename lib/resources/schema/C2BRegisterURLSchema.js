"use strict";
let utils=require('../../utils')
let C2BRegisterURLSchema=exports.C2BRegisterURLSchema={
    ShortCode:{
        type:'number',
        required:true
    },
    ResponseType:{
        type:'string',
        required:true,
        allowed:['Completed','Cancelled']
    },
    ConfirmationURL:{
        type:'url',
        required:true,
    },
    ValidationURL:{
        type:'url',
        required:true,
    }
}