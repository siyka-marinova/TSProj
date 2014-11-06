import pageCommon = require("ui/pages/page-common");
import view = require("ui/core/view");
export declare class Page extends pageCommon.Page {
    private _ios;
    private _contentAdded;
    constructor();
    public _onContentChanged(oldView: view.View, newView: view.View): void;
    private _addNativeView(view);
    private _removeNativeView(view);
    private arrangeView();
    public ios : UIViewController;
    public _nativeView : any;
}
