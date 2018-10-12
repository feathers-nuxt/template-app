process.env['mink'] = "*:*"

{ setDefaultTimeout } = require('cucumber')

setDefaultTimeout(2 * 60 * 1000)