export declare module ad {
    module collections {
        function stringArrayToStringSet(str: string[]): any;
        function stringSetToStringArray(stringSet: any): string[];
    }
    module layout {
        function getDevicePixels(independentPixels: number, context: android.content.Context): number;
    }
    module id {
        var home: number;
    }
    module resources {
        function getDrawableId(name: any): number;
        function getStringId(name: any): number;
        function getId(name: string): number;
    }
    function async<T>(doInBackground: () => T, callback: (result: T) => void): void;
}
