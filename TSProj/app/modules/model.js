var observable = require("ui/core/observable");

var Model = (function () {
    function Model() {
        this.observable = new observable.Observable();
        this.observable.counter = 42;
    }
    Object.defineProperty(Model.prototype, "Text", {
        get: function () {
            return this.Counter + " taps left ";
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Model.prototype, "Counter", {
        get: function () {
            return this.observable.counter;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Model.prototype, "Observable", {
        get: function () {
            return this.observable;
        },
        enumerable: true,
        configurable: true
    });

    Model.prototype.action = function () {
        this.observable.counter--;
    };
    return Model;
})();

var model = new Model();
module.exports = model;
