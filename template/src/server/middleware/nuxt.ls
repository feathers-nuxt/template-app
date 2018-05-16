{Nuxt, Builder} = require 'nuxt'

config = require '../../../f3.config'

config.dev = not (process.env.NODE_ENV is 'production')

nuxt = new Nuxt config.nuxt

if config.dev
  builder = new Builder nuxt
  builder.build!.then(-> process.emit 'nuxt:build:done')

module.exports = nuxt