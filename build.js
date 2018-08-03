"use strict"
const fs = require('fs')
const path = require('path')
const dedent = require('dedent')
const folderModule = require('folder-module')

folderModule("./async/", {
    outFile: "./async.mjs",
    ignore(file) {
        return file.startsWith('--')
    },
})
folderModule("./sync/", {
    outFile: "./sync.mjs",
    ignore(file) {
        return file.startsWith('--')
    },
})

/**
 * 
 * @param {"async" | "sync"} type 
 */
function createCommonjs(type) {
    for (const file of fs.readdirSync(type)) {
        const { name } = path.parse(file)
        const fullPath = path.join(type, file)
        if (!fs.statSync(fullPath).isFile()) {
            continue
        }
        const sourceText = dedent`
            // auto-generated
            'use strict'
            const esm = require('esm')
            const loadModuleSync = esm(module, { mode: 'strict' })
            module.exports = loadModuleSync('../../${ type }/${ name }.mjs').default
        `
        const outPath = path.join('cjs', type, `${ name }.js`)
        fs.writeFileSync(outPath, sourceText)
    }
}

createCommonjs('async')
createCommonjs('sync')