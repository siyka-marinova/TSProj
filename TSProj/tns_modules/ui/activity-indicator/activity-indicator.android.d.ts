import aiCommon = require("ui/activity-indicator/activity-indicator-common");
export declare class ActivityIndicator extends aiCommon.ActivityIndicator {
    private _android;
    public _createUI(): void;
    public android : android.widget.ProgressBar;
}
