class Type {
    constructor(path, typeName, size) {
      this.path = path;
      this.typeName = typeName;
      this.size = size;
    }
  }
  
  const DataSizes = {
    "int": 2,
    "float": 4,
  }
  
  const ntypeof = (value) => {
    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        return "int"
      }
      return "float"
  
    }
    return typeof value;
  }
  
  function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
  }
  
  
  const iterate = (obj, paths = [], path = []) => {
    Object.keys(obj).forEach(key => {
      path.push(key)
      let currValue = obj[key]
      let typeName = ntypeof(currValue);
      if (typeName !== "object") {
  
        let size = DataSizes[typeName];
  
        paths.push(new Type(Array.from(path), typeName, size));
  
      }
      else {
        iterate(currValue, paths, path)
      }
  
      path.pop()
    })
  }
  
  
  const getTemplate = (obj) => {
    obj = obj["payload"] ? obj["payload"] : obj;
    let paths = [];
    iterate(obj, paths)
    return paths.sort((rhs, lhs) => {
      return JSON.stringify(rhs.path).localeCompare(JSON.stringify(lhs.path));
    });
  }
  
  module.exports = {getTemplate,Type};  