_ = require 'sequelize'

module.exports = 
  id: type: _.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  accountGroupId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'account_groups', key: 'id' }, validate: {}
  roleId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'roles', key: 'id' }, validate: {}
  createdAt: type: _.DATE,
  updatedAt: type: _.DATE,
  deletedAt: type: _.DATE