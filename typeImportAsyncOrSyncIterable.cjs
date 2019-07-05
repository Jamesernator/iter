"use strict";
/* eslint-env node */
const fs = require("fs");
const glob = require("glob");

const pattern = /import \{ AsyncOrSyncIterable \} from (?<importPath>.*)?;\n/u;

for (const file of glob.sync("src/**/*.ts")) {
    const contents = fs.readFileSync(file, "utf8");
    const newContents = contents.replace(pattern, (_, importPath) => {
        return `type AsyncOrSyncIterable = import(${ importPath }).AsyncOrSyncIterable;\n`;
    });
    fs.writeFileSync(file, newContents);
}
