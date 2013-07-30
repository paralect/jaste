var assert = require("assert");
var fs = require('fs');
var path = require('path');
var jaste = require('../jaste');

function identical(testName, source) {
    it(testName, function () {
        var syntax = jaste.generate(source);
        assert.equal(syntax, source);
    });
}

function identicalFile(testName, filePath) {
    it(testName, function (done) {
        fs.readFile(filePath, 'utf8', function (error, source) {
            if (error)
                throw error;

            var program = jaste.generate(source);
            assert.equal(program, source);
            done();
        });
    });
}

describe('Identical', function() {

    identical("empty",
        "");

    identical("semicolon",
        ";");

    identical("regexp",
        "/hello/;");

    identical("regexp source",
        '/regexp/.source');

    identical("regexp",
        "/hello/");

    identical("newline and regexp",
        "\n" +
        "/hello/");

    identical("two regexps",
        '/hello/\n\n;' +
        '/regexp/;');

    identical("regexp and semicolon on new line",
        "/json/\n" +
        ";\n" +
        "/java/");

    identical("comment after if",
        "if /*asdf*/ (true) true;"
    );

    identical("two functions",
        'var answer = function() { 5 + 6;  } \n' +
        ' function dima(arg) { return 5; } ');

    identical("regexp and function",
        'var answer = /[+-]?\d+/gi;  \n' +
        'function dima(arg) { return 5; } ');

    identical("block comment",
        '/* comment */');

    identical("one line comment",
        '//comment');

    identical("comment and regexp",
        '// comment 1\n' +
        '/regexp/;\n' +
        '// comment 2');

    identical("example with two regexps",
        "var z = { json: /json/\n" +
        "\n" +
        "};\n" +
        "\n" +
        "var a = {\n" +
        "    contents: {\n" +
        "        script: /(?:java|ecma)script/\n" +
        "    },\n" +
        "};");

    identicalFile("jQuery",
        path.resolve(__dirname, 'files/jquery-2.0.3.js'));

    identicalFile("jQuery min",
        path.resolve(__dirname, 'files/jquery-2.0.3.min.js'));

    identicalFile("Acorn",
        path.resolve(__dirname, 'files/acorn.js'));

    identicalFile("Underscore",
        path.resolve(__dirname, 'files/underscore.js'));

    identicalFile("Underscore",
        path.resolve(__dirname, 'files/underscore-min.js'));

    identicalFile("Angular",
        path.resolve(__dirname, 'files/Angular.js'));
})

describe('simple', function() {
    it('should aga', function() {
        assert.equal(1, 1);

    });

    it('should wait', function(done) {
        setTimeout(function() {
            done();
        }, 10);
    });
})