var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("ui/core/observable");

var ChangeType = (function () {
    function ChangeType() {
    }
    ChangeType.Add = "add";
    ChangeType.Delete = "delete";
    ChangeType.Update = "update";
    ChangeType.Splice = "splice";
    return ChangeType;
})();
exports.ChangeType = ChangeType;

var CHANGE = "change";

(function (knownEvents) {
    knownEvents.change = CHANGE;
})(exports.knownEvents || (exports.knownEvents = {}));
var knownEvents = exports.knownEvents;

var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray() {
        _super.call(this);

        if (arguments.length === 1 && Array.isArray(arguments[0])) {
            this._array = arguments[0].slice();
        } else {
            this._array = Array.apply(null, arguments);
        }

        this._addArgs = {
            eventName: CHANGE, object: this,
            action: ChangeType.Add,
            index: null,
            removed: new Array(),
            addedCount: 1
        };

        this._deleteArgs = {
            eventName: CHANGE, object: this,
            action: ChangeType.Delete,
            index: null,
            removed: null,
            addedCount: 0
        };
    }
    ObservableArray.prototype.getItem = function (index) {
        return this._array[index];
    };
    ObservableArray.prototype.setItem = function (index, value) {
        this._array[index] = value;

        this.notify({
            eventName: CHANGE, object: this,
            action: ChangeType.Update,
            index: index,
            removed: new Array(1),
            addedCount: 1
        });
    };

    Object.defineProperty(ObservableArray.prototype, "length", {
        get: function () {
            return this._array.length;
        },
        enumerable: true,
        configurable: true
    });

    ObservableArray.prototype.toString = function () {
        return this._array.toString();
    };

    ObservableArray.prototype.toLocaleString = function () {
        return this._array.toLocaleString();
    };

    ObservableArray.prototype.concat = function () {
        this._addArgs.index = this._array.length;

        var result = this._array.concat.apply(this._array, arguments);

        this._addArgs.addedCount = result.length - this._array.length;

        this.notify(this._addArgs);

        return result;
    };

    ObservableArray.prototype.join = function (separator) {
        return this._array.join(separator);
    };

    ObservableArray.prototype.pop = function () {
        this._deleteArgs.index = this._array.length - 1;

        var result = this._array.pop();

        this._deleteArgs.removed = [result];

        this.notify(this._deleteArgs);

        return result;
    };

    ObservableArray.prototype.push = function () {
        this._addArgs.index = this._array.length;

        if (arguments.length === 1 && Array.isArray(arguments[0])) {
            var source = arguments[0];

            for (var i = 0, l = source.length; i < l; i++) {
                this._array.push(source[i]);
            }
        } else {
            this._array.push.apply(this._array, arguments);
        }

        this._addArgs.addedCount = this._array.length - this._addArgs.index;

        this.notify(this._addArgs);

        return this._array.length;
    };

    ObservableArray.prototype.reverse = function () {
        return this._array.reverse();
    };

    ObservableArray.prototype.shift = function () {
        var result = this._array.shift();

        this._deleteArgs.index = 0;
        this._deleteArgs.removed = [result];

        this.notify(this._deleteArgs);

        return result;
    };

    ObservableArray.prototype.slice = function (start, end) {
        return this._array.slice(start, end);
    };

    ObservableArray.prototype.sort = function (compareFn) {
        return this._array.sort(compareFn);
    };

    ObservableArray.prototype.splice = function (start, deleteCount) {
        var length = this._array.length;
        var result = this._array.splice.apply(this._array, arguments);

        this.notify({
            eventName: CHANGE, object: this,
            action: ChangeType.Splice,
            index: start,
            removed: result,
            addedCount: this._array.length > length ? this._array.length - length : 0
        });

        return result;
    };

    ObservableArray.prototype.unshift = function () {
        var length = this._array.length;
        var result = this._array.unshift.apply(this._array, arguments);

        this._addArgs.index = 0;
        this._addArgs.addedCount = result - length;

        this.notify(this._addArgs);

        return result;
    };

    ObservableArray.prototype.indexOf = function (searchElement, fromIndex) {
        var index = fromIndex ? fromIndex : 0;
        for (var i = index, l = this._array.length; i < l; i++) {
            if (this._array[i] === searchElement) {
                return i;
            }
        }
        return -1;
    };

    ObservableArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
        var index = fromIndex ? fromIndex : this._array.length - 1;

        for (var i = index; i >= 0; i--) {
            if (this._array[i] === searchElement) {
                return i;
            }
        }
        return -1;
    };

    ObservableArray.prototype.every = function (callbackfn, thisArg) {
        return this._array.every(callbackfn, thisArg);
    };

    ObservableArray.prototype.some = function (callbackfn, thisArg) {
        return this._array.some(callbackfn, thisArg);
    };

    ObservableArray.prototype.forEach = function (callbackfn, thisArg) {
        this._array.forEach(callbackfn, thisArg);
    };

    ObservableArray.prototype.map = function (callbackfn, thisArg) {
        return this._array.map(callbackfn, thisArg);
    };

    ObservableArray.prototype.filter = function (callbackfn, thisArg) {
        return this._array.filter(callbackfn, thisArg);
    };

    ObservableArray.prototype.reduce = function (callbackfn, initialValue) {
        return this._array.reduce(callbackfn, initialValue);
    };

    ObservableArray.prototype.reduceRight = function (callbackfn, initialValue) {
        return this._array.reduceRight(callbackfn, initialValue);
    };
    return ObservableArray;
})(observable.Observable);
exports.ObservableArray = ObservableArray;
