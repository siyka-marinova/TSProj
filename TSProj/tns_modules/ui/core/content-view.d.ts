import view = require("ui/core/view");
import geometry = require("utils/geometry");
export declare class ContentView extends view.View {
    private _content;
    public content : view.View;
    public _onContentChanged(oldView: view.View, newView: view.View): void;
    public _childrenCount : number;
    public _eachChildView(callback: (child: view.View) => boolean): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _arrangeOverride(finalSize: geometry.Size): void;
}
