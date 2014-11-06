import frameCommon = require("ui/frame/frame-common");
import definition = require("ui/frame");
import pages = require("ui/pages");
import geometry = require("utils/geometry");
export declare class Frame extends frameCommon.Frame {
    private _android;
    private _delayedEntry;
    private _isFirstNavigation;
    constructor();
    public onLoaded(): void;
    public _navigateCore(context: {
        entry: definition.NavigationEntry;
        oldPage: pages.Page;
        newPage: pages.Page;
    }): void;
    public _goBackCore(entry: definition.NavigationEntry): void;
    public _onNavigatingTo(context: {
        entry: definition.NavigationEntry;
        oldPage: pages.Page;
        newPage: pages.Page;
    }): void;
    public _onNavigatedTo(context: {
        entry: definition.NavigationEntry;
        oldPage: pages.Page;
        newPage: pages.Page;
    }): void;
    public android : definition.AndroidFrame;
    public _createUI(): void;
    public _onActivityCreated(): void;
    public _popFromFrameStack(): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public _arrangeOverride(finalSize: geometry.Size): void;
    public _setBounds(rect: geometry.Rect): void;
    public _nativeView : any;
    public _clearAndroidReference(): void;
}
