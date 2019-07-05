/* eslint-env node */
"use strict";

const folderModule = require("folder-module");

folderModule("./async/", {
    outFile: "./async.mjs",
    ignore(file) {
        return file.startsWith("_");
    },
});

folderModule("./sync/", {
    outFile: "./sync.mjs",
    ignore(file) {
        return file.startsWith("_");
    },
});
