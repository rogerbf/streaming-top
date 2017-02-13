const stream = require('readable-stream')
const parse = require('parse-top')

const parser = Object.assign(
  new stream.Transform({
    transform(chunk, encoding, callback) {
      this.push(JSON.stringify(parse(chunk.toString())))
      callback()
    }
  })
)

module.exports = parser
