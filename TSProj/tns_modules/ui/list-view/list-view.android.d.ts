import common = require("ui/list-view/list-view-common");
export declare class ListView extends common.ListView {
    private _android;
    public _createUI(): void;
    public android : android.widget.ListView;
    public refresh(): void;
}
