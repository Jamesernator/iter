"use strict";
const fs = require("fs");
const glob = require("glob");

for (const file of glob.sync("./src/sync/**.tests.ts")) {
    const contents = fs.readFileSync(file, "utf8");
    const newContents = contents.replace(/Async/gu, "");
    fs.writeFileSync(file, newContents);
}
