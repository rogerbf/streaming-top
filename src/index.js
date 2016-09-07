const top = require('./lib/top.js')
const split = require('./lib/split.js')('Processes:')
const parse = require('./lib/parser.js')

const run = options => {
  return (
    top(options).stdout
      .pipe(split)
      .pipe(parse)
  )
}

module.exports = run

const instance = run({ samples: 2, delay: 3, args: '-n 1' })

instance.pipe(process.stdout)
