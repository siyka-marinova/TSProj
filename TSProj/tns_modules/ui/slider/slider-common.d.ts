import view = require("ui/core/view");
import definition = require("ui/slider");
import dependencyObservable = require("ui/core/dependency-observable");
export declare var valueProperty: dependencyObservable.Property;
export declare var maxValueProperty: dependencyObservable.Property;
export declare class Slider extends view.View implements definition.Slider {
    constructor();
    public value : number;
    public maxValue : number;
}
