import view = require("ui/core/view");
import definition = require("ui/label");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var textProperty: dependencyObservable.Property;
export declare var textWrapProperty: dependencyObservable.Property;
export declare class Label extends view.View implements definition.Label {
    public text : string;
    public textWrap : boolean;
}
