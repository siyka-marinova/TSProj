import bindable = require("ui/core/bindable");
import dependencyObservable = require("ui/core/dependency-observable");
export declare class PropertyMetadata extends dependencyObservable.PropertyMetadata {
    private _onSetNativeValue;
    constructor(defaultValue: any, options?: dependencyObservable.PropertyMetadataOptions, onChanged?: dependencyObservable.PropertyChangedCallback, onValidateValue?: dependencyObservable.PropertyValidateValueCallback, onSetNativeValue?: dependencyObservable.PropertyChangedCallback);
    public onSetNativeValue : dependencyObservable.PropertyChangedCallback;
}
export declare class ProxyObject extends bindable.Bindable {
    private _updatingJSProperty;
    public android : any;
    public ios : any;
    public _onPropertyChanged(property: dependencyObservable.Property, oldValue: any, newValue: any): void;
    public _onPropertyChangedFromNative(property: dependencyObservable.Property, newValue: any): void;
    public _syncNativeProperties(): void;
    private _trySetNativeValue(property, value?);
}
