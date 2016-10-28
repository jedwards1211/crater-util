console.log("parent pid:", process.pid)
require('../../src/spawn').default(process.argv[0], [require.resolve('./killChild')])
setTimeout(function () {}, 10000)
