# streaming-top

Wraps `top` in a readable stream.

``` javascript
const top = require('streaming-top')(1000) // 1s delay

top.pipe(process.stdout)
```
