import view = require("ui/core/view");
import definition = require("ui/switch");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var checkedProperty: dependencyObservable.Property;
export declare class Switch extends view.View implements definition.Switch {
    public checked : boolean;
}
