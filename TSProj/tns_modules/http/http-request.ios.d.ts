import promises = require("promises");
import http = require("http");
export declare function request(options: http.HttpRequestOptions): promises.Promise<http.HttpResponse>;
