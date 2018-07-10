# any file or directory automatically configured as service
fs = require 'fs'
path = require 'path' 

services = fs.readdirSync path.join __dirname, '.'
  .filter (file) -> file isnt 'index.ls'
  .filter (file) -> file isnt 'auth.ls'
  .map (file) -> require "./#{file}/#{file}.service.ls"

module.exports = !-> services.map (service) ~> @configure service