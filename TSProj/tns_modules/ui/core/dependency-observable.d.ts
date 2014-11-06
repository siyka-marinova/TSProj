import observable = require("ui/core/observable");
export declare enum PropertyMetadataOptions {
    None = 0,
    AffectsMeasure = 1,
    AffectsArrange,
    AffectsParentMeasure,
    AffectsParentArrange,
    Inheritable,
}
export declare enum ValueSource {
    Default = 0,
    Inherited = 1,
    Css = 2,
    Local = 3,
    VisualState = 4,
}
export interface PropertyChangeData extends observable.EventData {
    property: Property;
    oldValue: any;
    newValue: any;
}
export interface PropertyChangedCallback {
    (data: PropertyChangeData): void;
}
export interface PropertyValidateValueCallback {
    (value: any): boolean;
}
export declare class PropertyMetadata {
    private _defaultValue;
    private _options;
    private _onChanged;
    private _onValidateValue;
    constructor(defaultValue: any, options?: PropertyMetadataOptions, onChanged?: PropertyChangedCallback, onValidateValue?: PropertyValidateValueCallback);
    public defaultValue : any;
    public options : PropertyMetadataOptions;
    public onValueChanged : PropertyChangedCallback;
    public onValidateValue : PropertyValidateValueCallback;
    public affectsMeasure : boolean;
    public affectsArrange : boolean;
    public affectsParentMeasure : boolean;
    public affectsParentArrange : boolean;
    public inheritable : boolean;
}
export declare class Property {
    private _metadata;
    private _key;
    private _name;
    private _ownerType;
    private _id;
    constructor(name: string, ownerType: string, metadata: PropertyMetadata);
    public name : string;
    public id : number;
    public metadata : PropertyMetadata;
    public isValidValue(value: Object): boolean;
    public _getEffectiveValue(entry: PropertyEntry): any;
}
export declare class PropertyEntry {
    private _property;
    private _valueSource;
    private _inheritedValue;
    private _cssValue;
    private _localValue;
    private _effectiveValue;
    private _visualStateValue;
    constructor(property: Property);
    public property : Property;
    public effectiveValue : any;
    public valueSource : ValueSource;
    public localValue : any;
    public inheritedValue : any;
    public cssValue : any;
    public visualStateValue : any;
    public resetValue(): void;
}
export declare class DependencyObservable extends observable.Observable {
    private _propertyEntries;
    public setProperty(name: string, value: any): void;
    public getProperty(name: string): any;
    public _setValue(property: Property, value: any, source?: ValueSource): void;
    public _getValueSource(property: Property): ValueSource;
    public _getValue(property: Property): any;
    public _resetValue(property: Property, source?: ValueSource): void;
    public _onPropertyChanged(property: Property, oldValue: any, newValue: any): void;
    public _eachSetProperty(callback: (property: Property) => boolean): void;
}
