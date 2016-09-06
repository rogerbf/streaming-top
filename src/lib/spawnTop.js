const spawn = require('child_process').spawn

const spawnTop = (delay = 1) => {
  const instance = spawn('top', `-n 3 -l 0 -s ${delay}`.split(' '))
  return instance
}

module.exports = spawnTop
