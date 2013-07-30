(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.
    if (typeof define === 'function' && define.amd) {
        define(['exports', './jaste-esprima'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('./jaste-esprima'));
    } else {
        factory((root.esprima = {}));
    }
}(this, function (exports, esprima) {
    'use strict';

    function parse(str) {
        return esprima.parse(str, { comment : true, tokens : true, loc : true });
    }

    function generate(str) {
        var syntax = parse(str);
        return syntax.program;
    }

    exports.version = '0.0.1';
    exports.generate = generate;
    exports.parse = parse;
}));