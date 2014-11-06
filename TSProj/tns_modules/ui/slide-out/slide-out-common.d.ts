import definition = require("ui/slide-out");
import view = require("ui/core/view");
import dependencyObservable = require("ui/core/dependency-observable");
import geometry = require("utils/geometry");
export declare var slideContentWidthProperty: dependencyObservable.Property;
export declare var optionsProperty: dependencyObservable.Property;
export declare class SlideOutControl extends view.View implements definition.SlideOutControl {
    private _slideContent;
    private _mainContent;
    public options : definition.Options;
    public slideContentWidth : number;
    public slideContent : view.View;
    public mainContent : view.View;
    public openSlideContent(): void;
    public closeSlideContent(): void;
    public _childrenCount : number;
    public _eachChildView(callback: (child: view.View) => boolean): void;
    public _attachSlideContent(): void;
    public _detachSlideContent(): void;
    public _attachMainContent(): void;
    public _detachMainContent(): void;
    public _onSlideWidthChanged(): void;
    public _onOptionsChanged(): void;
    public _arrangeOverride(finalSize: geometry.Size): void;
}
