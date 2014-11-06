import definition = require("ui/search-bar");
import view = require("ui/core/view");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var textProperty: dependencyObservable.Property;
export declare class SearchBar extends view.View implements definition.SearchBar {
    public text : string;
}
