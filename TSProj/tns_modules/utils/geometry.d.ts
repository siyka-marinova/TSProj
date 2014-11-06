export declare class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number);
    static zero : Point;
    public equals(value: Point): boolean;
    static equals(value1: Point, value2: Point): boolean;
    public toString(): String;
}
export declare class Size {
    public width: number;
    public height: number;
    constructor(width: number, height: number);
    static empty : Size;
    static zero : Size;
    public isEmpty : boolean;
    public equals(value: Size): boolean;
    static equals(value1: Size, value2: Size): boolean;
    public toString(): String;
}
export declare class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    constructor(x: number, y: number, width: number, height: number);
    static empty : Rect;
    public size : Size;
    public origin : Point;
    public isEmpty : boolean;
    public equals(value: Rect): boolean;
    static equals(value1: Rect, value2: Rect): boolean;
    public toString(): String;
}
export declare class Thickness {
    public left: number;
    public top: number;
    public right: number;
    public bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    public equals(value: Thickness): boolean;
    static equals(value1: Thickness, value2: Thickness): boolean;
    public toString(): String;
}
