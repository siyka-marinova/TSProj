import observable = require("ui/core/observable");
import dependencyObservable = require("ui/core/dependency-observable");
export interface BindingOptions {
    sourceProperty: string;
    targetProperty: string;
    twoWay?: boolean;
}
export declare class Bindable extends dependencyObservable.DependencyObservable {
    private _bindings;
    private _bindingContext;
    private _hasLocalContext;
    public bindingContext : Object;
    public bind(options: BindingOptions, source?: observable.Observable): void;
    public unbind(property: string): void;
    public updateTwoWayBinding(propertyName: string, value: any): void;
    public setPropertyCore(data: observable.PropertyChangeData): void;
    public _onPropertyChanged(property: dependencyObservable.Property, oldValue: any, newValue: any): void;
    public _onBindingContextChanged(): void;
}
