import view = require("ui/core/view");
import definition = require("ui/list-view");
import dependencyObservable = require("ui/core/dependency-observable");
export declare module knownEvents {
    var itemLoading: string;
    var itemTap: string;
    var loadMoreItems: string;
}
export declare var itemsProperty: dependencyObservable.Property;
export declare var isScrollingProperty: dependencyObservable.Property;
export declare class ListView extends view.View implements definition.ListView {
    private _itemsChanged;
    constructor();
    public items : any;
    public isScrolling : boolean;
    public refresh(): void;
}
