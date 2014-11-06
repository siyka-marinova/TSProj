import common = require("ui/button/button-common");
export declare class Button extends common.Button {
    private _android;
    private _isPressed;
    constructor();
    public android : android.widget.Button;
    public _createUI(): void;
    private onDrawableStateChanged();
}
