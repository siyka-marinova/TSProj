import definition = require("ui/core/control-state-change");
export declare class ControlStateChangeListener implements definition.ControlStateChangeListener {
    private _observer;
    private _states;
    private _control;
    private _callback;
    constructor(control: UIControl, callback: (state: string) => void);
    private _onEnabledChanged();
    private _onSelectedChanged();
    private _onHighlightedChanged();
    private _updateState();
}
