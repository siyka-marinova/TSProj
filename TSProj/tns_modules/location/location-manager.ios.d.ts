import types = require("location/location-types");
export declare class LocationManager {
    public desiredAccuracy: number;
    public updateDistance: number;
    public isStarted: boolean;
    private iosLocationManager;
    private listener;
    private static locationFromCLLocation(clLocation);
    private static iosLocationFromLocation(location);
    static isEnabled(): boolean;
    static distance(loc1: types.Location, loc2: types.Location): number;
    constructor();
    public startLocationMonitoring(onLocation: (location: types.Location) => any, onError?: (error: Error) => any, options?: types.Options): void;
    public stopLocationMonitoring(): void;
    public lastKnownLocation : types.Location;
}
