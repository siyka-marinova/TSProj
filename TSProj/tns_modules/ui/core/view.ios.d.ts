import viewCommon = require("ui/core/view-common");
import geometry = require("utils/geometry");
export declare class View extends viewCommon.View {
    public _addViewCore(view: viewCommon.View): void;
    public _removeViewCore(view: viewCommon.View): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _measureNativeView(availableSize: geometry.Size, options?: any): geometry.Size;
    public _setBounds(rect: geometry.Rect): void;
    public onLoaded(): void;
    public _nativeView : any;
}
