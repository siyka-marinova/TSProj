export interface EventData {
    eventName: string;
    object: Observable;
}
export interface PropertyChangeData extends EventData {
    propertyName: string;
    value: any;
}
export declare module knownEvents {
    var propertyChange: string;
}
export declare class Observable {
    private _observers;
    constructor();
    public typeName : string;
    public on(eventNames: string, callback: (data: EventData) => void, thisArg?: any): void;
    public off(eventNames: string, callback?: any): void;
    public addEventListener(eventNames: string, callback: (data: EventData) => void, thisArg?: any): void;
    public removeEventListener(eventNames: string, callback?: any): void;
    public setProperty(name: string, value: any): void;
    public getProperty(name: string): any;
    public setPropertyCore(data: PropertyChangeData): void;
    public notify(data: EventData): void;
    public hasListeners(eventName: string): boolean;
    public createPropertyChangeData(name: string, value: any): PropertyChangeData;
    public emit(eventNames: string): void;
    private _getEventList(eventName, createIfNeeded?);
    private _indexOfListener(list, callback);
}
