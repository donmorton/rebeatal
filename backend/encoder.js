// load filesystem module
var fs = require("fs");

// read JS file and execute it
var encode = function(){
var data = fs.readFileSync("access.js", {encoding: "utf8"});
eval(data);

// write data out to files
fs.writeFile("result1.json", JSON.stringify(an_array1));

}

modules.exports = encode;
