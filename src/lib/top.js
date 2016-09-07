const spawn = require('child_process').spawn

const defaultOptions = {
  delay: 1,
  samples: 0,
  args: ''
}

const top = opts => {
  const options = Object.assign(defaultOptions, opts)

  const instance = spawn(
    'top',
    `-l ${options.samples} -s ${options.delay} ${options.args}`
      .trim().split(' ')
  )

  process.on('uncaughtException', err => {
    instance.kill()
    console.error(err)
  })

  return instance
}

module.exports = top
