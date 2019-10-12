const web3 = require("./web3");
const Product = require("./build/Test.json");
const address = require("./address/address.json")["addressTest"];

const catchError = (err, trycatch = false) => {
  const errString = err.toString();
  if (errString.indexOf("Invalid JSON RPC") > -1) {
    return {
      type: "connection",
      message: "Invalid JSON RPC.",
      object: err
    };
  } else if (trycatch) {
    return {
      type: "connection",
      message: "Invalid data.",
      object: err
    };
  }
  return {
    type: "",
    message: "",
    object: err
  };
};

const instance = new web3.eth.Contract(JSON.parse(Product.interface), address);

const truzrMethod = (
  funcName,
  argumentsArray,
  callOrSend,
  callOrSendObject
) => {
  return new Promise((resolve, reject) => {
    try {
      instance.methods[funcName]
        .apply(this, argumentsArray)
        [callOrSend](callOrSendObject)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(catchError(err));
        });
    } catch (err) {
      reject(catchError(err, true));
    }
  });
};

module.exports = {
  truzrMethod
};
