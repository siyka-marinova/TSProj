import frameCommon = require("ui/frame/frame-common");
import definition = require("ui/frame");
import pages = require("ui/pages");
import geometry = require("utils/geometry");
export declare class Frame extends frameCommon.Frame {
    private _ios;
    private _paramToNavigate;
    constructor();
    public onLoaded(): void;
    public navigate(param: any): void;
    public _navigateCore(context: {
        entry: definition.NavigationEntry;
        oldPage: pages.Page;
        newPage: pages.Page;
    }): void;
    public _goBackCore(entry: definition.NavigationEntry): void;
    public ios : any;
    public _nativeView : any;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _arrangeOverride(finalSize: geometry.Size): void;
    private navigationBarHeight;
    private arrangeView();
    private _getIsAnimatedNavigation(entry);
}
