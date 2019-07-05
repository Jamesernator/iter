"use strict";
/* eslint-env node */
const fs = require("fs");
const glob = require("glob");

const pattern = /type AsyncOrSyncIterable = import\((?<importPath>.*?)\)\.AsyncOrSyncIterable;\n/u;

for (const file of glob.sync("src/**/*.ts")) {
    const contents = fs.readFileSync(file, "utf8");
    const newContents = contents.replace(pattern, (_, importPath) => {
        console.log(importPath)
        return `type AsyncOrSyncIterable<T> = import(${ importPath }).AsyncOrSyncIterable<T>;\n`;
    });
    fs.writeFileSync(file, newContents);
}
