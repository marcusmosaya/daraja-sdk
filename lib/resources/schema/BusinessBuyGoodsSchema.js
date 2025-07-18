"use strict";
let utils=require('../../utils')
let BusinessBuyGoodsSchema=exports.BusinessBuyGoodsSchema={
    CommandID:{
        type:'string',
        constant:'BusinessBuyGoods'
    },
    Initiator:{
        type:'string',
        required:true,
    },
    SecurityCredential:{
        type:'string',
        required:true
    },
    PartyA:{
        type:'number',
        required:true,
        custom:[utils.isBusinessShortCode]
    },
    SenderIdentifierType:{
        type:'number',
        constant:4
    },
    PartyB:{
        type:'number',
        required:true,
        custom:[utils.isBusinessShortCode]
    },
    RecieverIdentifierType:{
        type:'number',
        constant:4
    },
    Requester:{
        type:'number',
        custom:[utils.isMobileNumber]
    },
    Amount:{
        type:'number',
        required:true,
        custom:[utils.isNonNegativeOrZero]
    },
    AccountReference:{
        type:'string',
        required:true,
        maxLength:13
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
        required:true,
    },
    Occassion:{
        type:'string',
        required:true,
        maxLength:100
    }
}