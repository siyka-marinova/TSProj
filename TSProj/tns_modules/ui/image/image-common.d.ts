import dependencyObservable = require("ui/core/dependency-observable");
import view = require("ui/core/view");
import imageSource = require("image-source");
import definition = require("ui/image");
import geometry = require("utils/geometry");
export declare var urlProperty: dependencyObservable.Property;
export declare var sourceProperty: dependencyObservable.Property;
export declare var isLoadingProperty: dependencyObservable.Property;
export declare module stretch {
    var none: string;
    var aspectFill: string;
    var aspectFit: string;
    var fill: string;
}
export declare var stretchProeprty: dependencyObservable.Property;
export declare class Image extends view.View implements definition.Image {
    private _url;
    public source : imageSource.ImageSource;
    public url : string;
    public isLoading : boolean;
    public stretch : string;
    public _measureOverride(availableSize: geometry.Size): geometry.Size;
    private static computeScaleFactor(availableSize, contentSize, imageStretch);
}
