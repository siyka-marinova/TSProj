import definition = require("ui/tab-control");
import view = require("ui/core/view");
export declare class TabControl extends view.View implements definition.TabControl {
    private _items;
    public _synchronizingSelection: boolean;
    constructor();
    public items : definition.TabEntry[];
    public _onItemsChanged(): void;
    public _childrenCount : number;
    public _eachChildView(callback: (child: view.View) => boolean): void;
}
