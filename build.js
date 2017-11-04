const folderModule = require('folder-module')

folderModule('./src/async/', { outFile: './src/async.mjs' })
folderModule('./src/sync/', { outFile: './src/sync.mjs' })
