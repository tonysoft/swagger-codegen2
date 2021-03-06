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




  // configures the app
swagger.configure("http://localhost:8002", "0.1");

//  start the server
app.listen(8003);

