
const AuthClient=require('./AuthClient');
let {isValidPayload}=require('./utils');
class DarajaSDK {
        /**
         * Initializes the DarajaSDK
         * 
         * The initial configurations
         * 
         * {
         * 
         *          consumerKey:{
                    required:true,
                    type:'string',
                    },
                    consumerSecret:{
                    required:true,
                    type:'string',
                    },
                    passKey:{
                    type:'string',  //The passkey is required in the configuration for the stk push service.
                    },
                    shortCode:{
                    type:'number'
                    },
                    mode:{
                    type:'string',
                    allowed:['sandbox','live'],
                    default:'sandbox'
                    }
         * }
         */
    constructor(config) {
        if(!config.consumerKey){
            throw new Error(`A DarajaSDK instance should have a 'consumer key' for the purpose of authentication and authorization.`);
        }
        if(!config.consumerSecret){
            throw new Error(`A DarajaSDK instance should at have a 'consumer secret' for the purpose of authentication and authorization.`);
        }
        let nodeVersion=process.version
        const versionParts = nodeVersion.substring(1).split('.').map(Number);
        let requiredVersion=versionParts[0];
        if(requiredVersion<19){
            throw new Error(`The nodejs version ${nodeVersion} may be incompatible or fail to work please upgrade the version to at least version 19.0.0`);
        }
        /**
         * The initial configurations
         * 
         * {
         * 
         *          consumerKey:{
                    required:true,
                    type:'string',
         *         },
                    consumerSecret:{
                    required:true,
                    type:'string',
                    },
                    passKey:{
                    type:'string',
                    },
                    shortCode:{
                    type:'number'
                    },
                    mode:{
                    type:'string',
                    allowed:['sandbox','live'],
                    default:'sandbox'
                    }
         * }
         */
        this.config={
                    ConsumerKey:config.consumerKey,
                    ConsumerSecret:config.consumerSecret,
                    PassKey:config.PassKey,
                    ShortCode:config.ShortCode,
                    mode:config.mode
                }
        this.authClient = new AuthClient(this.config);
    }

    /**
     * Fetches the access token
     * Automatically refreshes the token if needed.
     * @returns {Promise<Object>} - An object containing the Authorization header.
     */
    async _getAuthorizedHeaders() {
        try{
        const token = await this.authClient.getAccessToken();
        return { 'Authorization': `Bearer ${token}`,'Content-Type':'Application/json'};
        }catch(error){
            throw error;
        }
    }
    /**
     * To send a payment prompt to your customer's M-PESA registered phone number requesting them to authorize and complete payment.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * BusinessShortCode:{
     * 
            required:true,
            type:'number',
         },
         Password:{
     *
             type:'string',
         },
         Timestamp:{
     *
             type:'timestamp',
         },
         TransactionType:{
     *
             required:true,
             type:'string',
         },
         Amount:{
     *
             type:'number',
             required:true,
         },
         PartyA:{
     *
             type:'number',
             required:true,
         },
         PartyB:{
     *
             type:'number',
             required:true,
         },
         PhoneNumber:{
     *
             type:'number',
             required:true,
         },
         CallBackURL:{
     *
             type:'url',
             required:true,
         },
         AccountReference:{
     *
             type:'string',
             required:true,
             maxLength:12
     
         },
         TransactionDesc:{
     *
             type:'string',
             required:true,
             maxLength:13
         }
     * @returns {Object}
     * @throws {Error}
     */
    async stkPush(payload){
        try{
            isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {stkPush}=require('./resources/StkPush')
        return stkPush(payload,this.config,headers);
        }catch(error){
            throw error;
        }

    }
    /**
     * To initiate USSD Push to till enabling their fellow merchants to pay from their own till numbers to the vendor's paybill.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *                   primaryShortCode:{
                         type:'number',
                         required:true,
                        },
                         receiverShortCode:{
                         type:'number',
                         required:true,
                        },
                         amount:{
                         type:'number',
                         required:true,
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
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async b2bExpressCheckout(payload){
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {b2bExpressCheckout}=require('./resources/b2bExpressCheckout')
        return b2bExpressCheckout(payload,this.config,headers);
    }
    /**
     * To make payments from Business to Customers(Pay outs).Used in several scenarios by businesses that require to either make Salary Payments,Cashback Payments,Promotional Payments,Winnings,Financial Institutions
     *  @param {Object} [payload] The payload should have the following schema
     *  @PayloadSchema
     * {
     * 
     *                OriginatorConversationID:{
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
                    },
                      PartyA:{
                      type:'number',
                      required:true,
                    },
                      PartyB:{
                      type:'number',
                      required:true,
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
     * @returns {Object}
     * @throws {Error}
     */
    async b2cPaymentRequest(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {b2cPaymentrequest}=require('./resources/b2c');
        return b2cPaymentrequest(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To opt you as a biller to safaricom's bill manager features.Once intergrated to the service and send arequset with a success response,your shortcode is whitelisted and you are able to intergrate with the remaining bill manager services.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *               shortcode:{
                     type:'number',
                     required:true,
                    },
                     email:{
                     type:'string',
                     required:true,
                    },
                     officialContact:{
                     type:'string',
                     required:true,
                    },
                     sendReminders:{
                     type:'number',
                     required:true,
                     allowed:[0,1]
                    },
                     logo:{
                     type:'url',
                     required:true
                    },
                     callBackURL:{
                     type:'url',
                     required:true,
                    }
     * } 
     * @returns {Object}
     * @throws {Error}
     */
    async billManagerOptIn(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {billManagerOptIn}=require('./resources/billManager')
        return billManagerOptIn(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To send out customizedindividual e-invoices.Customers receive this notification(s) via an SMS to the Safaricom Phone number specified while creating the invoice.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *               externalReference:{
                     type:'string',
                     required:true,
                    },
                     billedFullName:{
                     type:'string',
                     required:true
                    },
                     billedPhoneNumber:{
                     type:'string',
                     required:true
                    },
                     billedPeriod:{
                     type:'string',
                     required:true,
                    },
                     invoiceName:{
                     type:'string',
                     required:true
                    },
                     dueDate:{
                     type:'string',
                     required:true,
                    },
                      accountReference:{
                      type:'string',
                      required:true
                    },
                      amount:{
                      type:'number',
                      required:true,
                    },
                      invoiceItems:{
                      type:'array',
                      children:{
                                 name:{
                                 type:'string',
                                 required:true
                                },
                                 amount:{
                                 type:'number',
                                 required:true
                                }
                      }
                    }
     * } 
     * @returns {Object}
     * @throws {Error}
     */
    async billManagerSingleInvoicing(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {billManagerSingleInvoicing}=require('./resources/billManager')
        return billManagerSingleInvoicing(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To update opt-in details
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     *     
     *               shortcode:{
                     type:'number',
                     required:true,
                    },
                     email:{
                     type:'string',
                     required:true,
                    },
                     officialContact:{
                     type:'string',
                     required:true,
                    },
                     sendReminders:{
                     type:'string',
                     required:true,
                     allowed:['0','1']
                    },
                     logo:{
                     type:'url',
                    },
                     callbackUrl:{
                     type:'url',
                     required:true,
                    }
     * } 
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async billManagerUpdateOptIn(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {billManagerUpdateOptIn}=require('./resources/billManager')
        return billManagerUpdateOptIn(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To recall a sent invoice.The invoice will cease to exist and cannot be used as a reference to a payment. 
     * @param {Object} [payload] The payload should have the following schema
     * @payloadSchema
     * {
     * 
     *                  externalReference:{
                        type:'string',
                        required:true
                       }
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async billManagerCancelSingleInvoice(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {billManagerCancelSingleInvoice}=require('./resources/billManager');
        return billManagerCancelSingleInvoice(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To send receipts to payments made to your paybill.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *               transactionId:{
                     type:'string',
                     required:true,
                    },
                     paidAmount:{
                     type:'number',
                     required:true,
                    },
                     msisdn:{
                     type:'number',
                     required:true,
                    },
                     dateCreated:{
                     type:'string',
                     required:true,
                    },
                     accountReference:{
                     type:'string',
                     required:true
                    },
                     shortCode:{
                     type:'number',
                     required:true,
                    }
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async billManagerReconcoilliation(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {billManagerReconciliation}=require('./resources/billManager');
        return billManagerReconciliation(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To pay for goods and services directly from your business account to a till number,merchant store number or Merchant HO.You can also use this to pay merchant on behalf of a consumer/requestor.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *             CommandID:{
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
                  },
                   SenderIdentifierType:{
                   type:'number',
                   constant:4
                  },
                   PartyB:{
                   type:'number',
                   required:true,
                  },
                   RecieverIdentifierType:{
                   type:'number',
                   constant:4
                  },
                   Requester:{
                   type:'number',
                  },
                   Amount:{
                   type:'number',
                   required:true,
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
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async businessBuyGoods(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {businessBuyGoods}=require('./resources/businessBuyGoods')
        return businessBuyGoods(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To pay bills directly from your business account to a paybill number or paybill store.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *             CommandID:{
                   type:'string',
                   constant:'BusinessPayBill'
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
                  },
                   SenderIdentifierType:{
                   type:'number',
                   constant:4
                  },
                   PartyB:{
                   type:'number',
                   required:true,
                  },
                   RecieverIdentifierType:{
                   type:'number',
                   constant:4
                  },
                   Requester:{
                   type:'number',
                  },
                   Amount:{
                   type:'number',
                   required:true,
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
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async businessPayBill(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {businessPayBill}=require('./resources/businessPayBill')
        return businessPayBill(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }

    /**
     * To register callback URLs for C2B APIs via which you shall receive notifications for payments to your paybill/till number
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * 
     * ShortCode:{
     *  
                type:'number',
                required:true
    },
    ResponseType:{
    *
                 type:'string',
                 required:true,
                 allowed:['Completed','Cancelled']
    },
    ConfirmationURL:{
    *
                 type:'url',
                 required:true,
    },
    ValidationURL:{
    *
                 type:'url',
                 required:true,
    }
     * @returns {Object}
     * @throws {Error}
     */
    async c2bRegisterURL(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {c2bRegisterURL}=require('./resources/c2bRegisterURL');
        return c2bRegisterURL(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To generate a Dynamic QR code which enables Safaricom M-PESA customers who have My Safaricom App or M-PESA app,to capture till number and amount then authorize to pay for goods and services at select LIPA NA M-PESA(LNM) merchant outlets
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     * MerchantName:{
     * 
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
             },
             TrxCode:{
                 type:'string',
                 required:true,
                 allowed:['BG','WA','PB','SM','SB']
             },
             CPI:{
                 required:true,
                 type:'string',
             },
             Size:{
                 required:true,
                 type:'string',
             }
}
     * @returns {object}
     * @throws {Error}
     */
    async dynamicQr(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {dynamicQr}=require('./resources/dynamicQr')
        return dynamicQr(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * For businesss who wish to integrate with standing orders for the automation of recurring revenue collection.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *              StandingOrderName:{
                    type:'string',
                    required:true
                   },
                    StartDate:{
                    type:'string',
                    required:true,
                   },
                    EndDate:{
                    type:'string',
                    required:true,
                   },
                    BusinessShortCode:{
                    type:'string',
                    required:true,
                   },
                    TransactionType:{
                    type:'string',
                    required:true,
                    allowed:['Standing Order Customer Pay Bill','Standing Order Customer Buy Goods']
                   },
                    Amount:{
                    type:'string',
                    required:true,
                   },
                    PartyA:{
                    type:'string',
                    required:true,
                   },
                    CallBackURL:{
                    type:'url',
                    required:true,
                   },
                    AccountReference:{
                    type:'string',
                    required:true,
                    maxLength:12
                   },
                    TransactionDesc:{
                    type:'string',
                    required:true,
                    maxLength:13
                   },
                    Frequency:{
                    type:'string',
                    required:true,
                    allowed:['1','2','3','4','5','6','7','8']
                   },
                    ReceiverPartyIdentifierType:{
                    type:'string',
                    required:true,
                    allowed:['2','4']
                   }
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async ratiba(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {ratiba}=require('./resources/mpesaRatiba');
        return ratiba(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * Reverses a C2B M-Pesa transaction.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {

     *           CommandID:{
                 type:'string',
                 constant:'TransactionReversal'
                },
                 ReceiverParty:{
                 type:'number',
                 required:true,
                },
                 ReceiverIdentifierType:{
                 type:'string',
                 required:true,
                },
                Remarks:{
                 type:'string',
                 required:true,
                },
                Initiator:{
                 type:'string',
                 required:true
                },
                SecurityCredential:{
                 type:'string',
                 required:true
                },
                QueueTimeOutURL:{
                 type:'url',
                 required:true
                },
                ResultURL:{
                 type:'url',
                 required:true
                },
                TransactionID:{
                 type:'string',
                 required:true,
                },
                Amount:{
                 type:'number',
                 required:true,
                },
                Occassion:{
                 type:'string',
                 required:true,
                 maxLength:100
                }
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async reverse(payload){
        try {
            isValidPayload(payload)
            const headers = await this._getAuthorizedHeaders();
            const {reverse}=require('./resources/reversals')
            return reverse(payload,this.config,headers);
        } catch (error) {
            throw error;
        }
        
    }
    /**
     * Enables businesses to remit tax to Kenya Revenue Authority.To use this, prior integration is required with KRA for tax declaration,payment registration number(PRN) generation and exchange of other tax related information.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
                
     *           CommandID:{
                 type:'string',
                 constant:'PayTaxToKRA',
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
                },
                 SenderIdentifierType:{
                 type:'string',
                 constant:'4'
                },
                 PartyB:{
                 type:'number',
                 constant:572572
                },
                 RecieverIdentifierType:{
                 type:'string',
                 constant:'4'
                },
                 Amount:{
                 type:'number',
                 required:true,
                },
                 AccountReference:{
                 type:'number',
                 required:true,
                },
                 Remarks:{
                 type:'string',
                 required:true,
                 maxLength:100
                },
                 QueueTimeOutURL:{
                 type:'url',
                 required:true
                },
                ResultURL:{
                 type:'url',
                 required:true
                }
     * }
     * @returns {Object}
     * @throws {Error}
     */
    async taxRemittance(payload){
        try {
            isValidPayload(payload)
            const headers = await this._getAuthorizedHeaders();
            const {taxRemittance}=require('./resources/taxRemittance');
            return taxRemittance(payload,this.config,headers);
        } catch (error) {
            throw error;
        }
        
    }
    /**
     * To check status of a transaction
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *     CommandID:{
             type:'string',
             required:true,
             constant:'TransactionStatusQuery'
             },
             PartyA:{
              type:'number',
              required:true,
            },
            IdentifierType:{
             type:'number',
             required:true,
             allowed:[1,2,4]
            },
            Remarks:{
             type:'string',
             required:true,
             maxLength:100
            },
            Initiator:{
             type:'string',
             required:true
            },
            SecurityCredential:{
             type:'string',
             required:true
            },
            QueueTimeOutURL:{
             type:'url',
             required:true
            },
            TransactionID:{
             type:'string',
             required:true
            },
            ResultURL:{
             type:'url',
             required:true
            },
            Occassion:{
             type:'string',
             required:true,
             maxLength:100
            },
            OriginatorConversationID:{
             type:'string',
             required:true
            }
     * 
      }
     * @returns {Object}
     * @throws {Error} 
     */
    async transactionStatus(payload){
        try{
        isValidPayload(payload)
        const headers = await this._getAuthorizedHeaders();
        const {transactionStatus}=require('./resources/transactionStatus');
        return transactionStatus(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To check the status of a Lipa Na M-PESA Online Payment
     * @param {object} [payload]  The payload should have the following schema
     * @PayloadSchema
     * {
     * 
     *          BusinessShortCode:{
                required:true,
                type:'number',
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
     *
     * } 
     * @returns {Object}
     * @throws {Error}
     */
    async expressQuery(payload){
        try{
        isValidPayload(payload)
        const headers=await this._getAuthorizedHeaders();
        const {expressQuery}=require('./resources/expressQuery');
        return expressQuery(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To request account balance of a short code.
     * @param {Object} [payload] The payload should have the following schema
     * @PayloadSchemma
     * {
     * 
     *          CommandID:{
                type:'string',
                constant:'TransactionStatusQuery'
                },
                PartyA:{
                type:'number',
                required:true,
                },
                IdentifierType:{
                type:'number',
                required:true,
                allowed:[2,4]
                },
                Remarks:{
                type:'string',
                required:true,
                maxLength:100
                },
                Initiator:{
                type:'string',
                required:true
                },
                SecurityCredential:{
                type:'string',
                required:true
                },
                QueueTimeOutURL:{
                type:'url',
                required:true
                },
                ResultURL:{
                type:'url',
                required:true
                }
     }
     * @returns {Object}
     * @throws {Error}
     */
    async accountBalance(payload){
        try{
        isValidPayload(payload)
        const headers=await this._getAuthorizedHeaders();
        const {accountBalance}=require('./resources/accountBalance');
        return accountBalance(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * To load funds to a B2C shortcode directly for disbursment.Move money from your MMF/wrking account to the recipient's utility account.
     * @param {Object} [payload] The payload should have the following schema
     * @returns {Object}
     * @PayloadSchema
     * {
     * 
     *                  CommandID:{
                        type:'string',
                        constant:'BusinessPayToBulk'
                       },
                        Initiator:{
                        type:'str',
                        required:true
                       },
                        SecurityCredential:{
                        type:'string',
                        required:true
                       },
                        PartyA:{
                        type:'number',
                        required:true,
                       },
                        SenderIdentifierType:{
                        type:'number',
                        constant:4
                       },
                        PartyB:{
                        type:'number',
                        required:true,
                       },
                        RecieverIdentifierType:{
                        type:'number',
                        constant:4
                       },
                        Requester:{
                        type:'number',
                       },
                        Amount:{
                        type:'number',
                        required:true, 
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
                       }
     * }
     * @throws {Error}
     */
    async b2cAccountTopUp(payload){
        try{
        isValidPayload(payload)
        const headers=await this._getAuthorizedHeaders();
        const {b2cAccountTopUp}=require('./resources/b2bAccountTopup');
        return b2cAccountTopUp(payload,this.config,headers);
        }catch(error){
            throw error;
        }
    }
    /**
     * Generates a timestamp that is in the form YYYYMMddHHmmss
     * @returns {Timestamp}
     */
    async genarateTimestamp(){
        const {getTimestamp}=require('./utils');
        return getTimestamp();
    }
    /**
     * Generates the password by concatenating the shortcde,passkey and timestamp the encoding it in base64 format
     * @param {number} BusinessShortCode  The business shortcode that is associated with the business
     * @param {string} Passkey            The pass key offerd via email for production but copy the provided one in sandbox
     * @param {timestamp} timestamp       This timestamp should ne in the format  YYYYMMddHHmmss 
     * @returns {string}
     */
    async generatePassword(BusinessShortCode,Passkey,timestamp){
        const {generatePassword}=require('./utils');
        return generatePassword(BusinessShortCode,Passkey,timestamp);
    }
}

module.exports= DarajaSDK;