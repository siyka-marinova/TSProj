import common = require("ui/progress/progress-common");
export declare class Progress extends common.Progress {
    private _android;
    public _createUI(): void;
    public android : android.widget.ProgressBar;
}
