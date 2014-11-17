package swaggerSpec1_1

import com.wordnik.swagger.codegen.model._

import org.json4s._
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization.{read, write}

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.FlatSpec
import org.scalatest.Matchers 

import scala.collection.mutable.{ LinkedHashMap, ListBuffer }

@RunWith(classOf[JUnitRunner])
class ResourceListingValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "fail resource listing without base path" in {
    val jsonString = """
    {
      "apiVersion":"1.2.3",
      "swaggerVersion":"1.1"
    }
    """
    val listing = parse(jsonString).extract[ResourceListing]
    val errors = SwaggerValidator.validate(listing)
    // errors.size should be (1)
  }

  it should "fail resource listing without apiVersion" in {
    val jsonString = """
    {
      "basePath": "http://foo.com",
      "swaggerVersion":"1.1"
    }
    """
    val listing = parse(jsonString).extract[ResourceListing]
    val errors = SwaggerValidator.validate(listing)
    errors.size should be (1)
  }

  it should "fail with missing paths in a ResourceListing" in {
    val jsonString = """
    {
      "apiVersion":"1.2.3",
      "swaggerVersion":"1.1",
      "basePath":"http://foo/bar",
      "apis":[
        {
          "description":"path ab apis"
        },{
          "path":"/c",
          "description":"path c apis"
        }
      ]
    }
    """
    parse(jsonString).extract[ResourceListing] match {
      case e: ResourceListing => {
        e.apis.size should be (2)
        val errors = SwaggerValidator.validate(e)
        errors.size should be (1)
      }
      case _ => fail("didn't parse the underlying apis")
    }
  }
}

@RunWith(classOf[JUnitRunner])
class ApiListingReferenceValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize an ApiListingReference" in {
    val jsonString = """
    {
      "description":"the description"
    }
    """
    parse(jsonString).extract[ApiListingReference] match {
      case p: ApiListingReference => {
        p.description should be (Some("the description"))
        val errors = new ListBuffer[ValidationError]
        SwaggerValidator.validate(p, errors, "")
        errors.size should be (1)
      }
      case _ => fail("wrong type returned, should be ApiListingReference")
    }
  }

  it should "serialize an ApiListingReference" in {
    val l = ApiListingReference("/foo/bar", Some("the description"))
    write(l) should be ("""{"path":"/foo/bar","description":"the description"}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ApiDescriptionValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "fail to deserialize an ApiDescription with path, method, return type" in {
    val jsonString = """
    {
      "description":"the description",
      "operations":[
        {
          "summary":"the summary",
          "notes":"the notes",
          "nickname":"getMeSomeStrings",
          "parameters":[
            {
              "name":"id",
              "description":"the id",
              "defaultValue":"-1",
              "required":false,
              "allowMultiple":true,
              "dataType":"string",
              "allowableValues":{
                "valueType":"LIST",
                "values":["a","b","c"]
              },
              "paramType":"query"
            }
          ]
        }
      ]
    }
    """
    parse(jsonString).extract[ApiDescription] match {
      case p: ApiDescription => {
        val errors = new ListBuffer[ValidationError]
        SwaggerValidator.validate(p, errors, "")
        errors.size should be (3)
      }
      case _ => fail("wrong type returned, should be ApiDescription")
    }
  }
}

@RunWith(classOf[JUnitRunner])
class OperationValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "fail to deserialize an Operation with missing param type" in {
    val jsonString = """
    {
      "httpMethod":"GET",
      "summary":"the summary",
      "notes":"the notes",
      "responseClass":"string",
      "nickname":"getMeSomeStrings",
      "parameters":[
        {
          "name":"id",
          "description":"the id",
          "defaultValue":"-1",
          "required":false,
          "allowMultiple":true,
          "dataType":"string",
          "allowableValues":{
            "valueType":"LIST",
            "values":["a","b","c"]
          }
        }
      ]
    }
    """
    val json = parse(jsonString)
    json.extract[Operation] match {
      case op: Operation => {
        val errors = new ListBuffer[ValidationError]
        SwaggerValidator.validate(op, errors, "")
        errors.size should be (1)
      }
      case _ => fail("wrong type returned, should be Operation")
    }
  }

  it should "serialize an operation" in {
    val op = Operation(
      "get",
      "the summary",
      "the notes",
      "string",
      "getMeSomeStrings",
      0,
      List.empty,
      List.empty,
      List.empty,
      List.empty,
      List(Parameter("id", Some("the id"), Some("-1"), false, true, "string", AllowableListValues(List("a","b","c")), "query"))
    )
    write(op) should be ("""{"method":"get","summary":"the summary","notes":"the notes","responseClass":"string","nickname":"getMeSomeStrings","parameters":[{"name":"id","description":"the id","defaultValue":"-1","required":false,"allowMultiple":true,"dataType":"string","allowableValues":{"valueType":"LIST","values":["a","b","c"]},"paramType":"query"}]}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ResponseMessageValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize an ResponseMessage" in {
    val jsonString = """
    {
      "code":101,
      "reason":"the message"
    }
    """
    val json = parse(jsonString)
    json.extract[ResponseMessage] match {
      case p: ResponseMessage => {
        p.code should be (101)
        p.message should be ("the message")
      }
      case _ => fail("wrong type returned, should be ResponseMessage")
    }
  }

  it should "serialize an operation" in {
    val l = ResponseMessage(101, "the message")
    write(l) should be ("""{"code":101,"message":"the message"}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ParameterValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize another param" in {
    val jsonString = """
      {
        "name":"includeDuplicates",
        "defaultValue":"false",
        "description":"Show duplicate examples from different sources",
        "required":"false",
        "allowableValues":{
          "values":[
            false,
            true
          ],
          "valueType":"LIST"
        },
        "dataType":"string",
        "allowMultiple":false,
        "paramType":"query"
      }
    """
    val json = parse(jsonString)
    json.extract[Parameter] match {
      case p: Parameter => {
        p.name should be ("includeDuplicates")
        p.description should be (Some("Show duplicate examples from different sources"))
        p.defaultValue should be (Some("false"))
        p.required should be (false)
        p.allowMultiple should be (false)
        p.dataType should be ("string")
        p.paramType should be ("query")
      }
      case _ => fail("wrong type returned, should be Parameter")
    }
  }

  it should "deserialize a parameter" in {
    val jsonString = """
    {
      "name":"name",
      "description":"description",
      "defaultValue":"tony",
      "required":false,
      "allowMultiple":true,
      "dataType":"string",
      "paramType":"query"
    }
    """
    val json = parse(jsonString)
    json.extract[Parameter] match {
      case p: Parameter => {
        p.name should be ("name")
        p.description should be (Some("description"))
        p.defaultValue should be (Some("tony"))
        p.required should be (false)
        p.allowMultiple should be (true)
        p.dataType should be ("string")
        p.paramType should be ("query")
      }
      case _ => fail("wrong type returned, should be Parameter")
    }
  }

  it should "serialize a parameter" in {
    val l = Parameter("name", Some("description"), Some("tony"), false, true, "string", AnyAllowableValues, "query")
    write(l) should be ("""{"name":"name","description":"description","defaultValue":"tony","required":false,"allowMultiple":true,"dataType":"string","paramType":"query"}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ModelValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize a model" in {
    val jsonString = """
    {
      "id":"Foo",
      "name":"Bar",
      "properties": {
        "id": {
          "type":"string",
          "required":true,
          "description":"id"
        },
        "name": {
          "type":"string",
          "required":false,
          "description":"name"
        },
        "tags": {
          "type":"Array",
          "items": {
            "type":"string"
          }
        }
      },
      "description":"nice model"
    }
    """
    val json = parse(jsonString)
    json.extract[Model] match {
      case model: Model => {
        model.id should be ("Foo")
        model.name should be ("Bar")
        model.properties should not be (null)
        model.properties.size should be (3)
        model.description should be (Some("nice model"))
        model.properties("id") match {
          case e: ModelProperty => {
            e.`type` should be ("string")
            e.required should be (true)
            e.description should be (Some("id"))
          }
          case _ => fail("missing property id")
        }
        model.properties("name") match {
          case e: ModelProperty => {
            e.`type` should be ("string")
            e.required should be (false)
            e.description should be (Some("name"))
          }
          case _ => fail("missing property name")
        }

        model.properties("tags") match {
          case e: ModelProperty => {
            e.`type` should be ("Array")
            e.required should be (false)
            e.items match {
              case Some(items) => items.`type` should be ("string")
              case _ => fail("didn't find ref for Array")
            }
          }
          case _ => fail("missing property name")
        }
      }
      case _ => fail("expected type Model")
    }
  }

  it should "serialize a model" in {
    val ref = Model("Foo", "Bar", "Bar", (LinkedHashMap("s" -> ModelProperty("string", "string", 0, true, Some("a string")))))
    write(ref) should be ("""{"id":"Foo","name":"Bar","properties":{"s":{"type":"string","required":true,"description":"a string"}}}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ModelRefValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize a model ref" in {
    val jsonString = """
    {
      "$ref":"Foo",
      "type":"Bar"
    }
    """
    val json = parse(jsonString)
    json.extract[ModelRef] match {
      case p: ModelRef => {
        p.ref should be (Some("Foo"))
        p.`type` should be ("Bar")
      }
      case _ => fail("expected type ModelRef")
    }
  }

  it should "serialize a model ref" in {
    val ref = ModelRef("Foo", Some("Bar"))
    write(ref) should be ("""{"type":"Foo","$ref":"Bar"}""")
  }
}

@RunWith(classOf[JUnitRunner])
class ModelPropertyValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize a model property with allowable values and ref" in {
    val jsonString = """
    {
      "type":"string",
      "required":false,
      "description":"nice",
      "allowableValues": {
        "valueType":"LIST",
        "values":["1","2","3"]
      },
      "items":{
        "type":"Foo",
        "$ref":"Bar"
      }
    }
    """
    val json = parse(jsonString)
    json.extract[ModelProperty] match {
      case p: ModelProperty => {
        p.`type` should be ("string")
        p.required should be (false)
        p.description should be (Some("nice"))
        p.allowableValues match {
          case e: AllowableListValues => e.values should be (List("1","2","3"))
          case _ => fail("expected allowable values")
        }
        p.items match {
          case Some(e: ModelRef) => {
            e.`type` should be ("Foo")
            e.ref should be (Some("Bar"))
          }
          case _ => fail("expected type ModelProperty")
        }
      }
      case _ => fail("expected type ModelProperty")
    }
  }

  it should "serialize a model property with allowable values and ref" in {
    val p = ModelProperty("string", "string", 0, false, Some("nice"), AllowableListValues(List("a","b")),Some(ModelRef("Foo",Some("Bar"))))
    write(p) should be ("""{"type":"string","required":false,"description":"nice","allowableValues":{"valueType":"LIST","values":["a","b"]},"items":{"type":"Foo","$ref":"Bar"}}""")
  }

  it should "deserialize a model property with allowable values" in {
    val jsonString = """
    {
      "type":"string",
      "required":false,
      "description":"nice",
      "allowableValues": {
        "valueType":"LIST",
        "values":["1","2","3"]
      }
    }
    """
    val json = parse(jsonString)
    json.extract[ModelProperty] match {
      case p: ModelProperty => {
        p.`type` should be ("string")
        p.required should be (false)
        p.description should be (Some("nice"))
        p.allowableValues match {
          case e: AllowableListValues => e.values should be (List("1","2","3"))
          case _ => fail("expected allowable values")
        }
      }
      case _ => fail("expected type ModelProperty")
    }
  }

  it should "serialize a model property with allowable values" in {
    val p = ModelProperty("string", "string", 0, false, Some("nice"), AllowableListValues(List("a","b")))
    write(p) should be ("""{"type":"string","required":false,"description":"nice","allowableValues":{"valueType":"LIST","values":["a","b"]}}""")
  }

  it should "deserialize a model property" in {
    val jsonString = """
    {
      "type":"string",
      "required":true,
      "description":"nice"
    }
    """
    val json = parse(jsonString)
    json.extract[ModelProperty] match {
      case p: ModelProperty => {
        p.`type` should be ("string")
        p.required should be (true)
        p.description should be (Some("nice"))
      }
      case _ => fail("expected type ModelProperty")
    }
  }

  it should "serialize a model property" in {
    val p = ModelProperty("string", "string", 0, false, Some("nice"))
    write(p) should be ("""{"type":"string","required":false,"description":"nice"}""")
  }
}

@RunWith(classOf[JUnitRunner])
class AllowableValuesValidationTest extends FlatSpec with Matchers {
  implicit val formats = SwaggerSerializers.formats("1.1")

  it should "deserialize allowable value list" in {
    val allowableValuesListString = """
    {
      "valueType":"LIST",
      "values":["1","2","3"]
    }
    """
    val json = parse(allowableValuesListString)
    json.extract[AllowableValues] match {
      case avl: AllowableListValues => {
        avl.valueType should be ("LIST")
        avl.values should be (List("1","2","3"))        
      }
    }
  }

  it should "serialize allowable values list" in {
    val l = AllowableListValues(List("1","2","3"))
    write(l) should be ("""{"valueType":"LIST","values":["1","2","3"]}""")
  }

  it should "deserialize allowable values range" in {
    val allowableValuesRangeString = """
    {
      "valueType":"RANGE",
      "min":"abc",
      "max":3
    }
    """
    val json = parse(allowableValuesRangeString)
    json.extract[AllowableValues] match {
      case avr: AllowableRangeValues => {
        avr.min should be ("abc")
        avr.max should be ("3")        
      }
      case _ => fail("wrong type returned, should be AllowabeValuesList")
    }
  }

  it should "serialize allowable values range" in {
    val l = AllowableRangeValues("-1", "3")
    write(l) should be ("""{"valueType":"RANGE","min":"-1","max":"3"}""")
  }
}