exports.models = {
  "CCC": {
  "id" : "CCC",
  "name" : "",
  "properties" : {
    "rawCount" : {
      "type" : "integer",
      "format" : "int64"
    },
    "aggregatedCount" : {
      "type" : "integer",
      "format" : "int64"
    },
    "tags" : {
      "type" : "array",
      "items" : {
        "$ref" : "Measurment"
      }
    }
  }
},

  "Measurment": {
  "id" : "Measurment",
  "name" : "",
  "properties" : {
    "name" : {
      "type" : "string"
    }
  }
},

  "Tag": {
  "id" : "Tag",
  "name" : "",
  "properties" : {
    "name" : {
      "type" : "string"
    },
    "id" : {
      "type" : "integer",
      "format" : "int64"
    }
  }
},

  "User": {
  "id" : "User",
  "name" : "",
  "properties" : {
    "email" : {
      "type" : "string"
    },
    "username" : {
      "type" : "string"
    },
    "userStatus" : {
      "type" : "integer",
      "format" : "int32",
      "description" : "User Status",
      "enum" : [ "1-registered", "2-active", "3-closed" ]
    },
    "lastName" : {
      "type" : "string"
    },
    "firstName" : {
      "type" : "string"
    },
    "id" : {
      "type" : "integer",
      "format" : "int64"
    },
    "phone" : {
      "type" : "string"
    },
    "password" : {
      "type" : "string"
    }
  }
},

  "Order": {
  "id" : "Order",
  "name" : "",
  "properties" : {
    "shipDate" : {
      "type" : "string",
      "format" : "date-time"
    },
    "quantity" : {
      "type" : "integer",
      "format" : "int32"
    },
    "petId" : {
      "type" : "integer",
      "format" : "int64"
    },
    "id" : {
      "type" : "integer",
      "format" : "int64"
    },
    "status" : {
      "type" : "string",
      "description" : "Order Status",
      "enum" : [ "placed", "approved", "delivered" ]
    }
  }
},

  "Category": {
  "id" : "Category",
  "name" : "",
  "properties" : {
    "name" : {
      "type" : "string"
    },
    "id" : {
      "type" : "integer",
      "format" : "int64"
    }
  }
},

  "Pet": {
  "id" : "Pet",
  "name" : "",
  "required" : [ "id", "name" ],
  "properties" : {
    "name" : {
      "type" : "string"
    },
    "tags" : {
      "type" : "array",
      "items" : {
        "$ref" : "Tag"
      }
    },
    "photoUrls" : {
      "type" : "array",
      "items" : {
        "type" : "string"
      }
    },
    "id" : {
      "type" : "integer",
      "format" : "int64"
    },
    "status" : {
      "type" : "string",
      "description" : "pet status in the store",
      "enum" : [ "available", "pending", "sold" ]
    },
    "category" : {
      "type" : "Category"
    }
  }
}

  }
