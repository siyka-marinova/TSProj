import common = require("ui/button/button-common");
export declare class Button extends common.Button {
    private _ios;
    private _clickHandler;
    private _stateChangedHandler;
    constructor();
    public ios : UIButton;
    private _controlStateFromVisualState();
}
