var esprima = require('./../jaste-esprima');
var fs = require('fs');
//var process = require('process');

//var syntax = esprima.parse(
//    'var answer;',
//    { comment : true, tokens : true, loc : true });

var app =
    'var a = 50;\n' +
    'zzz = 56;\n' +
    'zz2 = 56;\n' +
    'function dima() {\n' +
    '    var q = 1;   \n' +
    '    var w = 2;   \n' +
    '}\n';

app =
    'var a = 50;\n' +
    '<text> z <text>hohoh </text>hello </text>';


//app =
//    '// comment 1\n' +
//    '/regexp/;\n'
//
//app = '/* comment */';

//app =
//"// asdfasdf\n" +
//"var rkeyEvent = /^key/,\n " +
//"    rmouseEvent = /^(?:mouse|contextmenu)|click/;"

//app = "\n" +
//      "/reggy/;";

var syntax = esprima.parse(
    app,
    { comment : true, tokens : true, loc : true });

/*
fs.readFile('/home/dmitry/dev/esprima-play/jquery-2.0.3.js', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    var start = process.hrtime();
    var syntax = esprima.parse(data, { comment : true, tokens : true, loc : true });

    var precision = 3;
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - "); // print message + time

    fs.writeFile("/home/dmitry/tmp/js/jquery-2.0.3.js", syntax.program, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

});
*/

prettyJSON(syntax);
//
//console.log(escodegen.generate(syntax));
//
//
//
console.log("*** Before ***");
console.log(app);

console.log();
console.log("*** After parsing ***")
console.log(syntax.program);
console.log("Done.");


function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}