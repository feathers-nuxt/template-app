_ = require 'lodash'

patterns = require './patterns'

module.exports = (key) ->
    validator: (v) -> (_.get patterns, key).test v
    message: _.get patterns, 'messages.' + key

exports.patterns = patterns