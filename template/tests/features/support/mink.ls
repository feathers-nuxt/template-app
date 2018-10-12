cucumber = require('cucumber')
{Mink} = require('cucumber-mink')

driver = new Mink({
  baseUrl: 'http://127.0.0.1:3030',
  viewport: {
    width: 1366,
    height: 768,
  },
})

driver.hook(cucumber)