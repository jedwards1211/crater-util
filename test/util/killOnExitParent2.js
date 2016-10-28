console.log("parent pid:", process.pid)
var child = require('../../src/spawn').default(process.argv[0], [require.resolve('./killOnExitChild2')])
require('../../src/killOnExit').default(child)
setTimeout(function () {}, 1000)
