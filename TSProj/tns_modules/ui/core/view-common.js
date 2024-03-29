var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var proxy = require("ui/core/proxy");
var style = require("ui/core/style/style");

var geometry = require("utils/geometry");
var layout = require("ui/core/layout");
var visualStateConstants = require("ui/core/style/visual-state-constants");
var trace = require("trace");
var dependencyObservable = require("ui/core/dependency-observable");
var gestures = require("ui/gestures");

var application;

function getViewById(view, id) {
    if (!view) {
        return undefined;
    }

    if (view.id === id) {
        return view;
    }

    var retVal;
    var descendantsCallback = function (child) {
        if (child.id === id) {
            retVal = child;

            return false;
        }

        return true;
    };

    exports.eachDescendant(view, descendantsCallback);
    return retVal;
}
exports.getViewById = getViewById;

function eachDescendant(view, callback) {
    if (!callback || !view) {
        return;
    }

    var viewStack = [view], currentView, continueIteration;

    var localCallback = function (child) {
        continueIteration = callback(child);
        if (continueIteration) {
            child._eachChildView(localCallback);
        }
        return continueIteration;
    };

    view._eachChildView(localCallback);
}
exports.eachDescendant = eachDescendant;

function getAncestor(view, typeName) {
    var parent = view.parent;

    while (parent && parent.typeName !== typeName) {
        parent = parent.parent;
    }

    return parent;
}
exports.getAncestor = getAncestor;

(function (knownEvents) {
    knownEvents.loaded = "loaded";
    knownEvents.unloaded = "unloaded";
})(exports.knownEvents || (exports.knownEvents = {}));
var knownEvents = exports.knownEvents;

var viewIdCounter = 0;

exports.isVisibleProperty = new dependencyObservable.Property("isVisible", "View", new proxy.PropertyMetadata(true, 1 /* AffectsMeasure */ | dependencyObservable.PropertyMetadataOptions.AffectsParentMeasure));

var View = (function (_super) {
    __extends(View, _super);
    function View() {
        _super.call(this);
        this._isAddedToNativeVisualTree = false;

        this._layoutInfo = new layout.LayoutInfo(this);

        this._style = new style.Style(this);
        this._domId = viewIdCounter++;
        this._visualState = visualStateConstants.Normal;
    }
    View.prototype.observe = function (type, callback) {
        this._gesturesObserver = gestures.observe(this, type, callback);
        return this._gesturesObserver;
    };

    View.prototype.toString = function () {
        return this.typeName;
    };

    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return this._layoutInfo.width;
        },
        set: function (value) {
            this._layoutInfo.width = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return this._layoutInfo.height;
        },
        set: function (value) {
            this._layoutInfo.height = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "maxWidth", {
        get: function () {
            return this._layoutInfo.maxWidth;
        },
        set: function (value) {
            this._layoutInfo.maxWidth = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "maxHeight", {
        get: function () {
            return this._layoutInfo.maxHeight;
        },
        set: function (value) {
            this._layoutInfo.maxHeight = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "minHeight", {
        get: function () {
            return this._layoutInfo.minHeight;
        },
        set: function (value) {
            this._layoutInfo.minHeight = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "minWidth", {
        get: function () {
            return this._layoutInfo.minWidth;
        },
        set: function (value) {
            this._layoutInfo.minWidth = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "horizontalAlignment", {
        get: function () {
            return this._layoutInfo.horizontalAlignment;
        },
        set: function (value) {
            this._layoutInfo.horizontalAlignment = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "verticalAlignment", {
        get: function () {
            return this._layoutInfo.verticalAlignment;
        },
        set: function (value) {
            this._layoutInfo.verticalAlignment = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "margin", {
        get: function () {
            return this._layoutInfo.margin;
        },
        set: function (value) {
            this._layoutInfo.margin = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "isVisible", {
        get: function () {
            return this._getValue(exports.isVisibleProperty);
        },
        set: function (value) {
            this._setValue(exports.isVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "style", {
        get: function () {
            return this._style;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        set: function (value) {
            this._cssClass = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "visualState", {
        get: function () {
            return this._visualState;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "cssType", {
        get: function () {
            return this.typeName.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "isLoaded", {
        get: function () {
            return this._isLoaded;
        },
        enumerable: true,
        configurable: true
    });

    View.prototype.measure = function (availableSize, options) {
        this._layoutInfo.measure(availableSize, options);
        return this._layoutInfo.desiredSize;
    };

    View.prototype.arrange = function (finalRect, options) {
        this._layoutInfo.arrange(finalRect, options);
    };

    View.prototype.onLoaded = function () {
        if (this._childrenCount > 0) {
            var eachChild = function (child) {
                child.onLoaded();
                return true;
            };
            this._eachChildView(eachChild);
        }

        var rootPage = exports.getAncestor(this, "Page");
        if (rootPage) {
            rootPage._descendantLoaded(this);
        }

        this.style._inheritStyleProperties();

        this._isLoaded = true;
        this.emit("loaded");
    };

    View.prototype.onUnloaded = function () {
        if (this._childrenCount > 0) {
            var eachChild = function (child) {
                child.onUnloaded();
                return true;
            };
            this._eachChildView(eachChild);
        }

        this._isLoaded = false;
        this.emit("unloaded");
    };

    View.prototype._onPropertyChanged = function (property, oldValue, newValue) {
        _super.prototype._onPropertyChanged.call(this, property, oldValue, newValue);

        var metadata = property.metadata;
        var affectsParentMeasure = metadata.affectsParentMeasure;
        var affectsParentArrange = metadata.affectsParentArrange;
        var affectsMeasure = metadata.affectsMeasure;
        var affectsArrange = metadata.affectsArrange;

        if (affectsMeasure) {
            this._invalidateMeasure();
        }
        if (affectsArrange) {
            this._invalidateArrange();
        }

        var parent = this.parent;
        if (affectsParentMeasure && parent) {
            parent._invalidateMeasure();
        }
        if (affectsParentArrange && parent) {
            parent._invalidateArrange();
        }
    };

    View.prototype._onBindingContextChanged = function () {
        _super.prototype._onBindingContextChanged.call(this);

        if (this._childrenCount === 0) {
            return;
        }

        var that = this;
        var eachChild = function (child) {
            child.bindingContext = that.bindingContext;
            return true;
        };
        this._eachChildView(eachChild);
    };

    View.prototype._invalidateMeasure = function () {
        return this._layoutInfo.invalidateMeasure();
    };

    View.prototype._invalidateArrange = function () {
        return this._layoutInfo.invalidateArrange();
    };

    View.prototype._measureOverride = function (availableSize, options) {
        return geometry.Size.zero;
    };

    View.prototype._arrangeOverride = function (finalSize) {
    };

    View.prototype._measureNativeView = function (availableSize, options) {
        return geometry.Size.zero;
    };

    View.prototype._setBounds = function (rect) {
        this._layoutBounds = rect;
    };

    View.prototype._getBounds = function () {
        return this._layoutBounds;
    };

    View.prototype._onAttached = function (context) {
    };

    View.prototype._onDetached = function (force) {
    };

    View.prototype._createUI = function () {
    };

    View.prototype._onContextChanged = function () {
    };

    View.prototype._getMeasureSpec = function (length) {
        return undefined;
    };

    Object.defineProperty(View.prototype, "_childrenCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });

    View.prototype._eachChildView = function (callback) {
    };

    View.prototype._addView = function (view) {
        if (!view) {
            throw new Error("Expecting a valid View instance.");
        }

        if (view._parent) {
            throw new Error("View already has a parent.");
        }

        view._parent = this;
        this._addViewCore(view);

        trace.write("called _addView on view " + this._domId + " for a child " + view._domId, trace.categories.ViewHierarchy);
    };

    View.prototype._addViewCore = function (view) {
        view.bindingContext = this.bindingContext;

        if (this._isLoaded) {
            view.onLoaded();
        }

        if (!view._isAddedToNativeVisualTree) {
            view._isAddedToNativeVisualTree = this._addViewToNativeVisualTree(view);
        }
    };

    View.prototype._removeView = function (view) {
        if (view._parent !== this) {
            throw new Error("View not added to this instance.");
        }

        this._removeViewCore(view);
        view._parent = undefined;

        trace.write("called _removeView on view " + this._domId + " for a child " + view._domId, trace.categories.ViewHierarchy);
    };

    View.prototype._removeViewCore = function (view) {
        this._removeViewFromNativeVisualTree(view);

        if (view.isLoaded) {
            view.onUnloaded();
        }

        view.bindingContext = undefined;
    };

    View.prototype._addViewToNativeVisualTree = function (view) {
        if (view._isAddedToNativeVisualTree) {
            throw new Error("Child already added to the native visual tree.");
        }

        return true;
    };

    View.prototype._removeViewFromNativeVisualTree = function (view) {
        if (!view._isAddedToNativeVisualTree) {
            throw new Error("Child is not added to the native visual tree.");
        }
        view._isAddedToNativeVisualTree = false;
    };

    View.prototype._syncNativeProperties = function () {
        _super.prototype._syncNativeProperties.call(this);

        this.style._syncNativeProperties();
    };

    View.prototype._goToVisualState = function (state) {
        trace.write(this + " going to state: " + state, trace.categories.Style);
        if (state === this._visualState || this._requestedVisualState === state) {
            return;
        }

        var vsm = require("ui/core/style/visual-state");
        this._visualState = vsm.goToState(this, state);

        this._requestedVisualState = state;
    };

    View.prototype._updateLayout = function () {
        this._layoutInfo.updateLayout();
    };

    Object.defineProperty(View.prototype, "_nativeView", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return View;
})(proxy.ProxyObject);
exports.View = View;
