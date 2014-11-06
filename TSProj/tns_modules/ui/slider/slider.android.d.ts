import common = require("ui/slider/slider-common");
export declare class Slider extends common.Slider {
    private _android;
    private _changeListener;
    public _createUI(): void;
    public android : android.widget.SeekBar;
}
