'use strict'
/* eslint-env node */
const loader = require('esm')(module)

module.exports = {
    sync: loader('./src/sync.mjs'),
    async: loader('./src/async.mjs'),
}
