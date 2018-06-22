_ = require 'sequelize'

module.exports =  
  # userid: type: _.INTEGER, primaryKey: true, autoIncrement: true
  id: type: _.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  username: type: _.STRING, allowNull: false, validate: {}
  password: type: _.STRING, allowNull: false, validate: {}
  userId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'users', key: 'id' }, validate: {}
  statusId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'account_statuses', key: 'id' }, validate: {}
  createdAt: _.DATE,
  updatedAt: _.DATE,
  deletedAt: _.DATE