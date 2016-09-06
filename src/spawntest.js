const spawn = require('child_process').spawn
const stream = require('stream')

const dataEventCounter = message => {
  return Object.assign(
    new stream.Transform({
      transform(chunk, encoding, callback) {
        this.count++
        this.push(chunk)
        callback()
      }
    }),
    { count: 0 },
    { getCount() { return this.count } }
  )
}

const split = Object.assign(
  new stream.Transform({
    transform(chunk, encoding, callback) {
      const str = chunk.toString()
      const startOfOutput = str.match(/Processes:/)
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

const child = spawn('top', '-n 3 -l 3'.split(' '))

const incomingEvents = dataEventCounter('events from child: ')
const outgoingEvents = dataEventCounter('outgoing events: ')

child.stdout
  .pipe(incomingEvents)
  .pipe(split)
  .pipe(outgoingEvents)
  .pipe(process.stdout)

process.on('exit', () => {
  console.log('incoming events:', incomingEvents.getCount())
  console.log('outgoing events:', outgoingEvents.getCount())
})
