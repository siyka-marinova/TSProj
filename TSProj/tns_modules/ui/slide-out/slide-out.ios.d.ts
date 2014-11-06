import common = require("ui/slide-out/slide-out-common");
import view = require("ui/core/view");
import geometry = require("utils/geometry");
export declare class SlideOutControl extends common.SlideOutControl {
    constructor();
    private _ios;
    public ios : any;
    private _toggleSlideContentVisibility(value);
    public openSlideContent(): void;
    public closeSlideContent(): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _addViewToNativeVisualTree(view: view.View): boolean;
    public _removeViewFromNativeVisualTree(child: view.View): void;
}
