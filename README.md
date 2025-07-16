# M-Pesa API SDK
This SDK provides a convenient way to integrate with the Safaricom M-Pesa API (Daraja) for various mobile money transactions and services within your application.

## Features ✨
Customer to Business (C2B): Process payments from customers to your business (e.g., Paybill, Buy Goods).

Business to Customer (B2C): Send money from your M-Pesa account to customer M-Pesa accounts.

Business to Business (B2B): Facilitate transactions between two M-Pesa business accounts.

STK Push (Lipa Na M-Pesa Online): Initiate secure and interactive payment requests directly on the customer's mobile phone.

Transaction Status Query: Programmatically check the status of any M-Pesa transaction using its unique ID.

Account Balance Inquiry: Retrieve your M-Pesa business account balance.

Transaction Reversals: Reverse erroneous M-Pesa transactions.

Data schema validation: Ths sdk gets to check if the data input for dur the request meets the API's rules on payload architecture. 

## Prerequisites ✅
Before using this SDK, ensure you have:

An active Safaricom M-Pesa Business Account (e.g., Paybill or Buy Goods Till Number).

An application registered on the Safaricom Daraja Portal.

Consumer Key and Consumer Secret obtained from your Daraja app.

A Shortcode (Paybill or Till Number) associated with your business account.

A Passkey for STK Push transactions (generated on Daraja portal).

Configured Confirmation URL and Validation URL for C2B payments on the Daraja portal. These URLs will receive callbacks from M-Pesa.

The Node.js programming language runtime installed.

## Installation 💻

```bash
npm install daraja-sdk
```
## Getting Started 🚀

Import the SDK:
```javascript
const Mpesa = require('daraja-sdk');
```
```javascript
Initialize the SDK with your Credentials:
const mpesa = new Mpesa({
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  passkey: 'YOUR_STK_PASSKEY',
  environment: 'sandbox' // or 'live'
});
```
Generate an Access Token:
The SDK typically handles access token generation and refreshing internally. If not, you might call a method like:

Usage Examples 📋
Below are common use cases. Replace placeholder values with your actual data.

STK Push (Lipa Na M-Pesa Online)
Initiate a payment request to the customer's M-Pesa enabled phone.
```javascript
async ()=>{
    mpesa.stkPush({
        BusinessShortCode: '174379', // Your Paybill Shortcode(Lipa na M-Pesa Online Paybill)
        Password: 'bfB279f9242d...', // Passkey
        Timestamp: 'YYYMMddHHmmss',
        TransactionType: 'CustomerPayBillOnline' or 'CustomerBuyGoodsOnline',
        Amount:10,
        PartyA:2547XXXXXXXX,
        PartyB:174379,
        PhoneNumber:2547XXXXXXXX,
        CallBackURL:'[https://your-domain.com/mpesa/callback]',
        AccountReference:'Order123',// e.g Invoice number
        TransactionDesc:'payment for Goods'
})
}catch(error){
    console.error(error);
}
```
## Documentation 📚
For comprehensive details on all API endpoints, request/response formats, and advanced configurations, please refer to:

Safaricom Daraja Portal Documentation

Link to this SDK's specific documentation (if available)

## Contributing 🤝
Contributions are welcome! Please read our CONTRIBUTING.md for guidelines on how to contribute to this project.

## Support ❓
If you encounter any issues, have questions, or need assistance, please:

Open an issue on the GitHub repository.

Visit the Safaricom Daraja Developer Forum for community support.