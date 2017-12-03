const folderModule = require('folder-module')

folderModule('./src/async/', { outFile: './async.mjs' })
folderModule('./src/sync/', { outFile: './sync.mjs' })
