var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dependencyObservable = require("ui/core/dependency-observable");
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var imageSource = require("image-source");

var geometry = require("utils/geometry");
var trace = require("trace");

var SOURCE = "source";
var URL = "url";
var IMAGE = "Image";
var ISLOADING = "isLoading";
var STRETCH = "stretch";

function onUrlPropertyChanged(data) {
    var image = data.object;
    var value = data.newValue;

    image.source = null;

    if (value !== "") {
        image._setValue(exports.isLoadingProperty, true);

        imageSource.fromUrl(value).then(function (r) {
            if (image["_url"] === value) {
                image.source = r;
                image._setValue(exports.isLoadingProperty, false);
            }
        });
    }
}

exports.urlProperty = new dependencyObservable.Property(URL, IMAGE, new proxy.PropertyMetadata("", 0 /* None */, onUrlPropertyChanged));

exports.sourceProperty = new dependencyObservable.Property(SOURCE, IMAGE, new proxy.PropertyMetadata(undefined, 1 /* AffectsMeasure */));

exports.isLoadingProperty = new dependencyObservable.Property(ISLOADING, IMAGE, new proxy.PropertyMetadata(false, 0 /* None */));

(function (stretch) {
    stretch.none = "none";
    stretch.aspectFill = "aspectFill";
    stretch.aspectFit = "aspectFit";
    stretch.fill = "fill";
})(exports.stretch || (exports.stretch = {}));
var stretch = exports.stretch;

exports.stretchProeprty = new dependencyObservable.Property(STRETCH, IMAGE, new proxy.PropertyMetadata(stretch.aspectFit, 1 /* AffectsMeasure */));

var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Image.prototype, "source", {
        get: function () {
            return this._getValue(exports.sourceProperty);
        },
        set: function (value) {
            this._setValue(exports.sourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Image.prototype, "url", {
        get: function () {
            return this._getValue(exports.urlProperty);
        },
        set: function (value) {
            this._setValue(exports.urlProperty, value);
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Image.prototype, "isLoading", {
        get: function () {
            return this._getValue(exports.isLoadingProperty);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Image.prototype, "stretch", {
        get: function () {
            return this._getValue(exports.stretchProeprty);
        },
        set: function (value) {
            this._setValue(exports.stretchProeprty, value);
        },
        enumerable: true,
        configurable: true
    });

    Image.prototype._measureOverride = function (availableSize) {
        var nativeSize = this._measureNativeView(new geometry.Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));

        var infinteWidth = !isFinite(availableSize.width);
        var infinteHight = !isFinite(availableSize.height);

        if (infinteWidth && infinteHight) {
            return nativeSize;
        }

        var requestedRatio = nativeSize.width / nativeSize.height;

        if (nativeSize.width === 0 || nativeSize.height === 0) {
            return new geometry.Size(0, 0);
        }

        var scale = Image.computeScaleFactor(availableSize, nativeSize, this.stretch);
        var resultW = nativeSize.width * scale.width;
        var resultH = nativeSize.height * scale.height;

        resultW = Math.min(resultW, availableSize.width);
        resultH = Math.min(resultH, availableSize.height);

        var result = new geometry.Size(resultW, resultH);
        trace.write("Image measureOverride stretch: " + this.stretch + ", availableSize: " + availableSize + ", nativeSize: " + nativeSize + ", result: " + result, trace.categories.Layout);
        return result;
    };

    Image.computeScaleFactor = function (availableSize, contentSize, imageStretch) {
        var scaleW = 1;
        var scaleH = 1;
        var widthIsFinite = isFinite(availableSize.width);
        var heightIsFinite = isFinite(availableSize.height);

        if ((imageStretch === stretch.aspectFill || imageStretch === stretch.aspectFit || imageStretch === stretch.fill) && (widthIsFinite || heightIsFinite)) {
            scaleW = (contentSize.width > 0) ? availableSize.width / contentSize.width : 0;
            scaleH = (contentSize.height > 0) ? availableSize.height / contentSize.height : 0;

            if (!widthIsFinite) {
                scaleW = scaleH;
            } else if (!heightIsFinite) {
                scaleH = scaleW;
            } else {
                switch (imageStretch) {
                    case stretch.aspectFit:
                        scaleH = scaleW < scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                    case stretch.aspectFill:
                        scaleH = scaleW > scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                }
            }
        }
        return new geometry.Size(scaleW, scaleH);
    };
    return Image;
})(view.View);
exports.Image = Image;
