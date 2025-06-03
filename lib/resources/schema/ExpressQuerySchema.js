"use strict";
let utils=require('../../utils')
let ExpressQuerySchema=exports.ExpressQuerySchema={
   BusinessShortCode:{
       required:true,
       type:'number',
       custom:[utils.isBusinessShortCode]
    },
    Password:{
        type:'string',
    },
    Timestamp:{
        type:'timestamp',
    },
    CheckoutRequestID:{
        type:'string',
        required:true
    }
}
