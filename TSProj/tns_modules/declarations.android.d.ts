/* tslint:disable:no-unused-variable */
// Android specific TypeScript declarations
declare var app;
declare var telerik;
declare var gc: () => void;

declare module android {
    module support {
        module v4 {
            module widget {
                class DrawerLayout {
                    constructor(context: android.content.Context);
                }

                module DrawerLayout {
                    class DrawerListener implements IDrawerListener {
                        constructor(implementation: IDrawerListener);

                        onDrawerClosed(drawerView: android.view.View): void;
                        onDrawerOpened(drawerView: android.view.View): void;
                        onDrawerSlide(drawerView: android.view.View, offset: number): void;
                        onDrawerStateChanged(newState: number): void;
                    }

                    class LayoutParams extends android.view.ViewGroup.MarginLayoutParams {
                        constructor(width: number, height: number, gravity?: number);
                        gravity: number;
                    }

                    interface IDrawerListener {
                        onDrawerClosed(drawerView: android.view.View): void;
                        onDrawerOpened(drawerView: android.view.View): void;
                        onDrawerSlide(drawerView: android.view.View, offset: number): void;
                        onDrawerStateChanged(newState: number): void;
                    }
                }
            }

            module app {
                class ActionBarDrawerToggle {
                    constructor(activity: android.app.Activity, layout: widget.DrawerLayout, imageResId: number, openResId: number, closeResId: number);
                }
            }
        }
    }
}

declare module com {
    export module koushikdutta {

        export module ion {
            export class Ion {
                static with(context: any, url: string): any;
                static getDefault(context: any): any;
            }
        }

        export module async {

            export module callback {
                export class DataCallback {
                    constructor(params: any);
                }
                export class CompletedCallback {
                    constructor(params: any);
                }
            }

            export module future {
                export class FutureCallback {
                    constructor(context: any);
                }
            }

            export module http {

                export class AsyncHttpRequest {
                    constructor(uri: java.net.URI, method: string);
                    addHeader(name: string, v: string);
                    setTimeout(timeout: number);
                    setBody(body: any);
                    static extends(source: any);
                }

                export module libcore {
                    export class RawHeaders {
                        constructor();
                        add(name: string, v: string);
                    }
                }

                export module AsyncHttpClient  {
                    function getDefaultInstance(): any;

                    export class StringCallback {
                        constructor(params: any);
                        static extends(params: any);
                    }
                }

                export module callback {
                    export class HttpConnectCallback {
                        constructor(params: any);
                    }
                }

                export module body {
                    export class StringBody {
                        constructor(source: string);
                        static extend(source: any);
                    }
                    export class StreamBody {
                        constructor(source: java.io.InputStream, length: number);
                        static extend(source: any);
                    }
                }
            }
        }
    }
}