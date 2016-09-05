module.exports = stdout => {
  const sections = stdout.trim().split('\n\n')

  const lines = {
    globalState: sections[0].split('\n'),
    keys: sections[1].slice(0, sections[1].indexOf('\n')),
    processes: sections[1].split('\n').slice(1)
  }

  const keyByDistance = (
    lines.keys
      .split(/\s+/g)
      .reduce((map, key, i) => {
        return Object.assign(map, { [lines.keys.indexOf(key)]: key })
      }, {})
  )

  return JSON.stringify(keyByDistance)
}
