const execFile = require('child_process').execFile
const stream = require('stream')
const parse = require('parse-top')

const top = (delay = 1000) => {
  return Object.assign(
    new stream.Readable({
      read() {
        if (!this.interval) {
          this.interval = setInterval(() => {
            execFile('top', ['-l', '1', '-stats', 'pid,command,state'], (err, stdout, stderr) => {
              this.push(JSON.stringify(parse(stdout), null, 2))
            })
          }, delay)
        }
      }
    }),
    { delay, interval: null },
    {
      destroy () {
        clearInterval(this.interval)
        this.push(null)
      }
    }
  )
}

const instance = top()

instance.pipe(process.stdout)

setTimeout(() => {
  instance.destroy()
}, 5000)
