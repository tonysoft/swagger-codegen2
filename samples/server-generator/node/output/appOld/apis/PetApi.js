var swagger = require("swagger-node-express");
var thisAPI = null;
try {
  thisAPI = require("./PetApi_impl");
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

exports.getPetById = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet/{petId}",
    "notes" : "Returns a pet based on ID",
    "summary" : "Find pet by ID",
    "method": "GET",
    "params" : [].concat([params.path("/:petId", "ID of pet that needs to be fetched")]).concat([]).concat([]),
    "type" : "Pet",
    "responseMessages" : [errors.invalid('id'), errors.notFound('Pet')],
    "nickname" : "getPetById"
  },
  'action': function (req,res) {
    if (!req.params.petId) {
      return writeResponse(res, {message: "Required Parameter: 'petId' is missing..."}, 500);    
//      throw errors.invalid('petId');
    }
    try {
      thisAPI.getPetById(req, res, writeResponse, function(resMessage) {
        console.log("getPetById:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.getPetById as a GET method?"});    
    }
  }
};
exports.deletePet = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet/{petId}",
    "notes" : "",
    "summary" : "Deletes a pet",
    "method": "DELETE",
    "params" : [].concat([params.path("/:petId", "Pet id to delete")]).concat([]).concat([]),
    "type" : "",
    "responseMessages" : [errors.invalid('id'), errors.notFound('')],
    "nickname" : "deletePet"
  },
  'action': function (req,res) {
    if (!req.params.petId) {
      return writeResponse(res, {message: "Required Parameter: 'petId' is missing..."}, 500);    
//      throw errors.invalid('petId');
    }
    try {
      thisAPI.deletePet(req, res, writeResponse, function(resMessage) {
        console.log("deletePet:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.deletePet as a DELETE method?"});    
    }
  }
};
exports.addPet = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet",
    "notes" : "",
    "summary" : "Add a new pet to the store",
    "method": "POST",
    "params" : [].concat([]).concat([]).concat([params.body("body", "Pet", "Pet object that needs to be added to the store", true)
    ]),
    "type" : "",
    "responseMessages" : [errors.invalid('id'), errors.notFound('')],
    "nickname" : "addPet"
  },
  'action': function (req,res) {
    if (!req.params.body) {
      return writeResponse(res, {message: "Required Parameter: 'body' is missing..."}, 500);    
//      throw errors.invalid('body');
    }
    try {
      thisAPI.addPet(req, res, writeResponse, function(resMessage) {
        console.log("addPet:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.addPet as a POST method?"});    
    }
  }
};
exports.updatePet = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet",
    "notes" : "",
    "summary" : "Update an existing pet",
    "method": "PUT",
    "params" : [].concat([]).concat([]).concat([params.body("body", "Pet", "Pet object that needs to be updated in the store", true)
    ]),
    "type" : "",
    "responseMessages" : [errors.invalid('id'), errors.notFound('')],
    "nickname" : "updatePet"
  },
  'action': function (req,res) {
    if (!req.params.body) {
      return writeResponse(res, {message: "Required Parameter: 'body' is missing..."}, 500);    
//      throw errors.invalid('body');
    }
    try {
      thisAPI.updatePet(req, res, writeResponse, function(resMessage) {
        console.log("updatePet:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.updatePet as a PUT method?"});    
    }
  }
};
exports.findPetsByStatus = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet/findByStatus",
    "notes" : "Multiple status values can be provided with comma seperated strings",
    "summary" : "Finds Pets by status",
    "method": "GET",
    "params" : [params.query("status", "Status values that need to be considered for filter", "string", true, true, "LIST[available,pending,sold]", "available")].concat([]).concat([]).concat([]),
    "type" : "List[Pet]",
    "responseMessages" : [errors.invalid('id'), errors.notFound('List[Pet]')],
    "nickname" : "findPetsByStatus"
  },
  'action': function (req,res) {
    if (!req.params.status) {
      return writeResponse(res, {message: "Required Parameter: 'status' is missing..."}, 500);    
//      throw errors.invalid('status');
    }
    try {
      thisAPI.findPetsByStatus(req, res, writeResponse, function(resMessage) {
        console.log("findPetsByStatus:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.findPetsByStatus as a GET method?"});    
    }
  }
};
exports.findPetsByTags = {
  'spec': {
    "description" : "Operations about pets",
    "path" : "/pet/findByTags",
    "notes" : "Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.",
    "summary" : "Finds Pets by tags",
    "method": "GET",
    "params" : [params.query("tags", "Tags to filter by", "string", true, true, "")].concat([]).concat([]).concat([]),
    "type" : "List[Pet]",
    "responseMessages" : [errors.invalid('id'), errors.notFound('List[Pet]')],
    "nickname" : "findPetsByTags"
  },
  'action': function (req,res) {
    if (!req.params.tags) {
      return writeResponse(res, {message: "Required Parameter: 'tags' is missing..."}, 500);    
//      throw errors.invalid('tags');
    }
    try {
      thisAPI.findPetsByTags(req, res, writeResponse, function(resMessage) {
        console.log("findPetsByTags:", resMessage);    
      });
    } catch(e) {
      writeResponse(res, {message: "how about implementing PetApi_impl.findPetsByTags as a GET method?"});    
    }
  }
};

