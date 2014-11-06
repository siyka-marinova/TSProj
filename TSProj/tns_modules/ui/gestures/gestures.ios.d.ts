import definition = require("ui/gestures");
import view = require("ui/core/view");
export declare class GesturesObserver implements definition.GesturesObserver {
    private _callback;
    private _target;
    private _recognizers;
    constructor(callback: (args: definition.GestureEventData) => void);
    public observe(target: view.View, type: definition.GestureTypes): void;
    public disconnect(): void;
    private _executeCallback(args);
    private _createRecognizer(type, callback?);
}
