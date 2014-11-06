import types = require("location/location-types");
export declare class LocationManager {
    public desiredAccuracy: number;
    public updateDistance: number;
    public minimumUpdateTime: number;
    public isStarted: boolean;
    private androidLocationManager;
    private locationListener;
    private static locationFromAndroidLocation(androidLocation);
    private static androidLocationFromLocation(location);
    static isEnabled(): boolean;
    static distance(loc1: types.Location, loc2: types.Location): number;
    constructor();
    public startLocationMonitoring(onLocation: (location: types.Location) => any, onError?: (error: Error) => any, options?: types.Options): void;
    public stopLocationMonitoring(): void;
    public lastKnownLocation : types.Location;
}
