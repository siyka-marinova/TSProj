import definition = require("ui/core/panel");
import view = require("ui/core/view");
import geometry = require("utils/geometry");
export declare class Panel extends view.View implements definition.Panel {
    private _children;
    constructor();
    public children : view.View[];
    public getChildById(id: string): view.View;
    public addChild(child: view.View): void;
    public removeChild(child: view.View): void;
    public _childrenCount : number;
    public _eachChildView(callback: (child: view.View) => boolean): void;
    public _addViewToNativeVisualTree(child: view.View): boolean;
    public _removeViewFromNativeVisualTree(child: view.View): void;
    public _measureChildren(availableSize: geometry.Size): geometry.Size;
    public _arrangeChildren(finalSize: geometry.Size): void;
}
