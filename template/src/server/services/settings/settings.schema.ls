_ = require 'sequelize'

module.exports = 
  name: allowNull: false, type: _.STRING, validate: isAlpha: true, notNull: true
  value: allowNull: false, type: _.STRING, validate: notNull: true