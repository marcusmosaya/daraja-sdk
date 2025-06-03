"use strict";
let utils=require('../../utils')
let DynamicQrCodeSchema=exports.DynamicQrCodeSchema={
        MerchantName:{
            type:'string',
            required:true,  
        },
        RefNo:{
            type:'string',
            required:true
        },
        Amount:{
            type:'number',
            required:true,
            custom:[utils.isInteger,utils.isNonNegativeOrZero]
        },
        TrxCode:{
            type:'string',
            required:true,
            allowed:['BG','WA','PB','SM','SB']
        },
        CPI:{
            required:true,
            type:'string',
            custom:[utils.isCPI]
        },
        Size:{
            required:true,
            type:'string',
            custom:[utils.isNonNegativeOrZero]
        }
    }