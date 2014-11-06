import view = require("ui/core/view");
import definition = require("ui/web-view");
export declare class WebView extends view.View implements definition.WebView {
    private _ios;
    private _delegate;
    private _url;
    private _js;
    constructor();
    public ios : UIWebView;
    public url : string;
    public canGoBack : boolean;
    public canGoForward : boolean;
    public goBack(): void;
    public goForward(): void;
    public loadData(data: string, baseURL?: string, mimeType?: string, encoding?: string): void;
    public setNativeProperty(name: string, value: any): void;
    public eval(script: string): void;
}
