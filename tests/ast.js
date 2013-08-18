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

    ast("text injections",
        "if (1) { }",
        {
            "type": "Program",
            "body": [{
                "type": "IfStatement",
                "test": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1",
                    "range": [4, 5],
                    "loc": loc(1, 4, 1, 5)
                },
                "consequent": {
                    "type": "BlockStatement",
                    "body": [],
                    "range": [7, 10],
                    "loc": loc(1, 7, 1, 10)
                },
                "alternate": null,
                "range": [0, 10],
                "loc": loc(1, 0, 1, 10)
            }],
            "range": [0, 10],
            "loc": loc(1, 0, 1, 10),
            "comments": [],
            "tokens" : [{
                "type": "Keyword",
                "value": "if",
                "range": [0, 2],
                "loc": loc(1, 0, 1, 2)
            }, {
                "type": "Punctuator",
                "value": "(",
                "range": [3, 4],
                "loc": loc(1, 3, 1, 4)
            },
            {
                "type": "Numeric",
                "value": "1",
                "range": [4, 5],
                "loc": loc(1, 4, 1, 5)
            },
            {
                "type": "Punctuator",
                "value": ")",
                "range": [5, 6],
                "loc": loc(1, 5, 1, 6)
            },
            {
                "type": "Punctuator",
                "value": "{",
                "range": [7, 8],
                "loc": loc(1, 7, 1, 8)
            },
            {
                "type": "Punctuator",
                "value": "}",
                "range": [9, 10],
                "loc": loc(1, 9, 1, 10)
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