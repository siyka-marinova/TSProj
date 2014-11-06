import definition = require("fps-meter/fps-native");
export declare class FPSCallback implements definition.FPSCallback {
    private impl;
    private onFrame;
    public running: boolean;
    constructor(onFrame: (currentTimeMillis: number) => void);
    public start(): void;
    public stop(): void;
    private handleFrame(nanos);
}
