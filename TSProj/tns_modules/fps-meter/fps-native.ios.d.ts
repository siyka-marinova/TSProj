import definition = require("fps-meter/fps-native");
export declare class FPSCallback implements definition.FPSCallback {
    public running: boolean;
    private onFrame;
    private displayLink;
    private impl;
    constructor(onFrame: (currentTimeMillis: number) => void);
    public start(): void;
    public stop(): void;
    private handleFrame(sender);
}
