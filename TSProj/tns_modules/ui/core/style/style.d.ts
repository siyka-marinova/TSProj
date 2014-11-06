import observable = require("ui/core/dependency-observable");
import color = require("color");
import view = require("ui/core/view");
export declare function getPropertyByName(name: string): Property;
export declare function getPropertyByCssName(name: string): Property;
export declare function eachProperty(callback: (property: Property) => void): void;
export declare function eachInheritableProperty(callback: (property: Property) => void): void;
export declare class Property extends observable.Property {
    private _cssName;
    private _valueConverter;
    constructor(name: string, cssName: string, metadata: observable.PropertyMetadata, valueConverter?: (value: any) => any);
    public cssName : string;
    public valueConverter : (value: any) => any;
    public _getEffectiveValue(entry: observable.PropertyEntry): any;
}
export declare class Style extends observable.DependencyObservable {
    private _view;
    private _styler;
    public color : color.Color;
    public backgroundColor : color.Color;
    public fontSize : number;
    constructor(parentView: view.View);
    public _resetCssValues(): void;
    public _onPropertyChanged(property: observable.Property, oldValue: any, newValue: any): void;
    public _syncNativeProperties(): void;
    private _applyProperty(property, newValue);
    public _inheritStyleProperty(property: observable.Property): void;
    public _inheritStyleProperties(): void;
}
export declare var colorProperty: Property;
export declare var backgroundColorProperty: Property;
export declare var fontSizeProperty: Property;
