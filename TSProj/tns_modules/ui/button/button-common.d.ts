import dependencyObservable = require("ui/core/dependency-observable");
import view = require("ui/core/view");
import definition = require("ui/button");
export declare var textProperty: dependencyObservable.Property;
export declare class Button extends view.View implements definition.Button {
    public text : string;
}
