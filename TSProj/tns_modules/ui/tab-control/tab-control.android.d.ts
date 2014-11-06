import common = require("ui/tab-control/tab-control-common");
export declare class TabControl extends common.TabControl {
    private _android;
    private _adapter;
    private _tabListener;
    private _pageListener;
    constructor();
    public onLoaded(): void;
    public android : android.support.v4.view.ViewPager;
    public onUnloaded(): void;
    public _onItemsChanged(): void;
    public _createUI(): void;
    private _initializeListeners();
    private _updateActionBar();
    private _getActionBar();
    private _clearTabs(actionBar);
}
