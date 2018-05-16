_ = require 'sequelize'

module.exports =  
  userid: type: _.INTEGER, primaryKey: true, autoIncrement: true
  username:  type: _.STRING, allowNull: false, validate: notNull: true, isAlphanumeric: true
  email: type: _.STRING, allowNull: false, unique: true, validate: notNull: true, isEmail: true
  password:  type: _.STRING, allowNull: false, validate: notNull: true
  isEnabled: type: _.BOOLEAN, allowNull: false, defaultValue: true
  role: allowNull: false, type: _.STRING, validate: isAlpha: true, notNull: true
  #gender: type: String,
  dateOfBirth: type: _.DATE, allowNull: true
  isVerified:  type: _.BOOLEAN, allowNull: false, defaultValue: true
  verifyToken:  type: _.STRING, allowNull: true
  verifyExpires:  type: _.DATE, allowNull: true
  verifyChanges:  type: _.STRING, allowNull: true
  resetToken:  type: _.STRING, allowNull: true
  resetExpires:  type: _.DATE, allowNull: true