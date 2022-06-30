"use strict";
/**
 * @param {Array.<string>} childDomains           Array of permited domains.
 */
exports.setupParentListener = function (childDomains, debug) {
    if (debug === void 0) { debug = false; }
    if (debug)
        console.log("Setting up Parent Listener");
    window.addEventListener("message", function (e) { return _parentMessageHandler(e, childDomains, debug); }, false);
};
/**
 * @param {string} key           Key of the desired data you want to retrieve from parent
 * @param {Function} callback    Callback function to handle/save data
 */
exports.getDataFromParent = function (key, callback, debug) {
    if (debug === void 0) { debug = false; }
    if (debug)
        console.log("Asking parent for key ".concat(key, " "));
    window.addEventListener("message", function (e) { return _childMessageHandler(e, callback, debug); }, false);
    window.parent.postMessage({ action: "get", key: key }, "*");
};
/**
 * @param {string} key           Key of the desired data you want to retrieve from parent
 * @param {Object} value         Value that must be updated on parent
 */
exports.updateDataFromChildren = function (key, value, debug) {
    if (debug === void 0) { debug = false; }
    if (debug)
        console.log("Updating parent key ".concat(key, " "));
    window.parent.postMessage({ action: "update", key: key, value: value }, "*");
};
// Private methods
function _childMessageHandler(event, callback, debug) {
    if (debug)
        console.log("received event in children", event);
    var _a = event.data, action = _a.action, data = _a.data;
    if (action === "returnData") {
        callback(data);
        return data;
    }
}
function _parentMessageHandler(event, domains, debug) {
    if (debug)
        console.log("received event in parent", event);
    if (!domains.includes(event.origin))
        return;
    var _a = event.data, action = _a.action, key = _a.key, value = _a.value;
    switch (action) {
        case "update":
            window.localStorage.setItem(key, JSON.stringify(value));
            break;
        case "get":
            var data = JSON.parse(window.localStorage.getItem(key));
            event.source.postMessage({ action: "returnData", key: key, data: data }, "*");
        default:
            break;
    }
}
