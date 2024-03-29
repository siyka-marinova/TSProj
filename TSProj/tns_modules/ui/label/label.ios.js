var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/label/label-common");

function onTextPropertyChanged(data) {
    var label = data.object;
    label.ios.text = data.newValue;
}

common.textProperty.metadata.onSetNativeValue = onTextPropertyChanged;

function onTextWrapPropertyChanged(data) {
    var label = data.object;

    if (data.newValue) {
        label.ios.lineBreakMode = 0 /* NSLineBreakByWordWrapping */;
        label.ios.numberOfLines = 0;
    } else {
        label.ios.lineBreakMode = 4 /* NSLineBreakByTruncatingTail */;
        label.ios.numberOfLines = 1;
    }
}

common.textWrapProperty.metadata.onSetNativeValue = onTextWrapPropertyChanged;

require("utils/module-merge").merge(common, exports);

var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.call(this);

        this._ios = new UILabel();
    }
    Object.defineProperty(Label.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return Label;
})(common.Label);
exports.Label = Label;
