blobstore = require 'content-addressable-blob-store'
blobService = require 'feathers-blob'
{BadRequest} = require '@feathersjs/errors'
multer = require 'multer'

path = require 'path'

hooks = require './uploads.hooks'

store = blobstore path.join __dirname, '../../../../uploads'

createMultipartMiddleware = (app) -> (req, res, next) ->
  opts =
    fileFilter: (req, file, cb) -> # The function should call `cb` with a boolean to indicate if the file should be accepted
      # if file.mimetype is 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' then
      if file.mimetype is 'application/vnd.ms-excel' then
        cb null, true # To accept the file pass `true` 
      else
        # cb null, false # To reject this file pass `false` 
        err = new Error 'Invalid file type. Only .xlsx files are allowed'
        err.data = file
        cb err # You can always pass an error if something goes wrong
  # bulkUpload = (multer opts).single 'bulkupload'
  bulkUpload = (multer!).single 'bulkupload'
  bulkUpload req, res, (err) -> if not err then next! else next new BadRequest err.message, err.data or err

transferMiddleware = (req, res, next) ->
  req.feathers.file = req.file
  next!

module.exports = ->
  app = @
  app.use '/uploads', createMultipartMiddleware(app), transferMiddleware, blobService Model: store
  service = app.service 'uploads'
  service.hooks hooks
  return
