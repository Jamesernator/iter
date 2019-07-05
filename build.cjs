"use strict";

const folderModule = require("folder-module");

function ignore(file) {
    return file.startsWith('_') || file.split(/\./g).length !== 2;
}

folderModule("./async/", {
    outFile: "./async.js",
    ignore,
});

folderModule("./sync/", {
    outFile: "./sync.js",
    ignore,
});
