const stream = require('stream')
const parse = require('parse-top')

const parser = Object.assign(
  new stream.Transform({
    transform(chunk, encoding, callback) {
      this.push(JSON.stringify(parse(chunk.toString()), null, 2) + '\n')
      callback()
    }
  })
)

module.exports = parser
