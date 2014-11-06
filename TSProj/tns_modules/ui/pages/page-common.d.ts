import contentView = require("ui/core/content-view");
import view = require("ui/core/view");
import dts = require("ui/pages");
import frame = require("ui/frame");
import styleScope = require("ui/core/style/style-scope");
export declare class Page extends contentView.ContentView implements dts.Page {
    private _frame;
    private _navigationContext;
    private _cssApplied;
    private _styleScope;
    public onLoaded(): void;
    public navigationContext : any;
    public css : string;
    public frame : frame.Frame;
    public onNavigatingTo(context: any): void;
    public onNavigatedTo(context: any): void;
    public onNavigatingFrom(): void;
    public onNavigatedFrom(): void;
    public _descendantLoaded(descendant: view.View): void;
    public _getStyleScope(): styleScope.StyleScope;
    private _applyCss();
    private _resetCssValues();
}
