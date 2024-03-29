var common = require("ui/core/layout-common");
var geometry = require("utils/geometry");
var view = require("ui/core/view");

var trace = require("trace");

require("utils/module-merge").merge(common, exports);

var LayoutInfo = (function () {
    function LayoutInfo(view) {
        this._minSize = geometry.Size.zero;
        this._size = new geometry.Size(Number.NaN, Number.NaN);
        this._maxSize = new geometry.Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        this.availableSize = geometry.Size.zero;
        this.desiredSize = geometry.Size.zero;
        this.renderSize = geometry.Size.zero;
        this._margin = new geometry.Thickness(0, 0, 0, 0);
        this._horizontalAlignment = common.HorizontalAlignment.stretch;
        this._verticalAlignment = common.VerticalAlignment.stretch;
        this.needsClipBounds = false;
        this.visualOffset = geometry.Point.zero;
        this._view = view;
    }
    LayoutInfo.isMaxWidthHeightValid = function (value) {
        return !isNaN(value) && value >= 0.0;
    };

    LayoutInfo.isMinWidthHeightValid = function (value) {
        return !isNaN(value) && value >= 0.0 && isFinite(value);
    };

    LayoutInfo.isWidthHeightValid = function (value) {
        return isNaN(value) || (value >= 0.0 && isFinite(value));
    };

    Object.defineProperty(LayoutInfo.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "parent", {
        get: function () {
            return this.view.parent;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "width", {
        get: function () {
            return this._size.width;
        },
        set: function (value) {
            var valid = LayoutInfo.isWidthHeightValid(value);
            if (!valid) {
                throw new Error("Width must be NaN or positive number.");
            }
            var size = this._size;
            if (value !== size.width) {
                this.invalidateMeasure();
            }

            this.setSize(value, size.height);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "height", {
        get: function () {
            return this._size.height;
        },
        set: function (value) {
            var valid = LayoutInfo.isWidthHeightValid(value);
            if (!valid) {
                throw new Error("Height must be NaN or >= 0.");
            }

            var size = this._size;
            if (value !== size.height) {
                this.invalidateMeasure();
            }

            this.setSize(size.width, value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "maxWidth", {
        get: function () {
            return this._maxSize.width;
        },
        set: function (value) {
            var valid = LayoutInfo.isMaxWidthHeightValid(value);
            if (!valid) {
                throw new Error("MaxWidth must be >= 0.");
            }

            var maxSize = this._maxSize;
            if (value !== maxSize.width) {
                this.invalidateMeasure();
            }

            this.setMaxSize(value, maxSize.height);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "maxHeight", {
        get: function () {
            return this._maxSize.height;
        },
        set: function (value) {
            var valid = LayoutInfo.isMaxWidthHeightValid(value);
            if (!valid) {
                throw new Error("MaxHeight must be >= 0.");
            }

            var maxSize = this._maxSize;
            if (value !== maxSize.height) {
                this.invalidateMeasure();
            }

            this.setMaxSize(maxSize.width, value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "minHeight", {
        get: function () {
            return this._minSize.height;
        },
        set: function (value) {
            var valid = LayoutInfo.isMinWidthHeightValid(value);
            if (!valid) {
                throw new Error("MinHeight must be >= 0 and not INFINITY.");
            }

            var minSize = this._minSize;
            if (value !== minSize.height) {
                this.invalidateMeasure();
            }

            this.setMinSize(minSize.width, value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "minWidth", {
        get: function () {
            return this._minSize.width;
        },
        set: function (value) {
            var valid = LayoutInfo.isMinWidthHeightValid(value);
            if (!valid) {
                throw new Error("MinWidth must be >= 0 and not INFINITY.");
            }

            var minSize = this._minSize;
            if (value !== minSize.width) {
                this.invalidateMeasure();
            }

            this.setMinSize(value, minSize.height);
        },
        enumerable: true,
        configurable: true
    });

    LayoutInfo.prototype.setMinSize = function (minWidth, minHeight) {
        this._minSize = new geometry.Size(minWidth, minHeight);
    };

    LayoutInfo.prototype.setMaxSize = function (maxWidth, maxHeight) {
        this._maxSize = new geometry.Size(maxWidth, maxHeight);
    };

    LayoutInfo.prototype.setSize = function (width, height) {
        this._size = new geometry.Size(width, height);
    };

    Object.defineProperty(LayoutInfo.prototype, "horizontalAlignment", {
        get: function () {
            return this._horizontalAlignment;
        },
        set: function (value) {
            if (this._horizontalAlignment !== value) {
                this._horizontalAlignment = value;
                this.invalidateArrange();
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "verticalAlignment", {
        get: function () {
            return this._verticalAlignment;
        },
        set: function (value) {
            if (this._verticalAlignment !== value) {
                this._verticalAlignment = value;
                this.invalidateArrange();
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "margin", {
        get: function () {
            return this._margin;
        },
        set: function (margin) {
            if (!geometry.Thickness.equals(this._margin, margin)) {
                this._margin = margin;
                this.invalidateMeasure();
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "isVisible", {
        get: function () {
            return this.view._getValue(view.isVisibleProperty);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LayoutInfo.prototype, "nativeView", {
        get: function () {
            return this._view._nativeView;
        },
        enumerable: true,
        configurable: true
    });

    LayoutInfo.prototype.invalidateMeasure = function () {
        if (this.nativeView) {
            this.nativeView.requestLayout();
        }
    };

    LayoutInfo.prototype.invalidateArrange = function () {
        this.invalidateMeasure();
    };

    LayoutInfo.prototype.measure = function (availableSize, options) {
        trace.write("Measure: " + this.view + " with: " + availableSize, trace.categories.Layout);
        if (isNaN(availableSize.width) || isNaN(availableSize.height)) {
            throw new Error("Layout NaN measure.");
        }

        this.availableSize = new geometry.Size(availableSize.width, availableSize.height);
        var size = this.measureCore(this.availableSize, options);
        var width = size.width;
        var height = size.height;

        if (!isFinite(width) || !isFinite(height) || isNaN(width) || isNaN(height)) {
            throw new Error("Layout Infinity/NaN returned.");
        }

        this.desiredSize = size;
        trace.write(this.view + " - DesiredSize = " + size, trace.categories.Layout);
    };

    LayoutInfo.prototype.measureCore = function (availableSize, options) {
        var margin = this._margin;
        var horizontalMargin = (margin) ? margin.left + margin.right : 0.0;
        var verticalMargin = (margin) ? margin.top + margin.bottom : 0.0;

        var mm = new common.MinMax(this);
        var frameworkAvailableSize = new geometry.Size(Math.max(availableSize.width - horizontalMargin, 0), Math.max(availableSize.height - verticalMargin, 0));

        frameworkAvailableSize.width = Math.max(mm.minWidth, Math.min(frameworkAvailableSize.width, mm.maxWidth));
        frameworkAvailableSize.height = Math.max(mm.minHeight, Math.min(frameworkAvailableSize.height, mm.maxHeight));

        var inNativeMeasure = false;
        if (typeof options === "boolean") {
            inNativeMeasure = options;
        }

        var desiredSize;
        if (inNativeMeasure) {
            desiredSize = this.view._measureOverride(frameworkAvailableSize, options);
        } else {
            desiredSize = this.view._measureNativeView(frameworkAvailableSize, options);
        }

        desiredSize.width = Math.max(desiredSize.width, mm.minWidth);
        desiredSize.height = Math.max(desiredSize.height, mm.minHeight);
        var clipped = false;
        if (desiredSize.width > mm.maxWidth) {
            desiredSize.width = mm.maxWidth;
            clipped = true;
        }

        if (desiredSize.height > mm.maxHeight) {
            desiredSize.height = mm.maxHeight;
            clipped = true;
        }

        var desiredWidth = desiredSize.width + horizontalMargin;
        var desiredHeight = desiredSize.height + verticalMargin;

        if (desiredWidth > this.availableSize.width) {
            desiredWidth = this.availableSize.width;
            clipped = true;
        }

        if (desiredHeight > this.availableSize.height) {
            desiredHeight = this.availableSize.height;
            clipped = true;
        }

        if (clipped || desiredWidth < 0 || desiredHeight < 0) {
            this.unclippedDesiredSize = new geometry.Size(desiredSize.width, desiredSize.height);
        } else {
            this.unclippedDesiredSize = undefined;
        }

        desiredSize.width = Math.max(0.0, desiredWidth);
        desiredSize.height = Math.max(0.0, desiredHeight);
        return desiredSize;
    };

    LayoutInfo.prototype.arrange = function (finalRect, options) {
        trace.write("Arrange: " + this.view + " with: " + finalRect, trace.categories.Layout);
        var finalSize = finalRect.size;
        if (!isFinite(finalSize.width) || !isFinite(finalSize.height) || isNaN(finalSize.width) || isNaN(finalSize.height)) {
            throw new Error("Layout Infinity/NaN in Arrange is not allowed.");
        }

        this.arrangeCore(finalRect);
        this.finalRect = new geometry.Rect(finalRect.x, finalRect.y, finalRect.width, finalRect.height);

        var inNativeArrange = false;
        if (typeof options === "boolean") {
            inNativeArrange = options;
        }

        if (!inNativeArrange) {
            this._view._setBounds(new geometry.Rect(this.visualOffset.x, this.visualOffset.y, this.renderSize.width, this.renderSize.height));
        }
    };

    LayoutInfo.prototype.arrangeCore = function (finalRect) {
        var needsClipBounds = false;
        var arrangeSize = finalRect.size;

        var margin = this._margin;
        var marginWidth = (margin) ? margin.left + margin.right : 0;
        var marginHeight = (margin) ? margin.top + margin.bottom : 0;

        arrangeSize.width = Math.max(0.0, arrangeSize.width - marginWidth);
        arrangeSize.height = Math.max(0.0, arrangeSize.height - marginHeight);

        var unclippedDS = (this.unclippedDesiredSize) ? this.unclippedDesiredSize : new geometry.Size(Math.max(0.0, this.desiredSize.width - marginWidth), Math.max(0.0, this.desiredSize.height - marginHeight));

        if (arrangeSize.width < unclippedDS.width) {
            needsClipBounds = true;
            arrangeSize.width = unclippedDS.width;
        }

        if (arrangeSize.height < unclippedDS.height) {
            needsClipBounds = true;
            arrangeSize.height = unclippedDS.height;
        }

        if (this._horizontalAlignment !== common.HorizontalAlignment.stretch) {
            arrangeSize.width = unclippedDS.width;
        }

        if (this._verticalAlignment !== common.VerticalAlignment.stretch) {
            arrangeSize.height = unclippedDS.height;
        }

        var max = new common.MinMax(this);
        var effectiveMaxWidth = Math.max(unclippedDS.width, max.maxWidth);
        if (effectiveMaxWidth < arrangeSize.width) {
            needsClipBounds = true;
            arrangeSize.width = effectiveMaxWidth;
        }

        var effectiveMaxHeight = Math.max(unclippedDS.height, max.maxHeight);
        if (effectiveMaxHeight < arrangeSize.height) {
            needsClipBounds = true;
            arrangeSize.height = effectiveMaxHeight;
        }

        this._view._arrangeOverride(new geometry.Size(arrangeSize.width, arrangeSize.height));
        this.renderSize = arrangeSize;

        var width = Math.min(arrangeSize.width, max.maxWidth);
        var height = Math.min(arrangeSize.height, max.maxHeight);
        needsClipBounds = needsClipBounds || width < arrangeSize.width || height < arrangeSize.height;

        var finalSize = finalRect.size;
        var constrained = new geometry.Size(Math.max(0.0, finalSize.width - marginWidth), Math.max(0.0, finalSize.height - marginHeight));
        needsClipBounds = needsClipBounds || constrained.width < width || constrained.height < height;

        this.needsClipBounds = needsClipBounds;

        var offset = this.computeAlignmentOffset(constrained, new geometry.Size(width, height));
        offset.x += finalRect.x + margin.left;
        offset.y += finalRect.y + margin.top;

        this.visualOffset = offset;
    };

    LayoutInfo.prototype.computeAlignmentOffset = function (clientSize, renderSize) {
        var point = geometry.Point.zero;

        var horizontalAlignment = this._horizontalAlignment;
        if (horizontalAlignment === common.HorizontalAlignment.stretch && renderSize.width > clientSize.width) {
            horizontalAlignment = common.HorizontalAlignment.left;
        }

        var verticalAlignment = this._verticalAlignment;
        if (verticalAlignment === common.VerticalAlignment.stretch && renderSize.height > clientSize.height) {
            verticalAlignment = common.VerticalAlignment.top;
        }

        switch (horizontalAlignment) {
            case common.HorizontalAlignment.center:
            case common.HorizontalAlignment.stretch:
                point.x = (clientSize.width - renderSize.width) / 2;
                break;

            case common.HorizontalAlignment.right:
                point.x = clientSize.width - renderSize.width;
                break;

            default:
                break;
        }

        switch (verticalAlignment) {
            case common.VerticalAlignment.center:
            case common.VerticalAlignment.stretch:
                point.y = (clientSize.height - renderSize.height) / 2;
                break;

            case common.VerticalAlignment.bottom:
                point.y = clientSize.height - renderSize.height;
                break;

            default:
                break;
        }

        return point;
    };

    LayoutInfo.prototype.updateLayout = function () {
    };

    LayoutInfo.propagateSuspendLayout = function (layout) {
    };

    LayoutInfo.propagateResumeLayout = function (parent, layout) {
    };
    return LayoutInfo;
})();
exports.LayoutInfo = LayoutInfo;
