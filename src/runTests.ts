/// <reference types="node"/>
import glob from "glob";
import chalk from "chalk";

async function main() {
    const abortOnError = process.argv.includes("--bail");

    const files = [
        ...glob.sync("./async/**/*.tests.js"),
        ...glob.sync("./sync/**/*.tests.js"),
    ];
    let errored = false;
    for (const file of files) {
        let testModule: { tests: { [key: string]: () => void | Promise<void> } };
        try {
            testModule = await import(file);
        } catch (err) {
            console.log(chalk`{red Failed to load tests} {blue > } {yellow ${ file }}`);
            errored = true;
            if (abortOnError) {
                process.exit(1);
                return;
            }
            continue;
        }

        for (const [testName, test] of Object.entries(testModule.tests)) {
            try {
                await test();
                console.log(chalk`{green ${ file }} {blue >} {green ${ testName }}`);
            } catch (err) {
                console.log(chalk`{red ${ file }} {blue >} {yellow ${ testName }}`);
                console.log(err);
                errored = true;
                if (abortOnError) {
                    process.exit(1);
                    return;
                }
            }
        }
    }
    if (errored) {
        process.exit(1);
    }
}

main().catch(console.error);
