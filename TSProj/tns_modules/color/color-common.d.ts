import definition = require("color");
export declare class Color implements definition.Color {
    private _a;
    private _r;
    private _g;
    private _b;
    private _hex;
    private _argb;
    private _name;
    constructor();
    public a : number;
    public r : number;
    public g : number;
    public b : number;
    public argb : number;
    public hex : string;
    public name : string;
    public ios : UIColor;
    public android : number;
    public _argbFromString(hex: string): number;
    private _buildHex();
    private _componentToHex(component);
    private _parseComponents();
    private _buildArgb();
}
