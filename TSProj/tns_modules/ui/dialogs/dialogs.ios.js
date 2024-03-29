var promises = require("promises");

var dialogs_common = require("ui/dialogs/dialogs-common");

require("utils/module-merge").merge(dialogs_common, exports);

var DelegateClass = NSObject.extend({
    alertViewClickedButtonAtIndex: function (view, index) {
        this["_callback"].call(null, view, index);
    }
}, {
    protocols: [UIAlertViewDelegate]
});

function createUIAlertView(message, options) {
    var alert = new UIAlertView();
    alert.title = options && options.title ? options.title : "";
    alert.message = message;
    return alert;
}

function createDelegate(callback) {
    var delegate = new DelegateClass();
    delegate["_callback"] = callback;
    return delegate;
}

function addButtonsToAlertDialog(alert, options) {
    if (!options) {
        return;
    }

    if (options.okButtonText) {
        alert.addButtonWithTitle(options.okButtonText);
    }

    if (options.cancelButtonText) {
        alert.addButtonWithTitle(options.cancelButtonText);
    }

    if (options.neutralButtonText) {
        alert.addButtonWithTitle(options.neutralButtonText);
    }
}

function alert(message, options) {
    if (typeof options === "undefined") { options = { title: dialogs_common.ALERT, okButtonText: dialogs_common.OK }; }
    var d = promises.defer();
    try  {
        var alert = createUIAlertView(message, options);

        if (options.okButtonText) {
            alert.addButtonWithTitle(options.okButtonText);
        }

        var delegate = createDelegate(function (view, index) {
            d.resolve();

            delegate = undefined;
        });

        alert.delegate = delegate;

        alert.show();
    } catch (ex) {
        d.reject(ex);
    }

    return d.promise();
}
exports.alert = alert;

function confirm(message, options) {
    if (typeof options === "undefined") { options = { title: dialogs_common.CONFIRM, okButtonText: dialogs_common.OK, cancelButtonText: dialogs_common.CANCEL }; }
    var d = promises.defer();
    try  {
        var alert = createUIAlertView(message, options);

        addButtonsToAlertDialog(alert, options);

        var delegate = createDelegate(function (view, index) {
            d.resolve(index === 2 ? undefined : index === 0);

            delegate = undefined;
        });

        alert.delegate = delegate;

        alert.show();
    } catch (ex) {
        d.reject(ex);
    }

    return d.promise();
}
exports.confirm = confirm;

function prompt(message, defaultText, options) {
    if (typeof options === "undefined") { options = { title: dialogs_common.PROMPT, okButtonText: dialogs_common.OK, cancelButtonText: dialogs_common.CANCEL, inputType: 0 /* PlainText */ }; }
    var d = promises.defer();
    try  {
        var alert = createUIAlertView(message, options);

        if (options.inputType === 1 /* Password */) {
            alert.alertViewStyle = 1 /* UIAlertViewStyleSecureTextInput */;
        } else {
            alert.alertViewStyle = 2 /* UIAlertViewStylePlainTextInput */;
        }

        addButtonsToAlertDialog(alert, options);

        var textField = alert.textFieldAtIndex(0);
        textField.text = defaultText ? defaultText : "";

        var delegate = createDelegate(function (view, index) {
            d.resolve({ result: index === 2 ? undefined : index === 0, text: textField.text });

            delegate = undefined;
        });

        alert.delegate = delegate;

        alert.show();
    } catch (ex) {
        d.reject(ex);
    }

    return d.promise();
}
exports.prompt = prompt;

function login(message, userName, password, options) {
    if (typeof options === "undefined") { options = { title: dialogs_common.LOGIN, okButtonText: dialogs_common.OK, cancelButtonText: dialogs_common.CANCEL }; }
    var d = promises.defer();
    try  {
        var alert = createUIAlertView(message, options);

        alert.alertViewStyle = 3 /* UIAlertViewStyleLoginAndPasswordInput */;

        addButtonsToAlertDialog(alert, options);

        var userNameTextField = alert.textFieldAtIndex(0);
        userNameTextField.text = userName ? userName : "";

        var pwdTextField = alert.textFieldAtIndex(1);
        pwdTextField.text = password ? password : "";

        var delegate = createDelegate(function (view, index) {
            d.resolve({ result: index === 2 ? undefined : index === 0, userName: userNameTextField.text, password: pwdTextField.text });

            delegate = undefined;
        });

        alert.delegate = delegate;

        alert.show();
    } catch (ex) {
        d.reject(ex);
    }

    return d.promise();
}
exports.login = login;

var Dialog = (function () {
    function Dialog(message, callback, options) {
        this._ios = createUIAlertView(message, options);
        addButtonsToAlertDialog(this._ios, options);

        var delegate = createDelegate(function (view, index) {
            if (callback) {
                callback(index === 2 ? undefined : index === 0);
            }

            delegate = undefined;
        });

        this._ios.delegate = delegate;
    }
    Object.defineProperty(Dialog.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });

    Dialog.prototype.show = function () {
        this.ios.show();
    };

    Dialog.prototype.hide = function () {
        this.ios.dismissWithClickedButtonIndexAnimated(0, true);
    };
    return Dialog;
})();
exports.Dialog = Dialog;
