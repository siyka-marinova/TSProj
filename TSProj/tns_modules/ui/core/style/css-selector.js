var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var style = require("ui/core/style/style");

var observable = require("ui/core/dependency-observable");

var ID_SPECIFICITY = 10000;
var CLASS_SPECIFICITY = 100;
var TYPE_SPECIFICITY = 1;

var CssSelector = (function () {
    function CssSelector(expression, declarations) {
        this._expression = expression;
        this._declarations = declarations;
    }
    Object.defineProperty(CssSelector.prototype, "expression", {
        get: function () {
            return this._expression;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CssSelector.prototype, "declarations", {
        get: function () {
            return this._declarations;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CssSelector.prototype, "specificity", {
        get: function () {
            throw "Specificity property should is abstract";
        },
        enumerable: true,
        configurable: true
    });

    CssSelector.prototype.matches = function (view) {
        return false;
    };

    CssSelector.prototype.apply = function (view, scope) {
        this.eachSetter(function (property, value) {
            view.style._setValue(property, value, 2 /* Css */);
        });
    };

    CssSelector.prototype.eachSetter = function (callback) {
        var i, property, resolvedValue;

        for (i = 0; i < this._declarations.length; i++) {
            property = style.getPropertyByCssName(this._declarations[i].property);
            if (property) {
                resolvedValue = this._declarations[i].value;
                if (property.valueConverter) {
                    resolvedValue = property.valueConverter(resolvedValue);
                }
                callback(property, resolvedValue);
            }
        }
    };
    return CssSelector;
})();
exports.CssSelector = CssSelector;

var CssTypeSelector = (function (_super) {
    __extends(CssTypeSelector, _super);
    function CssTypeSelector() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CssTypeSelector.prototype, "specificity", {
        get: function () {
            return TYPE_SPECIFICITY;
        },
        enumerable: true,
        configurable: true
    });
    CssTypeSelector.prototype.matches = function (view) {
        return this.expression.toLowerCase() === view.typeName.toLowerCase();
    };
    return CssTypeSelector;
})(CssSelector);

var CssIdSelector = (function (_super) {
    __extends(CssIdSelector, _super);
    function CssIdSelector() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CssIdSelector.prototype, "specificity", {
        get: function () {
            return ID_SPECIFICITY;
        },
        enumerable: true,
        configurable: true
    });
    CssIdSelector.prototype.matches = function (view) {
        return this.expression === view.id;
    };
    return CssIdSelector;
})(CssSelector);

var CssClassSelector = (function (_super) {
    __extends(CssClassSelector, _super);
    function CssClassSelector() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CssClassSelector.prototype, "specificity", {
        get: function () {
            return CLASS_SPECIFICITY;
        },
        enumerable: true,
        configurable: true
    });
    CssClassSelector.prototype.matches = function (view) {
        return this.expression === view.cssClass;
    };
    return CssClassSelector;
})(CssSelector);

var CssVisualStateSelector = (function (_super) {
    __extends(CssVisualStateSelector, _super);
    function CssVisualStateSelector(expression, declarations) {
        _super.call(this, expression, declarations);

        var args = expression.split(COLON);
        this._key = args[0];
        this._state = args[1];

        if (this._key.charAt(0) === AMP) {
            this._match = this._key.substring(1);
            this._isById = true;
        } else if (this._key.charAt(0) === DOT) {
            this._match = this._key.substring(1);
            this._isByClass = true;
        } else if (this._key.length > 0) {
            this._match = this._key;
            this._isByType = true;
        }
    }
    Object.defineProperty(CssVisualStateSelector.prototype, "specificity", {
        get: function () {
            return (this._isById ? ID_SPECIFICITY : 0) + (this._isByClass ? CLASS_SPECIFICITY : 0) + (this._isByType ? TYPE_SPECIFICITY : 0);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CssVisualStateSelector.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CssVisualStateSelector.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });

    CssVisualStateSelector.prototype.matches = function (view) {
        var matches = true;
        if (this._isById) {
            matches = this._match === view.id;
        }

        if (this._isByClass) {
            matches = this._match === view.cssClass;
        }

        if (this._isByType) {
            matches = this._match === view.cssType.toLowerCase();
        }

        return matches;
    };
    return CssVisualStateSelector;
})(CssSelector);
exports.CssVisualStateSelector = CssVisualStateSelector;

var AMP = "#", DOT = ".", COLON = ":";

function createSelector(expression, declarations) {
    var colonIndex = expression.indexOf(COLON);
    if (colonIndex >= 0) {
        return new CssVisualStateSelector(expression, declarations);
    }

    if (expression.charAt(0) === AMP) {
        return new CssIdSelector(expression.substring(1), declarations);
    }

    if (expression.charAt(0) === DOT) {
        return new CssClassSelector(expression.substring(1), declarations);
    }

    return new CssTypeSelector(expression, declarations);
}
exports.createSelector = createSelector;
