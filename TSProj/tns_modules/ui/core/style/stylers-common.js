var types = require("utils/types");
var trace = require("trace");

var containers = require("utils/containers");
var definition = require("ui/core/style/stylers");
var application = require("application");

var registeredStylers = new containers.Dictionary(new containers.StringComparer());

function registerStyler(viewType, styler) {
    registeredStylers.set(viewType, styler);
}
exports.registerStyler = registerStyler;

function getStyler(view) {
    var type = view.typeName;
    var result = registeredStylers.get(type);

    if (!result) {
        trace.write("Creating default styler for type: " + type, trace.categories.Style);
        result = new definition.DefaultStyler();
        exports.registerStyler(type, result);
    }

    return result;
}
exports.getStyler = getStyler;

var Styler = (function () {
    function Styler() {
        this._handlers = {};
        this.initHandlers(this._handlers);
    }
    Styler.prototype.initHandlers = function (handlers) {
    };

    Styler.prototype.onPropertyChanged = function (property, view, newValue) {
        if (global.android && !view.android) {
            return;
        }

        try  {
            var handler = this._handlers[property.id];
            if (!handler) {
                trace.write("No handler for property: " + property.name + ", view:" + view, trace.categories.Style);
                return;
            }

            trace.write("Found handler for property: " + property.name + ", view:" + view, trace.categories.Style);

            if (types.isUndefined(newValue)) {
                handler.resetProperty(view);
            } else {
                handler.applyProperty(view, newValue);
            }
        } catch (ex) {
            console.error("Error when setting property: " + property.name + " on view: " + view + " Error: " + ex);
        }
    };

    Styler.prototype.hasHandler = function (property) {
        return !!this._handlers[property.id];
    };
    return Styler;
})();
exports.Styler = Styler;

var StylePropertyChangedHandler = (function () {
    function StylePropertyChangedHandler(applyCallback, resetCallback, getNativeValue) {
        this._applyProperty = applyCallback;
        this._resetProperty = resetCallback;
        this._getNativeValue = getNativeValue;
    }
    Object.defineProperty(StylePropertyChangedHandler.prototype, "Property", {
        get: function () {
            return this._applyProperty;
        },
        enumerable: true,
        configurable: true
    });

    StylePropertyChangedHandler.prototype.applyProperty = function (view, newValue) {
        if (this._getNativeValue && !this._nativeValue) {
            this._nativeValue = this._getNativeValue(view);
        }

        if (application.android) {
            newValue = newValue.android ? newValue.android : newValue;
        } else if (application.ios) {
            newValue = newValue.ios ? newValue.ios : newValue;
        }

        this._applyProperty(view, newValue);
    };

    StylePropertyChangedHandler.prototype.resetProperty = function (view) {
        this._resetProperty(view, this._nativeValue);
    };
    return StylePropertyChangedHandler;
})();
exports.StylePropertyChangedHandler = StylePropertyChangedHandler;
