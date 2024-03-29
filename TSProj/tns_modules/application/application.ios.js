var appModule = require("application/application-common");
var frame = require("ui/frame");

var geometry = require("utils/geometry");

require("utils/module-merge").merge(appModule, exports);

exports.mainModule;

var RootWindow = (function () {
    function RootWindow() {
        var WindowClass = UIWindow.extend({
            layoutSubviews: function () {
                this.rootWindow.layoutSubviews();
            }
        });

        this._uiWindow = new WindowClass(UIScreen.mainScreen().bounds);
        this._uiWindow.autoresizesSubviews = false;
        this._uiWindow.autoresizingMask = 0 /* UIViewAutoresizingNone */;
        this._uiWindow.rootWindow = this;
    }
    Object.defineProperty(RootWindow.prototype, "uiWindow", {
        get: function () {
            return this._uiWindow;
        },
        enumerable: true,
        configurable: true
    });

    RootWindow.prototype.layoutSubviews = function () {
        if (!this._frame) {
            return;
        }

        var window = this._uiWindow;
        var statusFrame = UIApplication.sharedApplication().statusBarFrame;
        var statusBarHeight = 0;

        try  {
            statusBarHeight = Math.min(statusFrame.size.width, statusFrame.size.height);
        } catch (ex) {
            console.log("exception: " + ex);
        }

        var windowFrame = window.frame;
        var transformedBounds = windowFrame;
        var bounds;

        var device = UIDevice.currentDevice();
        if (device.orientation === 3 /* UIDeviceOrientationLandscapeLeft */ || device.orientation === 4 /* UIDeviceOrientationLandscapeRight */) {
            bounds = new geometry.Rect(transformedBounds.origin.x + statusBarHeight, transformedBounds.origin.y, transformedBounds.size.height - statusBarHeight, transformedBounds.size.width);
        } else {
            bounds = new geometry.Rect(transformedBounds.origin.x, transformedBounds.origin.y + statusBarHeight, transformedBounds.size.width, transformedBounds.size.height - statusBarHeight);
        }

        this._frame.measure(bounds.size);
        this._frame.arrange(bounds);
    };
    return RootWindow;
})();

var iOSApplication = (function () {
    function iOSApplication() {
        this.nativeApp = UIApplication.sharedApplication();
    }
    iOSApplication.prototype.init = function () {
        var that = this;
        UIResponder.extend({
            applicationDidFinishLaunchingWithOptions: function () {
                var rootWindow = new RootWindow();
                var window = rootWindow.uiWindow;
                this.window = window;
                this.window.backgroundColor = UIColor.whiteColor();

                if (exports.onLaunch) {
                    exports.onLaunch();
                }

                var topFrame = frame.topmost();
                if (!topFrame) {
                    if (exports.mainModule) {
                        topFrame = new frame.Frame();
                        topFrame.navigate(exports.mainModule);
                    } else {
                        return;
                    }
                }
                rootWindow._frame = topFrame;
                this.window.rootViewController = topFrame.ios.controller;

                this.window.makeKeyAndVisible();
                return true;
            },
            applicationDidBecomeActive: function (application) {
                if (exports.onResume) {
                    exports.onResume();
                }
            },
            applicationWillResignActive: function (application) {
            },
            applicationDidEnterBackground: function (application) {
                if (exports.onSuspend) {
                    exports.onSuspend();
                }
            },
            applicationWillEnterForeground: function (application) {
            },
            applicationWillTerminate: function (application) {
                if (exports.onExit) {
                    exports.onExit();
                }
            },
            applicationDidReceiveMemoryWarning: function (application) {
                if (exports.onLowMemory) {
                    exports.onLowMemory();
                }
            },
            applicationOpenURLSourceApplicationAnnotation: function (application, url, annotation) {
                var dictionary = new NSMutableDictionary();
                dictionary.setObjectForKey(url, "TLKApplicationOpenURL");
                dictionary.setObjectForKey(application, "TLKApplication");
                NSNotificationCenter.defaultCenter().postNotificationNameObjectUserInfo("com.telerik.TLKApplicationOpenURL", null, dictionary);
            }
        }, {
            name: "TNSAppDelegate",
            protocols: [UIApplicationDelegate]
        });
    };
    return iOSApplication;
})();

var app = new iOSApplication();
exports.ios = app;
app.init();

exports.start = function () {
    UIApplicationMain(0, null, null, "TNSAppDelegate");
};
