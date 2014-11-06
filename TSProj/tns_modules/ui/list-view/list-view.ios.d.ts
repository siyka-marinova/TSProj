import common = require("ui/list-view/list-view-common");
import geometry = require("utils/geometry");
export declare class ListView extends common.ListView {
    private _ios;
    private _dataSource;
    private _uiTableViewDelegate;
    private _availableWidth;
    private _heights;
    constructor();
    public ios : UITableView;
    public refresh(): void;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    public getHeight(index: number): number;
    public setHeight(index: number, value: number): void;
}
