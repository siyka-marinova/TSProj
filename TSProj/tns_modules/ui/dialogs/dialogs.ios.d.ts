import promises = require("promises");
import dialogs = require("ui/dialogs");
import dialogs_common = require("ui/dialogs/dialogs-common");
export declare function alert(message: string, options?: {
    title: string;
    okButtonText: string;
}): promises.Promise<void>;
export declare function confirm(message: string, options?: {
    title: string;
    okButtonText: string;
    cancelButtonText: string;
}): promises.Promise<boolean>;
export declare function prompt(message: string, defaultText?: string, options?: {
    title: string;
    okButtonText: string;
    cancelButtonText: string;
    inputType: dialogs_common.InputType;
}): promises.Promise<dialogs.PromptResult>;
export declare function login(message: string, userName?: string, password?: string, options?: {
    title: string;
    okButtonText: string;
    cancelButtonText: string;
}): promises.Promise<dialogs.LoginResult>;
export declare class Dialog {
    private _ios;
    constructor(message: string, callback?: (result: boolean) => {}, options?: dialogs.DialogButtonsOptions);
    public ios : UIAlertView;
    public show(): void;
    public hide(): void;
}
