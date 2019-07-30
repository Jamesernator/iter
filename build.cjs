"use strict";

const folderModule = require("folder-module");

function ignore(file) {
    return file.startsWith("_") || file.split(/\./ug).length !== 2;
}

folderModule("./dist/async/", {
    outFile: "./dist/async.js",
    ignore,
});

folderModule("./dist/sync/", {
    outFile: "./dist/sync.js",
    ignore,
});
