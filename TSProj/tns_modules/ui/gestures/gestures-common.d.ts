import definition = require("ui/gestures");
import view = require("ui/core/view");
export declare enum GestureTypes {
    Tap,
    DoubleTap,
    Pinch,
    Pan,
    Swipe,
    Rotation,
    LongPress,
}
export declare enum GestureStateTypes {
    Possible,
    Recognized,
    Failed,
    Cancelled,
    Began,
    Changed,
    Ended,
}
export declare enum SwipeDirection {
    Right,
    Left,
    Up,
    Down,
}
export declare function observe(target: view.View, type: number, callback: (args: definition.GestureEventData) => void): definition.GesturesObserver;
export declare function toString(type: GestureTypes, separator?: string): string;
export declare function fromString(type: string): definition.GestureTypes;
