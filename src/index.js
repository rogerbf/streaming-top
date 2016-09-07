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
