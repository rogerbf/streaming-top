# streaming-top

Wraps `top` in a readable stream. Parsing is done by [parse-top](https://www.npmjs.com/package/parse-top).

``` javascript
const createInstance = require('streaming-top')

const top = createInstance({ samples: 10, delay: 3, args: '-n 1' })

top.on('data', data => {
  console.log(JSON.parse(data.toString()))
})

// or pipe it:
top.pipe(process.stdout)
```

### default options
``` javascript
{
  delay: 1,
  samples: 0,
  args: ''
}
```
