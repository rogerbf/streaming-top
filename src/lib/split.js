const stream = require('stream')

const split = substr => {
  const matchBy = new RegExp(substr)
  return(
    Object.assign(
      new stream.Transform({
        transform(chunk, encoding, callback) {
          const str = chunk.toString()
          const startOfOutput = str.match(matchBy)
          if (startOfOutput) {
            this.strBuffer = (
              this.strBuffer + str.slice(0, startOfOutput.index)
            )
            this.push(this.strBuffer)
            this.strBuffer = str.slice(startOfOutput.index)
            callback()
          } else {
            this.strBuffer = this.strBuffer + str
            callback()
          }
        },
        flush(callback) {
          this.push(this.strBuffer)
          this.strBuffer = ''
          callback()
        }
      }),
      { strBuffer: '' }
    )
  )
}



module.exports = split
