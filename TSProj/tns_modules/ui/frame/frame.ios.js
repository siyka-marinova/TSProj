var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var frameCommon = require("ui/frame/frame-common");

var geometry = require("utils/geometry");
var types = require("utils/types");
var trace = require("trace");

require("utils/module-merge").merge(frameCommon, exports);

var ALLOW_POP = "_allowPop";

var Frame = (function (_super) {
    __extends(Frame, _super);
    function Frame() {
        _super.call(this);
        this._ios = new iOSFrame(this);

        (this._layoutInfo).isLayoutSuspended = false;
    }
    Frame.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);

        if (this._paramToNavigate) {
            this.navigate(this._paramToNavigate);
            this._paramToNavigate = undefined;
        }
    };

    Frame.prototype.navigate = function (param) {
        if (this.isLoaded) {
            _super.prototype.navigate.call(this, param);
        } else {
            this._paramToNavigate = param;
        }
    };

    Frame.prototype._navigateCore = function (context) {
        var viewController = context.newPage.ios;
        if (!viewController) {
            throw new Error("Required page does have an viewController created.");
        }

        var animated = false;
        if (context.oldPage) {
            animated = this._getIsAnimatedNavigation(context.entry);
        }

        if (this.backStack.length > 0) {
            this._ios.showNavigationBar = true;
        }

        this._ios.controller.pushViewControllerAnimated(viewController, animated);
    };

    Frame.prototype._goBackCore = function (entry) {
        this._ios.controller[ALLOW_POP] = true;
        this._ios.controller.popViewControllerAnimated(this._getIsAnimatedNavigation(entry));
        this._ios.controller[ALLOW_POP] = false;

        if (this.backStack.length === 0) {
            this._ios.showNavigationBar = false;
        }
    };

    Object.defineProperty(Frame.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Frame.prototype, "_nativeView", {
        get: function () {
            return this._ios.controller.view;
        },
        enumerable: true,
        configurable: true
    });

    Frame.prototype._measureOverride = function (availableSize) {
        if (this.currentPage) {
            return this.currentPage.measure(new geometry.Size(availableSize.width, availableSize.height - this.navigationBarHeight));
        }

        return geometry.Size.zero;
    };

    Frame.prototype._arrangeOverride = function (finalSize) {
        if (this.currentPage) {
            this.currentPage.arrange(new geometry.Rect(0, this.navigationBarHeight, finalSize.width, finalSize.height - this.navigationBarHeight));
        }
    };

    Object.defineProperty(Frame.prototype, "navigationBarHeight", {
        get: function () {
            var navigationBar = this._ios.controller.navigationBar;
            return (navigationBar && !this._ios.controller.navigationBarHidden) ? navigationBar.frame.size.height : 0;
        },
        enumerable: true,
        configurable: true
    });

    Frame.prototype.arrangeView = function () {
        if (this.isLoaded) {
            this._updateLayout();
        }
    };

    Frame.prototype._getIsAnimatedNavigation = function (entry) {
        if (entry && entry.options && entry.options.ios && types.isDefined(entry.options.ios.animated)) {
            return entry.options.ios.animated;
        }

        return true;
    };
    return Frame;
})(frameCommon.Frame);
exports.Frame = Frame;

var body = {
    get owner() {
        return this._owner;
    },
    viewWillAppear: function (animated) {
        this.super.viewWillAppear(animated);
        trace.write(this.owner + " viewWillAppear", trace.categories.ViewHierarchy);
    },
    viewWillDisappear: function (animated) {
        this.super.viewWillDisappear(animated);
    },
    viewDidAppear: function (animated) {
        this.super.viewDidAppear(animated);
        trace.write(this.owner + " viewDidAppear", trace.categories.ViewHierarchy);

        this.owner.onLoaded();
    },
    viewDidDisappear: function (animated) {
        this.super.viewDidDisappear(animated);
    },
    viewDidLoad: function () {
        this.view.autoresizesSubviews = false;
    },
    viewDidLayoutSubviews: function () {
        trace.write(this.owner + " viewDidLayoutSubviews, isLoaded = " + this.owner.isLoaded, trace.categories.ViewHierarchy);
        this.owner.arrangeView();
    },
    popViewControllerAnimated: function (animated) {
        if (this[ALLOW_POP]) {
            this.super.popViewControllerAnimated(animated);
        } else {
            this.owner.goBack();
        }
    }
};

var uiNavigationControllerExtended = UINavigationController.extend(body);

var iOSFrame = (function () {
    function iOSFrame(view) {
        this._controller = new uiNavigationControllerExtended();
        this._controller["_owner"] = view;
        this.showNavigationBar = false;
    }
    Object.defineProperty(iOSFrame.prototype, "controller", {
        get: function () {
            return this._controller;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(iOSFrame.prototype, "showNavigationBar", {
        get: function () {
            return this._showNavigationBar;
        },
        set: function (value) {
            this._showNavigationBar = value;
            this._controller.navigationBarHidden = !value;
        },
        enumerable: true,
        configurable: true
    });
    return iOSFrame;
})();
