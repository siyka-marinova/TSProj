import definition = require("ui/core/layout");
export declare module alignment {
    var left: number;
    var center: number;
    var right: number;
    var stretch: number;
}
export declare class HorizontalAlignment implements definition.HorizontalAlignment {
    static left: number;
    static center: number;
    static right: number;
    static stretch: number;
}
export declare class VerticalAlignment implements definition.VerticalAlignment {
    static top: number;
    static center: number;
    static bottom: number;
    static stretch: number;
}
export declare class MinMax {
    public minHeight: number;
    public maxHeight: number;
    public minWidth: number;
    public maxWidth: number;
    constructor(layoutInfo: definition.LayoutInfo);
    public toString(): String;
}
