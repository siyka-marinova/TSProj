import viewCommon = require("ui/core/view-common");
import geometry = require("utils/geometry");
export declare class View extends viewCommon.View {
    public _addViewCore(view: viewCommon.View): void;
    public _removeViewCore(view: viewCommon.View): void;
    public _onAttached(context: android.content.Context): void;
    public _onDetached(force?: boolean): void;
    public _clearAndroidReference(): void;
    public _onContextChanged(): void;
    public _setBounds(rect: geometry.Rect): void;
    public _getMeasureSpec(length: number, spec?: any): number;
    public _measureNativeView(availableSize: geometry.Size, options?: any): geometry.Size;
    public _nativeView : android.view.View;
}
