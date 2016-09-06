const spawnTop = require('./lib/spawnTop.js')
const split = require('./lib/split.js')('Processes:')
const parser = require('./lib/parser.js')

/*
delay
samples
args
*/

const top = spawnTop()

top.stdout
  .pipe(split)
  .pipe(parser)
  .pipe(process.stdout)

setTimeout(() => {
  top.kill()
}, 10000)
