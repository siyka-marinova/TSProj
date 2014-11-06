declare module "application" {

    export var mainModule: string;

    export function start();

   /**
    * The main entry point event. This method is expected to use the root frame to navigate to the main application page.
    */
    export function onLaunch(context: any): void;

   /**
    * This method will be called when the Application is suspended.
    */
    export function onSuspend();

   /**
    * This method will be called when the Application is resumed after it has been suspended.
    */
    export function onResume();

   /**
    * This method will be called when the Application is about to exit.
    */
    export function onExit();

   /**
    * This method will be called when there is low memory on the target device.
    */
    export function onLowMemory();

   /**
    * This is the Android-specific application object instance.
    * Encapsulates methods and properties specific to the Android platform.
    * Will be undefined when TargetOS is iOS.
    */
    export var android: AndroidApplication;

   /**
    * This is the iOS-specific application object instance.
    * Encapsulates methods and properties specific to the iOS platform.
    * Will be undefined when TargetOS is Android.
    */
    export var ios: iOSApplication;

   /**
    * The abstraction of an Android-specific application object.
    */
    interface AndroidApplication {
       /**
        * The android.app.Application object instance provided to the init of the module.
        */
        nativeApp: android.app.Application;

       /**
        * The application android.content.Context object instance.
        */
        context: android.content.Context;

       /**
        * The currently active (loaded) android.app.Activity. This property is automatically updated upon Activity events.
        */
        foregroundActivity: android.app.Activity;

       /**
        * The currently active (loaded) Context. This is typically the top-level Activity that is just created.
        */
        currentContext: android.content.Context;

       /**
        * The main (start) Activity for the application.
        */
        startActivity: android.app.Activity;

       /**
        * The name of the application package.
        */
        packageName: string;

       /**
        * This method is called by the JavaScript Bridge when navigation to a new activity is triggered.
        * The return value of this method should be com.tns.NativeScriptActivity.extend implementation.
        */
        getActivity(intent: android.content.Intent): any;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityCreated method.
        */
        onActivityCreated: (activity: android.app.Activity, bundle: android.os.Bundle) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityDestroyed method.
        */
        onActivityDestroyed: (activity: android.app.Activity) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityDestroyed method.
        */
        onActivityStarted: (activity: android.app.Activity) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityPaused method.
        */
        onActivityPaused: (activity: android.app.Activity) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityResumed method.
        */
        onActivityResumed: (activity: android.app.Activity) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onActivityStopped method.
        */
        onActivityStopped: (activity: android.app.Activity) => void;

       /**
        * Direct handler of the android.app.Application.ActivityLifecycleCallbacks.onSaveActivityState method.
        */
        onSaveActivityState: (activity: android.app.Activity, bundle: android.os.Bundle) => void;
    }

   /**
    * The abstraction of an iOS-specific application object.
    */
/* tslint:disable */
    interface iOSApplication {
/* tslint:enable */
       /**
        * The root view controller for the application.
        */
        rootController: UIViewController;

       /**
        * The android.app.Application object instance provided to the init of the module.
        */
        nativeApp: UIApplication;
    }
}