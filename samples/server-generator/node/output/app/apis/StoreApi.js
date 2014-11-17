var swagger = require("swagger-node-express");
var thisAPI = null;
try {
  thisAPI = require("./StoreApi_impl");
}
catch (e) {
  // No implementation has been provided yet..
  // But that's OK because each end-point defined below will remind us...
}
var url = require("url");
var errors = swagger.errors;
var params = swagger.params;

/* add model includes */

function writeResponse (response, data, status) {
  response.header('Access-Control-Allow-Origin', "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Content-Type", "application/json; charset=utf-8");
  if (status) {
    response.status(status).send(JSON.stringify(data));
  }
  else {
    response.send(JSON.stringify(data));
  }
}

exports.models = models = require("../models.js");

exports.placeOrder = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/store/order",
    "notes" : "",
    "summary" : "Place an order for a pet",
    "method": "POST",
    "params" : [].concat([]).concat([]).concat([params.body("body", "Order", "order placed for purchasing the pet", true)
    ]),
    "type" : "",
    "responseMessages" : [errors.invalid('id'), errors.notFound('')],
    "nickname" : "placeOrder"
  },
  'action': function (req,res) {
    if (!req.params.body) {
      throw errors.invalid('body');
    }
    try {
      thisAPI.placeOrder(req, res, writeResponse, function(resMessage) {
        console.log("placeOrder:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing StoreApi_impl.placeOrder as a POST method?"});    
    }
  }
};
exports.deleteOrder = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/store/order/{orderId}",
    "notes" : "For valid response try integer IDs with value < 1000.  Anything above 1000 or nonintegers will generate API errors",
    "summary" : "Delete purchase order by ID",
    "method": "DELETE",
    "params" : [].concat([params.path("/:orderId", "ID of the order that needs to be deleted")]).concat([]).concat([]),
    "type" : "",
    "responseMessages" : [errors.invalid('id'), errors.notFound('')],
    "nickname" : "deleteOrder"
  },
  'action': function (req,res) {
    if (!req.params.orderId) {
      throw errors.invalid('orderId');
    }
    try {
      thisAPI.deleteOrder(req, res, writeResponse, function(resMessage) {
        console.log("deleteOrder:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing StoreApi_impl.deleteOrder as a DELETE method?"});    
    }
  }
};
exports.getOrderById = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/store/order/{orderId}",
    "notes" : "For valid response try integer IDs with value <= 5. Anything above 5 or nonintegers will generate API errors",
    "summary" : "Find purchase order by ID",
    "method": "GET",
    "params" : [].concat([params.path("/:orderId", "ID of pet that needs to be fetched")]).concat([]).concat([]),
    "type" : "Order",
    "responseMessages" : [errors.invalid('id'), errors.notFound('Order')],
    "nickname" : "getOrderById"
  },
  'action': function (req,res) {
    if (!req.params.orderId) {
      throw errors.invalid('orderId');
    }
    try {
      thisAPI.getOrderById(req, res, writeResponse, function(resMessage) {
        console.log("getOrderById:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing StoreApi_impl.getOrderById as a GET method?"});    
    }
  }
};

