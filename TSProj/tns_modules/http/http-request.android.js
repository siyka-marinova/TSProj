var promises = require("promises");
var imageSource = require("image-source");

var USER_AGENT = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36";

function request(options) {
    var d = promises.defer();

    try  {
        var request = new com.koushikdutta.async.http.AsyncHttpRequest(java.net.URI.create(options.url), options.method);

        request.addHeader("User-Agent", USER_AGENT);

        if (options.headers) {
            for (var key in options.headers) {
                request.addHeader(key, options.headers[key]);
            }
        }

        if (typeof options.timeout === "number") {
            request.setTimeout(options.timeout);
        }

        if (typeof options.content === "string") {
            var stringBody = com.koushikdutta.async.http.body.StringBody.extend({
                getContentType: function () {
                    return null;
                }
            });
            request.setBody(new stringBody(options.content));
        } else if (typeof options.content !== "undefined") {
            request.setBody(new com.koushikdutta.async.http.body.StreamBody(new java.io.ByteArrayInputStream(options.content), options.content.length));
        }

        var callback = new com.koushikdutta.async.http.callback.HttpConnectCallback({
            onConnectCompleted: function (error, response) {
                if (error) {
                    d.reject(new Error(error.toString()));
                } else {
                    var headers = {};
                    var rawHeaders = response.getHeaders().headers;

                    for (var i = 0, l = rawHeaders.length(); i < l; i++) {
                        var key = rawHeaders.getFieldName(i);
                        headers[key] = rawHeaders.getValue(i);
                    }

                    var outputStream = new java.io.ByteArrayOutputStream();

                    var dataCallback = new com.koushikdutta.async.callback.DataCallback({
                        onDataAvailable: function (emitter, byteBufferList) {
                            var bb = byteBufferList.getAll();
                            outputStream.write(bb.array(), bb.arrayOffset() + bb.position(), bb.remaining());
                        }
                    });

                    response.setDataCallback(dataCallback);

                    var endCallback = new com.koushikdutta.async.callback.CompletedCallback({
                        onCompleted: function (error) {
                            d.resolve({
                                content: {
                                    raw: outputStream,
                                    toString: function () {
                                        return outputStream.toString();
                                    },
                                    toJSON: function () {
                                        return JSON.parse(outputStream.toString());
                                    },
                                    toImage: function () {
                                        var d = promises.defer();
                                        try  {
                                            var stream = new java.io.ByteArrayInputStream(outputStream.toByteArray());
                                            d.resolve(imageSource.fromNativeSource(android.graphics.BitmapFactory.decodeStream(stream)));
                                        } catch (e) {
                                            d.reject(e);
                                        }

                                        return d.promise();
                                    }
                                },
                                statusCode: rawHeaders.getResponseCode(),
                                headers: headers
                            });
                        }
                    });

                    response.setEndCallback(endCallback);
                }
            }
        });

        com.koushikdutta.async.http.AsyncHttpClient.getDefaultInstance().execute(request, callback);
    } catch (ex) {
        d.reject(ex);
    }
    return d.promise();
}
exports.request = request;
