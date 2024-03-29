var Common = require("local-settings/local-settings-common");

var userDefaults = NSUserDefaults.standardUserDefaults();

exports.hasKey = function (key) {
    Common.checkKey(key);
    return (null != userDefaults.objectForKey(key)) ? true : false;
};

exports.getBoolean = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.boolForKey(key);
    }
    return defaultValue;
};

exports.getString = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.stringForKey(key);
    }
    return defaultValue;
};

exports.getNumber = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.doubleForKey(key);
    }
    return defaultValue;
};

exports.setBoolean = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "boolean");
    userDefaults.setBoolForKey(value, key);
    userDefaults.synchronize();
};

exports.setString = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "string");
    userDefaults.setObjectForKey(value, key);
    userDefaults.synchronize();
};

exports.setNumber = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "number");
    userDefaults.setDoubleForKey(value, key);
    userDefaults.synchronize();
};

exports.remove = function (key) {
    Common.checkKey(key);
    userDefaults.removeObjectForKey(key);
    userDefaults.synchronize();
};
