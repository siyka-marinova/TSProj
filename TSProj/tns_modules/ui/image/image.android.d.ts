import imageCommon = require("ui/image/image-common");
import geometry = require("utils/geometry");
export declare class Image extends imageCommon.Image {
    private _android;
    public android : android.widget.ImageView;
    public _createUI(): void;
    public measure(availableSize: geometry.Size, options?: any): geometry.Size;
}
