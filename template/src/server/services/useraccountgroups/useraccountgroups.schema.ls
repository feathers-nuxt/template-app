_ = require 'sequelize'

module.exports = 
  id: type: _.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  accountId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'user_accounts', key: 'id' }, validate: {}
  groupId: type: _.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'account_groups', key: 'id' }, validate: {}
  createdAt: _.DATE,
  updatedAt: _.DATE,
  deletedAt: _.DATE 
