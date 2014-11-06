import definition = require("ui/frame");
import view = require("ui/core/view");
import pages = require("ui/pages");
export declare module knownEvents {
    module android {
        var optionSelected: string;
    }
}
export declare class Frame extends view.View implements definition.Frame {
    private _backStack;
    private _currentEntry;
    private _currentPage;
    public _isBackNavigation: boolean;
    public _isInFrameStack: boolean;
    constructor();
    public canGoBack(): boolean;
    public goBack(): void;
    public navigate(param: any): void;
    public _goBackCore(entry: definition.NavigationEntry): void;
    public _navigateCore(context: {
        entry: definition.NavigationEntry;
        oldPage: pages.Page;
        newPage: pages.Page;
    }): void;
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
    public backStack : definition.NavigationEntry[];
    public currentPage : pages.Page;
    public currentEntry : definition.NavigationEntry;
    public _pushInFrameStack(): void;
    public _popFromFrameStack(): void;
    public _childrenCount : number;
    public _eachChildView(callback: (child: view.View) => boolean): void;
    private _getTraceId();
}
export declare var topmost: () => Frame;
export declare function goBack(): boolean;
export declare function stack(): definition.Frame[];
