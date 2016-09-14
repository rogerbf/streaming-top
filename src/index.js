const top = require('./lib/top.js')
const split = require('./lib/split.js')('Processes:')
const parse = require('./lib/parser.js')

const start = options => {
  const instance = top(options)

  process.on('exit', () => instance.kill())
  process.on('uncaughtException', err => {
    instance.kill()
    throw new Error(err)
  })

  const dataStream = (
    instance.stdout
      .pipe(split)
      .pipe(parse)
  )

  return Object.assign(
    dataStream,
    { kill: () => instance.kill() }
  )
}

module.exports = start
