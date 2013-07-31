var assert = require("assert");
var fs = require('fs');
var path = require('path');
var jaste = require('../jaste');

describe('AST', function() {

    ast("semicolon",
        ";",
        {
            "type": "Program",
            "body": [{
                "type": "EmptyStatement",
                "range": [0, 1],
                "loc": loc(1, 0, 1, 1)
            }],
            "range": [0, 1],
            "loc": loc(1, 0, 1, 1),
            "comments": [],
            "tokens" : [{
                "type": "Punctuator",
                "value": ";" ,
                "range": [0, 1],
                "loc": loc(1, 0, 1, 1)
            }]
        }
    );

    ast("regexp",
        "/regexp/",
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": /regexp/,   // <--- check this
                    "raw": "/regexp/",
                    "range": [0, 8],
                    "loc": loc(1, 0, 1, 8)
                },
                "range": [0, 8],
                "loc": loc(1, 0, 1, 8)
            }],
            "range": [0, 8],
            "loc": loc(1, 0, 1, 8),
            "comments": [],
            "tokens" : [{
                "type": "RegularExpression",
                "value": "/regexp/",
                "range": [0, 8],
                "loc": loc(1, 0, 1, 8)
            }]
        }
    );
});

function ast(testName, source, astree) {
    it(testName, function () {
        var syntax = jaste.parseFull(source);
        delete syntax.program;
        assert.deepEqual(syntax, astree);
    });
}

function loc(startLine, startColumn, endLine, endColumn) {
    return {
        "start": { "line": startLine, "column": startColumn },
        "end": { "line": endLine, "column": endColumn }
    }
}