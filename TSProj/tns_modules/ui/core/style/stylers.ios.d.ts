import definition = require("ui/core/style/stylers");
import stylersCommon = require("ui/core/style/stylers-common");
export declare class DefaultStyler extends stylersCommon.Styler implements definition.Styler {
    private static setBackgroundProperty(view, newValue);
    private static resetBackgroundProperty(view, nativeValue);
    private static getNativeBackgroundValue(view);
    public initHandlers(handlers: any): void;
}
export declare class LabelStyler extends DefaultStyler {
    private static setColorProperty(view, newValue);
    private static resetColorProperty(view, nativeValue);
    private static getNativeColorValue(view);
    private static setFontSizeProperty(view, newValue);
    private static resetFontSizeProperty(view, nativeValue);
    private static getNativeFontSizeValue(view);
    public initHandlers(handlers: any): void;
}
export declare class ButtonStyler extends DefaultStyler {
    private static setColorProperty(view, newValue);
    private static resetColorProperty(view, nativeValue);
    private static getNativeColorValue(view);
    private static setFontSizeProperty(view, newValue);
    private static resetFontSizeProperty(view, nativeValue);
    private static getNativeFontSizeValue(view);
    public initHandlers(handlers: any): void;
}
export declare function _registerDefaultStylers(): void;
