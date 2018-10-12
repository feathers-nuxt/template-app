# Dependencies
{ After, Before, BeforeAll, AfterAll } = require('cucumber')

signale = require('signale')
signale.config({
  displayFilename: true,
  displayTimestamp: true,
  displayDate: false
})

scope = require('./support/scope')
logger = require('../../src/server/utils/winston')

BeforeAll -> 
  console.log ' '
  signale.time 'Running End to End tests...'

Before (testCase) ->> 
  console.log ' '
  signale.await testCase.pickle.name

After (testCase) ->>
  console.log ' '
  signale.complete testCase.pickle.name

AfterAll ->>
  console.log ' '
  signale.timeEnd 'Running End to End tests...'