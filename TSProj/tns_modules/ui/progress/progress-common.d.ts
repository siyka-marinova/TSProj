import definition = require("ui/progress");
import view = require("ui/core/view");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var valueProperty: dependencyObservable.Property;
export declare var maxValueProperty: dependencyObservable.Property;
export declare class Progress extends view.View implements definition.Progress {
    constructor();
    public maxValue : number;
    public value : number;
}
