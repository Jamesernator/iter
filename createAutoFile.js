#!/usr/bin/env babel-node
import * as fs from "fs-promise"

const gen = name => `
import auto from "./auto.js"
import syncF from "../sync/${name}.js"
import asyncF from "../async/${name}.js"

export default auto(syncF, asyncF)
`.trim()

async function make(name) {
    const data = gen(name)
    await fs.writeFile(`./lib/auto/${name}.js`, data)
}

const methods = [
    'all',
    'any',
    'array',
    'between',
    'buffer',
    'close',
    'contains',
    'countBy',
    'createIterableMethod',
    'createMethod',
    'each',
    'enumerate',
    'extendedIterator',
    'filter',
    'final',
    'find',
    'findIndex',
    'findLastIndex',
    'flatten',
    'followWith',
    'groupBy',
    'indexOf',
    'invoke',
    'isIterable',
    'iterator',
    'last',
    'lastIndexOf',
    'length',
    'map',
    'mapFinal',
    'merge',
    'none',
    'pluck',
    'reduce',
    'reduceRight',
    'reject',
    'repeat',
    'reverse',
    'runs',
    'sample',
    'scan',
    'scanRight',
    'select',
    'shuffle',
    'skip',
    'skipLast',
    'sort',
    'sortBy',
    'take',
    'takeWhile',
    'unique',
    'withFinal',
    'without',
    'zip',
    'zipLongest'
]

async function main() {
    for (const item of methods) {
        await make(item)
    }
}

main()
