import view = require("ui/core/view");
import definition = require("ui/activity-indicator");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var busyProperty: dependencyObservable.Property;
export declare class ActivityIndicator extends view.View implements definition.ActivityIndicator {
    public busy : boolean;
}
