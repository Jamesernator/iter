/// <reference types="node"/>
import glob from "glob";
import chalk from "chalk";

async function main() {
    const files = [
        ...glob.sync("async/**/*.tests.js"),
        ...glob.sync("sync/**/*.tests.js"),
    ];
    for (const file of files) {
        console.log(file);
    }
}

main().catch(console.error);
