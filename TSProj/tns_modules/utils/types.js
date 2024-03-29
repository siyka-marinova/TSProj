function isString(value) {
    return typeof value === "string";
}
exports.isString = isString;

function isNumber(value) {
    return typeof value === "number";
}
exports.isNumber = isNumber;

function isFunction(value) {
    if (!value) {
        return false;
    }
    return typeof value === "function";
}
exports.isFunction = isFunction;

function isUndefined(value) {
    return typeof value === "undefined";
}
exports.isUndefined = isUndefined;

function isDefined(value) {
    return typeof value !== "undefined";
}
exports.isDefined = isDefined;

function verifyCallback(value) {
    if (value && !exports.isFunction(value)) {
        throw new TypeError("Callback must be a valid function.");
    }
}
exports.verifyCallback = verifyCallback;

var funcNameRegex = /function (.{1,})\(/;
function getClass(object) {
    var results = (funcNameRegex).exec((object).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
}
exports.getClass = getClass;
