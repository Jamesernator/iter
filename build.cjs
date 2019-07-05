/* eslint-env node */
"use strict";

const folderModule = require("folder-module");

folderModule("./async/", {
    outFile: "./async.js",
    ignore(file) {
        return file.startsWith("_");
    },
});

folderModule("./sync/", {
    outFile: "./sync.js",
    ignore(file) {
        return file.startsWith("_");
    },
});
