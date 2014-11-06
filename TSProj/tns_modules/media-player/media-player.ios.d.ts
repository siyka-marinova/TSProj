import promises = require("promises");
import view = require("ui/core/view");
export declare var playAudioURL: (url: string) => promises.Promise<void>;
export declare var playAudioFile: (path: string) => promises.Promise<void>;
export declare var playVideoURL: (url: string, view: view.View) => promises.Promise<void>;
export declare var playVideoFile: (path: string, view: view.View) => promises.Promise<void>;
