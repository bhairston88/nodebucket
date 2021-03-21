/*
; ==============================
; Title: base-response.js
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Creates a BaseResponse class
; ==============================
*/

//creates a class
class BaseResponse {

  /**
   *
   * @param {*} httpCode String http status code
   * @param {*} message Message the user will see
   * @param {*} data returns a data object or null
   */
  constructor (httpCode, message, data)
  {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toLocaleDateString('en-US');
  }

  /**
   * @description toObject function, part of the BaseResponse class
   * @returns new object literal with all of the BaseResponse fields (httpCode, message, data, timestamp)
   */
  toObject()
  {
    return {
      'httpCode': this.httpCode,
      "message": this.message,
      "data": this.data,
      "timestamp": this.timestamp
    }
  }
}

//export class
module.exports = BaseResponse
