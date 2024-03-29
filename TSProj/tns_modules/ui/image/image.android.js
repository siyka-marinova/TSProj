var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var imageCommon = require("ui/image/image-common");

require("utils/module-merge").merge(imageCommon, exports);

function onStretchPropertyChanged(data) {
    var image = data.object;
    if (!image.android) {
        return;
    }

    switch (data.newValue) {
        case imageCommon.stretch.aspectFit:
            image.android.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
            break;
        case imageCommon.stretch.aspectFill:
            image.android.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
            break;
        case imageCommon.stretch.fill:
            image.android.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
            break;
        case imageCommon.stretch.none:
        default:
            image.android.setScaleType(android.widget.ImageView.ScaleType.MATRIX);
            break;
    }
}

function onSourcePropertyChanged(data) {
    var image = data.object;
    if (!image.android) {
        return;
    }

    if (image.android) {
        image.android.setImageBitmap(data.newValue ? data.newValue.android : null);
    }
}

imageCommon.sourceProperty.metadata.onSetNativeValue = onSourcePropertyChanged;
imageCommon.stretchProeprty.metadata.onSetNativeValue = onStretchPropertyChanged;

var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Image.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });

    Image.prototype._createUI = function () {
        this._android = new android.widget.ImageView(this._context);
    };

    Image.prototype.measure = function (availableSize, options) {
        return _super.prototype.measure.call(this, availableSize, true);
    };
    return Image;
})(imageCommon.Image);
exports.Image = Image;
