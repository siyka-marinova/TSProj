import geometry = require("utils/geometry");
import common = require("ui/tab-control/tab-control-common");
export declare class TabControl extends common.TabControl {
    private _ios;
    private _selectedView;
    private _delegate;
    private _preparedItems;
    constructor();
    public ios : UIViewController;
    public _nativeView : UIView;
    private _prepareItems();
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _arrangeOverride(finalSize: geometry.Size): void;
    private arrangeView();
}
