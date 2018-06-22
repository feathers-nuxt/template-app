_ = require 'sequelize'

module.exports = 
  id: type: _.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  name: type: _.STRING, allowNull: false, validate: {}
  description: type: _.STRING, allowNull: false, validate: {}
  createdAt: type: _.DATE,
  updatedAt: type: _.DATE,
  deletedAt: type: _.DATE