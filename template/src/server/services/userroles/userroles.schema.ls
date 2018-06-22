_ = require 'sequelize'

module.exports = 
  id: type: _.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  userId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'users', key: 'id' }, validate: {}
  roleId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'roles', key: 'id' }, validate: {}
  createdAt: _.DATE,
  updatedAt: _.DATE,
  deletedAt: _.DATE