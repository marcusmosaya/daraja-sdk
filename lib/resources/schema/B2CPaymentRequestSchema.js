"use strict";
let utils=require('../../utils')
let B2CPaymentRequsetSchema=exports.B2CPaymentRequsetSchema={
    OriginatorConversationID:{
        type:'string',
        required:true
    },
    InitiatorName:{
        type:'string',
        required:true
    },
    SecurityCredential:{
        type:'string',
        required:true
    },
    CommandID:{
        type:'string',
        required:true,
        allowed:['SalaryPayment','BusinessPayment','PromotionPayment']
    },
    Amount:{
    type:'number',
    required:true,
    custom:[utils.isInteger,utils.isNonNegativeOrZero]     
    },
    PartyA:{
        type:'number',
        required:true,
        custom:[utils.isBusinessShortCode]
    },
    PartyB:{
        type:'number',
        required:true,
        custom:[utils.isMobileNumber]
    },
    Remarks:{
        type:'string',
        required:true,
        maxLength:100
    },
    QueueTimeOutURL:{
        type:'url',
        required:true,
    },
    ResultURL:{
        type:'url',
        required:true
    },
    occasion:{
        type:'string',
        required:true,
        maxLength:100
    }
}