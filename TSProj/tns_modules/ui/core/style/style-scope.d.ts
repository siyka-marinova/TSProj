import view = require("ui/core/view");
export declare class StyleScope {
    private _statesByKey;
    private _viewIdToKey;
    private _css;
    private _cssSelectors;
    public css : string;
    public assureSelectors(): void;
    public applySelectors(view: view.View): void;
    public getVisualStates(view: view.View): Object;
    private _createVisualsStatesForSelectors(key, matchedStateSelectors);
    private _createSelectors(ast);
    private _reset();
}
