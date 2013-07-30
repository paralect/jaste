
console.log("play.js")
console.log("in: " + this.constructor.name);

function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

prettyJSON(this);

function homePage() {
    console.log(this.constructor.name);
    layout(function() {
        builder.write("    <h1>Hello!</h1>\n");
    })
}

function layout(body) {
    builder.write("<body>\n");
    body();
    builder.write("</body>\n");
}

function Builder() {
    this.buffer = "";
}

Builder.prototype.write = function(str) {
    this.buffer += str;
}

Builder.prototype.content = function() {
    return this.buffer;
}

function render() {
    builder = new Builder();
    homePage();
    console.log(builder.content());
}

render();