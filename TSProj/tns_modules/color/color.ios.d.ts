import common = require("color/color-common");
export declare class Color extends common.Color {
    private _ios;
    public ios : UIColor;
    public _argbFromString(hex: string): number;
}
