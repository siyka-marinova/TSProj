import view = require("ui/core/view");
import definition = require("ui/text-field");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var textProperty: dependencyObservable.Property;
export declare class TextField extends view.View implements definition.TextField {
    public text : string;
}
