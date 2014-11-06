import view = require("ui/core/view");
import dependencyObservable = require("ui/core/dependency-observable");
import definition = require("ui/core/style/stylers");
export declare function registerStyler(viewType: string, styler: definition.Styler): void;
export declare function getStyler(view: view.View): definition.Styler;
export declare class Styler implements definition.Styler {
    private _handlers;
    constructor();
    public initHandlers(handlers: any): void;
    public onPropertyChanged(property: dependencyObservable.Property, view: view.View, newValue: any): void;
    public hasHandler(property: dependencyObservable.Property): boolean;
}
export interface ApplyStylePropertyCallback {
    (view: view.View, newValue: any): void;
}
export interface GetNativeValueCallback {
    (view: view.View): any;
}
export interface ResetStylePropertyCallback {
    (view: view.View, nativeValue: any): void;
}
export declare class StylePropertyChangedHandler {
    private _nativeValue;
    private _applyProperty;
    private _resetProperty;
    private _getNativeValue;
    constructor(applyCallback: ApplyStylePropertyCallback, resetCallback: ResetStylePropertyCallback, getNativeValue?: GetNativeValueCallback);
    public Property : ApplyStylePropertyCallback;
    public applyProperty(view: view.View, newValue: any): void;
    public resetProperty(view: view.View): void;
}
