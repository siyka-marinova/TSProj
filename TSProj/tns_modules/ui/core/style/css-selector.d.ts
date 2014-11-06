import view = require("ui/core/view");
import style = require("ui/core/style/style");
import styleScope = require("ui/core/style/style-scope");
export declare class CssSelector {
    private _expression;
    private _declarations;
    constructor(expression: string, declarations: {
        property: string;
        value: any;
    }[]);
    public expression : string;
    public declarations : {
        property: string;
        value: any;
    }[];
    public specificity : number;
    public matches(view: view.View): boolean;
    public apply(view: view.View, scope: styleScope.StyleScope): void;
    public eachSetter(callback: (property: style.Property, resolvedValue: any) => void): void;
}
export declare class CssVisualStateSelector extends CssSelector {
    private _key;
    private _match;
    private _state;
    private _isById;
    private _isByClass;
    private _isByType;
    public specificity : number;
    public key : string;
    public state : string;
    constructor(expression: string, declarations: {
        property: string;
        value: any;
    }[]);
    public matches(view: view.View): boolean;
}
export declare function createSelector(expression: string, declarations: {
    property: string;
    value: any;
}[]): CssSelector;
