var swagger = require("swagger-node-express");
var thisAPI = null;
try {
  thisAPI = require("./CccApi_impl");
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

exports.getCCC = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/ccc/{timePeriod}/{customer}/{cage}/{cabinet}",
    "notes" : "We haven't yet parameterized the Data Center or Begin and End Times",
    "summary" : "Find Customer / Cage / Cabinet measurements for a Time Period",
    "method": "GET",
    "params" : [].concat([params.path("/:timePeriod", "'daily' or 'hourly' for now."),params.path("/:customer", "The ID for a specific Customer"),params.path("/:cage", "the Cage ID"),params.path("/:cabinet", "the Cabinet ID")]).concat([]).concat([]),
    "type" : "CCC",
    "responseMessages" : [errors.invalid('id'), errors.notFound('CCC')],
    "nickname" : "getCCC"
  },
  'action': function (req,res) {
    if (!req.params.timePeriod) {
      return writeResponse(res, {message: "Required Parameter: 'timePeriod' is missing..."}, 500);    
//      throw errors.invalid('timePeriod');
    }
    if (!req.params.customer) {
      return writeResponse(res, {message: "Required Parameter: 'customer' is missing..."}, 500);    
//      throw errors.invalid('customer');
    }
    if (!req.params.cage) {
      return writeResponse(res, {message: "Required Parameter: 'cage' is missing..."}, 500);    
//      throw errors.invalid('cage');
    }
    if (!req.params.cabinet) {
      return writeResponse(res, {message: "Required Parameter: 'cabinet' is missing..."}, 500);    
//      throw errors.invalid('cabinet');
    }
    try {
      thisAPI.getCCC(req, res, writeResponse, function(resMessage) {
        console.log("getCCC:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing CccApi_impl.getCCC as a GET method?"});    
    }
  }
};

