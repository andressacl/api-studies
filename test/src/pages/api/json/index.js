const {getTemplate} = require("./template.js")

function coletarBinary() {
  let byteArray = [45, 0, 123, 0, 31, 2, 115, 116, 114, 105, 110, 78, 0, 16, 43, 32, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return byteArray;
}

function toByteString(template, byteArray) {
  let binString = "";
  for (let i = 0; i < template.size; i++) {
    binString += byteArray[i].toString(2).padStart(8, '0');
  }
  return binString;
}

function binToInt(template, binary) {
  let byteArray = binary.splice(0, template.size).reverse();

  let binString = toByteString(template, byteArray);
  
  return parseInt(binString, 2)
}

function binToFloat(template, binary) {

  let byteArray = binary.splice(0, template.size).reverse();
  let binString = "";
  let floatNumber;

  for (let i = 0; i < template.size; i++) {
    binString += byteArray[i].toString(2).padStart(8, '0');
  }

  let numberOfBytes = (template.size == 4) ? 9 : 12;
  let sizeInBits = (template.size == 4) ? 32 : 64;

  let exponent = parseInt((binString.slice(1, numberOfBytes)), 2) - 127;
  let mantissa = parseInt('1' + binString.slice(numberOfBytes, sizeInBits), 2) / (2 ** 23);

  let absFloatNumber = 2 ** exponent * mantissa;

  floatNumber = (binString[0] === '0') ? (absFloatNumber) : (-absFloatNumber);

  return parseFloat(floatNumber.toPrecision(10));

}

function binToString(template, binary) {
    
  byteArray = binary.splice(0, binary.findIndex( value => value === 0));
  binary.shift();
  return String.fromCharCode(...byteArray);

}

const BinToData = {
  "int": binToInt,
  "float": binToFloat,
  "string": binToString
}

/*
41 :[12,0,123,0,31,2,115,116,114,105,110,103,86,14,73,64,0,0,0,0,0,0,0,0,0,0]
*/

let testJson = {
  "equipe": 41,
  "bateria": 24,
  "temperatura": 30,
  "pressao": 1,
  "giroscopio": [42, 90, 30],
  "acelerometro": [10, 3, 4],
  "payload": {
    "valor1": 420.1415,
    "classe": {
      "array1": [69, 123, 543],
      "valor2": "neste log a temperatura medida foi de 200 graus centigrados"
    }
  }
}

function applyTemplate(templates, binary) {

  for (const template of templates) {
    template.value = BinToData[template.typeName](template, binary);
  }
  
  return templates;
}

function getJSON(realJson, types) {
  let filledJSON = realJson;
  for (const type of types) {
    
    let tempJSON = filledJSON;
    let lastTag = type.path.pop();

    for (const tag of type.path) {

      tempJSON = tempJSON[tag];
    }

    tempJSON[lastTag] = type.value;

  }
  return filledJSON;
}

function main() {
  const binary = coletarBinary();
  const template = getTemplate(testJson);
  console.log(template)
  const answer = applyTemplate(template, binary);
  console.log(testJson.payload);

  let json = getJSON(testJson.payload, answer);
  console.log(json);
}

main();