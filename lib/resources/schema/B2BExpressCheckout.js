"use strict";
let utils=require('../../utils')
let B2BExpressCheckoutSchema=exports.B2BExpressCheckoutSchema={
    primaryShortCode:{
        type:'number',
        required:true,
        custom:[utils.isBusinessShortCode]
    },
    receiverShortCode:{
        type:'number',
        required:true,
        custom:[utils.isBusinessShortCode]
    },
    amount:{
        type:'number',
        required:true,
        custom:[utils.isNonNegativeOrZero]
    },
    paymentRef:{
        type:'string',
        required:true,
    },
    callbackUrl:{
        type:'url',
        required:true,
    },
    partnerName:{
        type:'string',
        required:true
    },
    RequestRefId:{
        type:'string',
        required:true
    },
}
