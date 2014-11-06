import pageCommon = require("ui/pages/page-common");
import definition = require("ui/pages");
export declare class Page extends pageCommon.Page {
    private _androidPage;
    constructor();
    public android : definition.AndroidPage;
    public _nativeView : android.view.View;
    public _onDetached(force?: boolean): void;
    public _clearAndroidReference(): void;
}
