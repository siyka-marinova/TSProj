var common = require("ui/gestures/gestures-common");
var definition = require("ui/gestures");

require("utils/module-merge").merge(common, exports);

var SWIPE_THRESHOLD = 100;
var SWIPE_VELOCITY_THRESHOLD = 100;

var GesturesObserver = (function () {
    function GesturesObserver(callback) {
        this._callback = callback;
    }
    GesturesObserver.prototype.observe = function (target, type) {
        var _this = this;
        if (target) {
            if (target.isLoaded) {
                this._attach(target, type);
            } else {
                this._onTargetLoaded = function (args) {
                    _this._attach(target, type);
                };
                target.on("loaded", this._onTargetLoaded);
            }
        }
    };

    GesturesObserver.prototype.disconnect = function () {
        if (this._target) {
            if (this._target.android) {
                this._target.android.setOnTouchListener(null);
            }

            if (this._onTargetLoaded != null) {
                this._target.off("loaded", this._onTargetLoaded);
                this._onTargetLoaded = null;
            }
        }

        this._simpleGestureDetector = null;
        this._scaleGestureDetector = null;
        this._swipeGestureDetector = null;

        this._target = null;
    };

    GesturesObserver.prototype._attach = function (target, type) {
        this.disconnect();

        this._target = target;

        var that = this;
        var callback = this._callback;

        if (type & definition.GestureTypes.Tap || type & definition.GestureTypes.DoubleTap || type & definition.GestureTypes.LongPress || type & definition.GestureTypes.Pan) {
            var listenerType = android.view.GestureDetector.SimpleOnGestureListener.extend({
                onSingleTapConfirmed: function (motionEvent) {
                    var args = _getArgs(definition.GestureTypes.Tap, target, motionEvent);
                    _executeCallback(callback, args);
                    return true;
                },
                onDoubleTap: function (motionEvent) {
                    var args = _getArgs(definition.GestureTypes.DoubleTap, target, motionEvent);
                    _executeCallback(callback, args);
                    return true;
                },
                onDown: function (motionEvent) {
                    return true;
                },
                onLongPress: function (motionEvent) {
                    var args = _getArgs(definition.GestureTypes.LongPress, target, motionEvent);
                    _executeCallback(callback, args);
                    return true;
                },
                onScroll: function (initialEvent, currentEvent, distanceX, distanceY) {
                    var args = _getPanArgs(target, initialEvent, currentEvent);
                    _executeCallback(callback, args);
                    return true;
                }
            });

            this._simpleGestureDetector = new android.support.v4.view.GestureDetectorCompat(target._context, new listenerType());
        }

        if (type & definition.GestureTypes.Pinch) {
            var listenerType = android.view.ScaleGestureDetector.SimpleOnScaleGestureListener.extend({
                onScale: function (detector) {
                    var args = {
                        type: definition.GestureTypes.Pinch,
                        view: target,
                        android: detector,
                        scale: detector.getScaleFactor()
                    };

                    _executeCallback(callback, args);
                    return true;
                }
            });

            this._scaleGestureDetector = new android.view.ScaleGestureDetector(target._context, new listenerType());
        }

        if (type & definition.GestureTypes.Swipe) {
            var listenerType = android.view.GestureDetector.SimpleOnGestureListener.extend({
                onDown: function (motionEvent) {
                    return true;
                },
                onFling: function (initialEvent, currentEvent, velocityX, velocityY) {
                    var result = false;

                    try  {
                        var deltaY = currentEvent.getY() - initialEvent.getY();
                        var deltaX = currentEvent.getX() - initialEvent.getX();

                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD) {
                                if (deltaX > 0) {
                                    var args = _getSwipeArgs(definition.SwipeDirection.Right, target, initialEvent, currentEvent);
                                    _executeCallback(callback, args);

                                    result = true;
                                } else {
                                    var args = _getSwipeArgs(definition.SwipeDirection.Left, target, initialEvent, currentEvent);
                                    _executeCallback(callback, args);

                                    result = true;
                                }
                            }
                        } else {
                            if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(velocityY) > SWIPE_VELOCITY_THRESHOLD) {
                                if (deltaY > 0) {
                                    var args = _getSwipeArgs(definition.SwipeDirection.Down, target, initialEvent, currentEvent);
                                    _executeCallback(callback, args);

                                    result = true;
                                } else {
                                    var args = _getSwipeArgs(definition.SwipeDirection.Up, target, initialEvent, currentEvent);
                                    _executeCallback(callback, args);

                                    result = true;
                                }
                            }
                        }
                    } catch (ex) {
                    }

                    return result;
                }
            });

            this._swipeGestureDetector = new android.support.v4.view.GestureDetectorCompat(target._context, new listenerType());
        }

        target.android.setOnTouchListener(new android.view.View.OnTouchListener({
            onTouch: function (view, motionEvent) {
                if (that._simpleGestureDetector) {
                    that._simpleGestureDetector.onTouchEvent(motionEvent);
                }

                if (that._scaleGestureDetector) {
                    that._scaleGestureDetector.onTouchEvent(motionEvent);
                }

                if (that._swipeGestureDetector) {
                    that._swipeGestureDetector.onTouchEvent(motionEvent);
                }

                if (type & definition.GestureTypes.Rotation && motionEvent.getPointerCount() === 2) {
                    var deltaX = motionEvent.getX(0) - motionEvent.getX(1);
                    var deltaY = motionEvent.getY(0) - motionEvent.getY(1);
                    var radians = Math.atan(deltaY / deltaX);
                    var degrees = radians * (180 / Math.PI);

                    var args = {
                        type: definition.GestureTypes.Rotation,
                        view: that._target,
                        android: motionEvent,
                        rotation: degrees
                    };

                    _executeCallback(callback, args);
                }

                return true;
            }
        }));
    };
    return GesturesObserver;
})();
exports.GesturesObserver = GesturesObserver;

function _getArgs(type, view, e) {
    return {
        type: type,
        view: view,
        android: e
    };
}

function _getSwipeArgs(direction, view, initialEvent, currentEvent) {
    return {
        type: definition.GestureTypes.Swipe,
        view: view,
        android: { initial: initialEvent, current: currentEvent },
        direction: direction
    };
}

function _getPanArgs(view, initialEvent, currentEvent) {
    return {
        type: definition.GestureTypes.Pan,
        view: view,
        android: { initial: initialEvent, current: currentEvent }
    };
}

function _executeCallback(callback, args) {
    if (callback) {
        callback(args);
    }
}
