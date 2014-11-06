export declare enum Accuracy {
    ANY = 300,
    HIGH = 3,
}
export declare class Location {
    public latitude: number;
    public longitude: number;
    public altitude: number;
    public horizontalAccuracy: number;
    public verticalAccuracy: number;
    public speed: number;
    public direction: number;
    public timestamp: Date;
    public android: any;
    public ios: any;
}
export interface Options {
    desiredAccuracy?: number;
    updateDistance?: number;
    minimumUpdateTime?: number;
    maximumAge?: number;
    timeout?: number;
}
export declare class LocationRegion {
    public latitude: number;
    public longitude: number;
    public raduis: number;
}
