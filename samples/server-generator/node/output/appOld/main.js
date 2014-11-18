var express = require("express")
 , url = require("url")
 , cors = require("cors")
 , swagger = require("swagger-node-express")
 , db = false

var app = express();
app.use(express.bodyParser());

var corsOptions = {
  credentials: true,
  origin: function(origin,callback) {
    if(origin===undefined) {
      callback(null,false);
    } else {
      callback(null,true);
    }
  }
};

app.use(cors(corsOptions));

swagger.setAppHandler(app);  
//swagger.configureSwaggerPaths("", "api-docs", "");



var models = require("./models.js");

var fs = require('fs');
app.get('/api-docs/:api', function(req, res) {
  var api = req.params.api;
  if (!api) {
    api = "api-docs";
  }
  fs.readFile(__dirname + '/../apis/' + api + '.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var doc = JSON.parse(data);
    res.status(200).send(doc);
  });
});

app.get('/api-docs', function(req, res) {
  var api = "api-docs";
  fs.readFile(__dirname + '/../apis/' + api + '.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var doc = JSON.parse(data);
    res.status(200).send(doc);
  });
});




var UserApi = require("./apis/UserApi.js");
var CccApi = require("./apis/CccApi.js");
var PetApi = require("./apis/PetApi.js");
var StoreApi = require("./apis/StoreApi.js");
swagger.addModels(models)
  .addPOST(UserApi.createUser)
.addPOST(UserApi.createUsersWithArrayInput)
.addPOST(UserApi.createUsersWithListInput)
.addPUT(UserApi.updateUser)
.addDELETE(UserApi.deleteUser)
.addGET(UserApi.getUserByName)
.addGET(UserApi.loginUser)
.addGET(UserApi.logoutUser)
.addGET(CccApi.getCCC)
.addGET(PetApi.getPetById)
.addDELETE(PetApi.deletePet)
.addPOST(PetApi.addPet)
.addPUT(PetApi.updatePet)
.addGET(PetApi.findPetsByStatus)
.addGET(PetApi.findPetsByTags)
.addGET(StoreApi.getOrderById)
.addDELETE(StoreApi.deleteOrder)
.addPOST(StoreApi.placeOrder)
;
  // configures the app
swagger.configure("http://localhost:8002", "0.1");

//  start the server
app.listen(8002);

