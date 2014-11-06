import panelCommon = require("ui/core/panel-common");
export declare class Panel extends panelCommon.Panel {
    private _viewGroup;
    public android : android.view.ViewGroup;
    public _createUI(): void;
    public _onDetached(force?: boolean): void;
}
