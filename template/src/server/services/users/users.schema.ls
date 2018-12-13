<% if(database == 'sql'){%>
Sequelize = require 'sequelize'

module.exports =  
  # userid: type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
  # username:  type: Sequelize.STRING, allowNull: false, validate: notNull: true, isAlphanumeric: true
  # email: type: Sequelize.STRING, allowNull: false, unique: true, validate: notNull: true, isEmail: true
  # password:  type: Sequelize.STRING, allowNull: false, validate: notNull: true
  # isEnabled: type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
  # role: allowNull: false, type: Sequelize.STRING, validate: isAlpha: true, notNull: true
  # #gender: type: String,
  # dateOfBirth: type: Sequelize.DATE, allowNull: true
  # isVerified:  type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
  # verifyToken:  type: Sequelize.STRING, allowNull: true
  # verifyExpires:  type: Sequelize.DATE, allowNull: true
  # verifyChanges:  type: Sequelize.STRING, allowNull: true
  # resetToken:  type: Sequelize.STRING, allowNull: true
  # resetExpires:  type: Sequelize.DATE, allowNull: true
  id: type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, validate: {}
  surname: type: Sequelize.STRING, allowNull: false, validate: {}
  otherNames: type: Sequelize.STRING, allowNull: false, validate: {}
  phone: type: Sequelize.STRING, allowNull: false, validate: {}
  email: type: Sequelize.STRING, allowNull: false, validate: {}
  createdAt: Sequelize.DATE
  updatedAt: Sequelize.DATE

<%}else{%>
{Schema} = require 'mongoose'

colors = <[ #1ABC9C #16A085 #2ECC71 #27AE60 #3498DB #2980B9 #34495E #EA4C88 #CA2C68 #9B59B6 #8E44AD #F1C40F #F39C12 #E74C3C #C0392B ]>

module.exports =
  # bitbucketId:  type: String ,
  # bitbucket:  type: Schema.Types.Mixed ,
  # dropboxId:  type: String ,
  # dropbox:  type: Schema.Types.Mixed ,
  # facebookId:  type: String ,
  # facebook:  type: Schema.Types.Mixed ,
  # githubId:  type: String ,
  # github:  type: Schema.Types.Mixed ,
  # googleId:  type: String ,
  # google:  type: Schema.Types.Mixed ,
  # instagramId:  type: String ,
  # instagram:  type: Schema.Types.Mixed ,
  # linkedinId:  type: String ,
  # linkedin:  type: Schema.Types.Mixed ,
  # paypalId:  type: String ,
  # paypal:  type: Schema.Types.Mixed ,
  # spotifyId:  type: String ,
  # spotify:  type: Schema.Types.Mixed ,
  email: type: String, required: true unique: true
  password:  type: String, required: true 
  name:  type: String, required: false 
  isEnabled:
    type: Boolean
    'default': true
  role:
    required: true
    type: String
    trim: true
  color:
    required: false
    type: String
    trim: true
    enum: colors
    default: -> colors[Math.floor(Math.random()*colors.length)]
  gender: type: String
  dob: type: Date
  createdAt:  type: Date, 'default': Date.now 
  updatedAt:  type: Date, 'default': Date.now 
  isVerified:  type: Boolean 
  verifyToken:  type: String 
  verifyExpires:  type: Date 
  verifyChanges:  type: Object 
  resetToken:  type: String 
  resetExpires: type: Date
<% } %>