"use strict";
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Tests if an arguement is a string.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isString=exports.isString=function isString(arg){
    return typeof arg ==='string';
}
 /** 
 * Tests if an arguement is a Number i.e integer or decimal.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isNumber=exports.isNumber=function isNumber(arg){
    return typeof arg ==='number';
}
let isValidPayload=exports.isValidPayload=function isValidPayload(arg){
    if(!arg||arg===null||arg===undefined){
        throw new Error('The parameter cannot be empty')
    }
    if(!isObject(arg)){
        throw new Error('Only objects are allowed')
    }
}
 /** 
 * Tests if an arguement is an object.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isObject=exports.isObject=function isObject(arg){
    return typeof arg ==='object';
}
/** 
 * Tests if an arguement is an array.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isArray=exports.isArray=function isArray(arg){
    return Array.isArray(arg);
}
/** 
 * Tests if an arguement is an undefined.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isUndefined=exports.isUndefined=function isUndefined(arg){
    return arg===undefined;
}
/** 
 * Tests if an arguement is a function.
 * @param {any} arg   The argument to test type
 * @returns {boolean}
 */
let isFunction=exports.isFunction=function isFunction(arg){
    return typeof arg==="function";
}
/**
 * Gets the appropiate base url for a given request
 * @param {string} mode  The mode in which the service is running on
 * @returns {string} 
 */
var getDefaultBaseUrl = exports.getDefaultBaseUrl = function getDefaultBaseUrl(mode) {
    if(!mode){
        mode="sandbox";
    }
    if(!(mode==="live" || mode==='sandbox')){
        throw new Error(`The mode in the configurations can be either 'live' or 'sandbox' not ${mode}`);
    }
    return (isString(mode) && mode === "live") ? "https://api.safaricom.co.ke":"https://sandbox.safaricom.co.ke";
};

/**
 * Gets the timestamp in the format specified by the api i.e YYYYMMddHHmmss
 * @returns {date}
 */
let getTimestamp=exports.getTimestamp=()=>{
    let monthsArray=["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11","12"];
    let format=(num)=>{
        let temp=num.toString();
        if(temp.length!=2){
            temp='0'+temp;
        }
        return temp; 
    }
    let date=new Date().getFullYear()+''+monthsArray[new Date().getMonth()]+format (new Date().getDate())+format(new Date().getHours())+format(new Date().getMinutes())+format(new Date().getSeconds());
    return date;
}
/**
 * Checks if a given number or string is in the interger format i.e not float or any other type
 * @param {*} arg The value to test
 * @param {*} key The property associated with the value
 */
let isInteger=exports.isInteger=(arg,key)=>{
    if(isNumber(arg)){
        let temp=arg.toString();
        let x=temp.split('.');
        if(x.length>1){
            throw TypeError(`The property ${key} should be of integer format`);
        }
    }
    if(isString(arg)){
        let x=arg.split('.');
        if(x.length>1){
            throw TypeError(`The property ${key} should be of integer format`);
        }
    }
}
/**
 * Tests if a given value is non-negative or non-zero
 * @param {*} arg The value to test
 * @param {*} key The property associated with the value
 */
let isNonNegativeOrZero=exports.isNonNegativeOrZero=(arg,key)=>{
    if(isNumber(arg)){
        if(arg<1){
            throw TypeError(`The property ${key} should not have a zero or negative value`);
        }
    }
    if(isString(arg)){
        
        let temp=Number(arg);
        if(isNaN(temp)===false){
            if(temp<1){
                throw TypeError(`The property ${key} should not have a zero or negative value`);
            }
        }else{
            throw TypeError(`The property ${key} should compose of digits only.`);
        }
    }
}
/**
 * Checks if a given value is amongst the allowed/valid values
 * @param {*} data 
 * @param {Array} allowed 
 * @returns 
 */
let isAllowed=exports.isAllowed=(data,allowed)=>{
    return allowed.find((allowedVal)=>allowedVal===data);
}
/**
 * Checks if a given  value is indeed a http/https url
 * @param {string} arg 
 * @returns {Boolean}
 */
let isURL=exports.isURL=(arg)=>{
       try {
           const url = new URL(arg);
           return url.protocol === 'http:' || url.protocol === 'https:';
       } catch (error) {
        return false;
       }
        
}
/**
 * Checks if a value is bookeab
 * @param {*} arg 
 * @returns {Boolean}
 */
let isBoolean=exports.isBoolean=(arg)=>{
   return typeof arg ==='boolean';
}

/**
 * Checks if a given value of a property actually meets the schema data type requirements
 * @param {*} data The value/parameter to test
 * @param {*} schema The schema to test against
 * @returns 
 */
let checkType=exports.checkType=(data,schema)=>{
        switch (schema.type) {
        case 'string':
            return isString(data)
        case 'number':
            return isNumber(data)
        case 'function':
            return isFunction(data)
        case 'timestamp':
            return isTimestamp(data)
        case 'url':
            return isURL(data);
        case 'array':
            return isArray(data);
        case 'boolean':
            return isBoolean(data);
        default:
            return undefined
  }
}
/**
 * Checks if a value has a valid business short code format
 * @param {*} arg The value to test
 * @returns {Boolean}
 */
let isBusinessShortCode=exports.isBusinessShortCode=(arg)=>{
    if(!isNumber(arg)){
        arg=String(arg)
    }
    if(arg.length==5||arg.length==6){
     var patt1 = /\d{5,6}/g
      var result = arg.match(patt1);
      if(result) return true;

    }
    return false;
}
/**
 * Checks if a value is a valid mobile number that prefix 254
 * @param {*} arg 
 * @returns {Boolean}
 */
let isMobileNumber=exports.isMobileNumber=(arg)=>{
   if(arg.length===12){
     var patt1 = /254\d{9}/g
     var result = arg.match(patt1);
     if(result) return true;
    }
    return false;
}
/**
 * Checks if a value is a valid mobile number that prefix 254
 * @param {*} arg 
 * @returns {Boolean}
 * @throws {Error}
 */
let isISSDN=exports.isISSDN=(arg,key)=>{
    if(arg.length===12){
     var patt1 = /254\d{9}/g
     var result = arg.match(patt1);
     if(result){
        return true
     }else{
     throw new Error(`The property ${key} does not have a valid ISSDN in the form 254XXXXXXXXX`)
     }
    }
    throw new Error(`The property ${key} does not have a valid ISSDN in the form 254XXXXXXXXX`)
    
}
/**
 *  Checks if a value is a valid mobile number that prefix 07 or 01
 * @param {*} arg 
 * @param {*} key 
 * @returns 
 */
let isPhoneNumber=exports.isPhoneNumber=(arg,key)=>{
    if(arg.length==10){
     var patt1 = /07\d{8}/g
     var result = arg.match(patt1);
     if(result){
        return true;
    } 
          throw new Error(`The property ${key} does not have a valid ISSDN in the form 07XXXXXXXX or 01XXXXXXXX`)    
    }
         throw new Error(`The property ${key} does not have a valid ISSDN in the form 07XXXXXXXX or 01XXXXXXXX`)
}
/**
 * Checks for a valid email format
 * @param {*} arg 
 * @param {*} key 
 * @returns {Boolean}
 * @throws {Error}
 */
let isEmail=exports.isEmail=(arg,key)=>{
  const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let result=regex.test(arg);
  if(result===true) return true;
  throw new Error(`Invalid email format ${arg}`);    

}
/**
 * Checks for a valid Jpeg Format
 * @param {*} arg 
 * @param {*} key 
 */
let isJpeg=exports.isJpeg=async(arg,key)=>{
    let isValidExtension=url.toLowerCase().endsWith(".jpg")||url.toLowerCase.endsWith(".jpeg");
    if(!isValidExtension) throw Error(`The image in the provided url ${arg} is not in jpeg forma`)
    try {
      let result=await fetch(url);
      let image=await result.blob();
      if(image.type!=='image/jpeg'){
        throw new Error(`The image in the provided url ${arg} is not in jpeg format`);
        
      }
    } catch (error) {
        throw error;
    }
}

let isPhoneNumberOrBusinessShortCode=exports.isPhoneNumberOrBusinessShortCode=(arg,key)=>{
    if(!(isBusinessShortCode(arg)||isMobileNumber(arg))){
       throw new SyntaxError(`The property ${key} should be a mobile number{254XXXXXXXXX} or a short code 6 to 9 characters long.`);
   }
}

let isCPI=exports.isCPI=(arg,key)=>{
   if(!(isBusinessShortCode(arg)||isMobileNumber(arg))){
       throw new SyntaxError(`The property ${key} should be a mobile number{254XXXXXXXXX},paybill or business number,agent number,buy goods till which should be 5 to 6 digits long.`);
   }
}
let isStringArray=exports.isStringArray=(arg,key)=>{
    if(arg.length!=1){
        throw new SyntaxError(`The array for property ${key} should contain a single element`);
    } 
    if(typeof arg[0]!=='string'){
        throw new SyntaxError(`The elemet in the array for property ${key} should be a string not ${typeof arg[0]}`);
    }
}
let isNumberArray=exports.isNumberArray=()=>{
    if(arg.length!=1){
        throw new SyntaxError(`The array for property ${key} should contain a single element`);
    } 
    if(typeof arg[0]!=='number'){
        throw new SyntaxError(`The elemet in the array for property ${key} should be a number not ${typeof arg[0]}`);
    }
}
let isValidResponseType=exports.isValidResponseType=(arg,key)=>{
    if(arg[0]!=='Completed/Cancelled') throw new SyntaxError(`The value for the element attached to the property ${key} should be 'Completed/Cancelled' not ${arg}`);
}

let isValidURL=exports.isValidURL=(arg,key)=>{
       try {
           const url = new URL(arg);
           return url.protocol === 'http:' || url.protocol === 'https:';
       } catch (error) {
        throw error;
        
       }
}
let isPaymentRegistrationNumber=exports.isPaymentRegistrationNumber=(arg,key)=>{
    const pattern=/^PRN\d{11,13}$/i;
    let result=pattern.test(arg);
    if(result===false){
        throw new SyntaxError(`The payment registration number provided is not valid.`)
    }
}

let isYearMonthDateHyphen=exports.isYearMonthDateHyphen=(arg,key)=>{
     const pattern=/^\d{4}-\d{2}-\d{2}$/g;
     let result=pattern.test(arg);
     if(result===false){
        throw new SyntaxError(`The date format for property ${key} is wrong,it should be in the form  YYYY-mm-dd`);
     }
     let date=new Date(arg);
     if(isNaN(date.getTime())){
        throw new SyntaxError(`This date for property ${key} is invalid.`);
     }
}

let isYearMonthDate=exports.isYearMonthDate=(arg,key)=>{
     const pattern=/^\d{8}/;
     let result=pattern.test(arg);
     if(result===false){
        throw new SyntaxError(`The date format for property ${key} is wrong,it should be in the form  YYYYmmdd`);
     }
     let year=parseInt(arg.substring(0,4))
     let month=parseInt(arg.substring(4,6))
     let date=parseInt(arg.substring(6,8))
     let extractedDate=`${year}-${month}-${date}`;
       let dateFormat=new Date(extractedDate);
     if(isNaN(dateFormat.getTime())){
        throw new SyntaxError(`This date for property ${key} is invalid.`);
     }
}
let isMonthYear=exports.isMonthYear=(arg,key)=>{
     const year=/^\d{4}$/g;
     let dateArray=arg.split(' ');
     if(dateArray.length!==2){
        throw new SyntaxError(`The format with which the ${key} is written should be in the form 'month Year' e.g 'August 2025'`); 
     }
     let monthsArray=['January','February','March','April','May','June','July','August','September','October','November','December'];
     let validMonth=monthsArray.find((month)=>{return month===dateArray[0]});
     if(!validMonth){
        throw new SyntaxError(`The month ${dateArray[0]} specified is not valid.Please select amongst ${monthsArray}`);
     }
     let result=year.test(dateArray[1]);
     if(result===false){
        throw new SyntaxError(`The year for property ${key},should be in the form  YYYY`);
     }
}
                             

/**
 * Confirms if a data input meets the schema requirements
 * @param {Object} data The data to validate structure
 * @param {Object} schema The schema the data is being tested on
 * @param {Object} configuration 
 */
let validateSchema=exports.validateSchema=(data,schema,configuration)=>{
    try{
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
        if(!checkType(data[key],schema[key])){
            throw new TypeError(`The property ${key} should be of type ${schema[key].type} not ${typeof data[key]}`)
        }
        if(schema[key].allowed){
            if(!isAllowed(data[key],schema[key].allowed)){
                throw new TypeError(`The value ${data[key]} for the property ${key} is not enumerated as  a valid one.Please choose from [${schema[key].allowed}].`)
            }
        }
        if(schema[key].custom){
            let arr=schema[key].custom;
            if(isArray(arr)){
                for (let index = 0; index < arr.length; index++) {
                    if(!isFunction(arr[index])){
                        throw new TypeError(`The parameter ${arr[index]} should be a function not ${typeof arr[index]}`)
                    } 
                    arr[index](data[key],key);
                }
            }else{
                throw new TypeError(`The value for property custom should be an array.`)
            }
        }
        if(schema[key].maxLength){
            if(data[key].length>schema[key].maxLength){
                throw new SyntaxError(`The value for property ${data[key]} should a maximum Length of ${schema[key].maxLength}`);
            }
        }
        if(key==='Password'){
            if(data[key]){
                let rightPassword=new Buffer.from(data.BusinessShortCode+configuration.Passkey+getTimestamp()).toString('base64');
                if(data[key]!==rightPassword){
                 data[key]=rightPassword;
                }
            }
        }
        
    }else{
        throw new RangeError(`The property ${key} is out of the range of keys allowed in this schema`)
    }
  } 
    //Missing values
    for (const key in schema) {
        if (!(Object.prototype.hasOwnProperty.call(data, key))) {
            if(schema[key].required===true){
                throw SyntaxError(`A property by the name: ${key} is missing in your data.`);
            }
            if(schema[key].default){
                    data[key]=schema[key].default;
            }
           
        }

          if(key==='Password'){
            if(!data[key]){
                data[key]=Buffer.from(data.BusinessShortCode+configuration.PassKey+getTimestamp()).toString('base64');
            }  
        }
        if(key==='Timestamp'){
               data[key]=getTimestamp();
           }
        if(schema[key].constant){
                data[key]=schema[key].constant;
        }
        if(schema[key].children){
            if(data[key]){
                if(isArray(data[key])){
                    for (let index = 0; index < data[key].length; index++) {
                        validateSchema(data[key][index],schema[key].children,configuration);                 
                    }
                }else{
                validateSchema(data[key],schema[key].children,configuration);
            }
        }
    }
    schema[key].value=data[key]
    console.log(data)
}
    }catch(err){
   throw err;
}
       
}
/**
 * Generates the password by concatenating the sortcde,passkey and timestamp the encoding it in base64 format
 * @param {number} BusinessShortCode 
 * @param {string} Passkey 
 * @param {timestamp} timestamp 
 * @returns 
 */
var generatePassword=exports.generatePassword=function generatePassword(BusinessShortCode,Passkey,timestamp){
    let password=new Buffer.from(BusinessShortCode+Passkey+timestamp).toString('base64');
    return password;

}

/**
 * Recursively copies given object into a new object. Helper method for merge
 * @param  {Object} v
 * @return {Object}
 */
function clone(v) {
    if (v === null || typeof v !== "object") {
        return v;
    }

    if (isArray(v)) {
        var arr = v.slice();
        for (var i = 0; i < v.length; i++) {
            arr[i] = clone(arr[i]);
        }
        return arr;
    }
    else {
        var obj = {};
        for (var k in v) {
            obj[k] = clone(v[k]);
        }
        return obj;
    }
}
/**
 * Merges two Objects recursively, setting property of obj1 to those of obj2
 * and creating property as necessary. 
 *
 * Implementation suggested by @kobalicek on https://github.com/paypal/PayPal-node-SDK/issues/69
 * @param  {Object} obj1 
 * @param  {Object} obj2 
 * @return {Object}     
 */
var merge = exports.merge = function merge(obj1, obj2, appendOnly) {

    //Handle invalid arguments
    if (obj1 === null || typeof obj1 !== "object") {
        throw new TypeError("merge() - first parameter has to be an object, not " + typeof obj1 + ".");
    }

    if (obj2 === null || typeof obj2 !== "object") {
        throw new TypeError("merge() - first parameter has to be an object, not " + typeof obj2 + ".");
    }

    if (isArray(obj1) || isArray(obj2)) {
        throw new TypeError("merge() - Unsupported for arrays.");
    }

    for (var k in obj2) {
        var obj1Val, obj2Val = obj2[k];
        if (hasOwn.call(obj1, k)) {
            if (!appendOnly) {
                obj1Val = obj1[k];
                if (obj1Val !== null && typeof obj1Val === "object" &&
                        obj2Val !== null && typeof obj2Val === "object") {
                    merge(obj1Val, obj2Val);
                }
                else {
                    obj1[k] = clone(obj2Val);
                }
            }
        }
        else {
            obj1[k] = clone(obj2Val);
        }
    }
    return obj1;
};