console.log("parent pid:", process.pid)
require('child_process').spawn(process.argv[0], [require.resolve('./killChild2')], {stdio: 'inherit'})
setTimeout(function () {}, 10000)
