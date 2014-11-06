import common = require("ui/slide-out/slide-out-common");
import view = require("ui/core/view");
import geometry = require("utils/geometry");
export declare class SlideOutControl extends common.SlideOutControl {
    private _android;
    private _toggle;
    private _optionSelectedCallback;
    private _optionsCallbackAdded;
    constructor();
    public _createUI(): void;
    public android : android.support.v4.widget.DrawerLayout;
    public _addViewToNativeVisualTree(child: view.View): boolean;
    public _removeViewFromNativeVisualTree(child: view.View): void;
    public _getMeasureSpec(length: number): number;
    public _onDetached(force?: boolean): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    private _createToggle();
}
