import common = require("ui/text-field/text-field-common");
export declare class TextField extends common.TextField {
    private _android;
    public android : android.widget.EditText;
    public _createUI(): void;
}
