var types = require("utils/types");

(function (knownEvents) {
    knownEvents.propertyChange = "propertyChange";
})(exports.knownEvents || (exports.knownEvents = {}));
var knownEvents = exports.knownEvents;

var Observable = (function () {
    function Observable() {
        this._observers = {};
    }
    Object.defineProperty(Observable.prototype, "typeName", {
        get: function () {
            return types.getClass(this);
        },
        enumerable: true,
        configurable: true
    });

    Observable.prototype.on = function (eventNames, callback, thisArg) {
        this.addEventListener(eventNames, callback);
    };

    Observable.prototype.off = function (eventNames, callback) {
        this.removeEventListener(eventNames, callback);
    };

    Observable.prototype.addEventListener = function (eventNames, callback, thisArg) {
        verifyCallback(callback);
        var events = eventNames.split(",");

        for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i].trim();
            var list = this._getEventList(event, true);

            list.push({
                callback: callback,
                thisArg: thisArg
            });
        }
    };

    Observable.prototype.removeEventListener = function (eventNames, callback) {
        var events = eventNames.split(",");

        for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i].trim();
            if (callback) {
                var list = this._getEventList(event, false);
                if (list) {
                    var index = this._indexOfListener(list, callback);
                    if (index >= 0) {
                        list.splice(index, 1);
                    }
                    if (list.length === 0) {
                        delete this._observers[event];
                    }
                }
            } else {
                this._observers[event] = undefined;
                delete this._observers[event];
            }
        }
    };

    Observable.prototype.setProperty = function (name, value) {
        if (this[name] === value) {
            return;
        }

        var data = this.createPropertyChangeData(name, value);

        this.setPropertyCore(data);
        this.notify(data);
    };

    Observable.prototype.getProperty = function (name) {
        return this[name];
    };

    Observable.prototype.setPropertyCore = function (data) {
        this[data.propertyName] = data.value;
    };

    Observable.prototype.notify = function (data) {
        var observers = this._getEventList(data.eventName);
        if (!observers) {
            return;
        }

        var i;
        var entry;

        for (i = 0; i < observers.length; i++) {
            entry = observers[i];
            if (entry.thisArg) {
                entry.callback.apply(entry.thisArg, [data]);
            } else {
                entry.callback(data);
            }
        }
    };

    Observable.prototype.hasListeners = function (eventName) {
        return eventName in this._observers;
    };

    Observable.prototype.createPropertyChangeData = function (name, value) {
        return {
            eventName: knownEvents.propertyChange,
            propertyName: name,
            object: this,
            value: value
        };
    };

    Observable.prototype.emit = function (eventNames) {
        var events = eventNames.split(",");

        for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i].trim();
            this.notify({ eventName: event, object: this });
        }
    };

    Observable.prototype._getEventList = function (eventName, createIfNeeded) {
        if (!eventName) {
            throw new TypeError("EventName must be valid string.");
        }

        var list = this._observers[eventName];
        if (!list && createIfNeeded) {
            list = [];
            this._observers[eventName] = list;
        }

        return list;
    };

    Observable.prototype._indexOfListener = function (list, callback) {
        var i;
        var entry;

        for (i = 0; i < list.length; i++) {
            entry = list[i];
            if (entry.callback === callback) {
                return i;
            }
        }

        return -1;
    };
    return Observable;
})();
exports.Observable = Observable;

function verifyCallback(callback) {
    if (!callback || !types.isFunction(callback)) {
        throw new TypeError("Callback must be a valid function.");
    }
}
