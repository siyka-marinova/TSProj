import common = require("ui/search-bar/search-bar-common");
export declare class SearchBar extends common.SearchBar {
    private _android;
    public _createUI(): void;
    public android : android.widget.SearchView;
}
