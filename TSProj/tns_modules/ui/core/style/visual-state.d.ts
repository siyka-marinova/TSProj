import viewModule = require("ui/core/view");
export declare class VisualState {
    private _name;
    private _setters;
    constructor();
    public setters : {};
}
export declare function goToState(view: viewModule.View, state: string): string;
