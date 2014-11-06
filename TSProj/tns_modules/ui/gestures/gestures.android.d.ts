import definition = require("ui/gestures");
import view = require("ui/core/view");
export declare class GesturesObserver implements definition.GesturesObserver {
    private _callback;
    private _target;
    private _simpleGestureDetector;
    private _scaleGestureDetector;
    private _swipeGestureDetector;
    private _onTargetLoaded;
    constructor(callback: (args: definition.GestureEventData) => void);
    public observe(target: view.View, type: definition.GestureTypes): void;
    public disconnect(): void;
    private _attach(target, type);
}
