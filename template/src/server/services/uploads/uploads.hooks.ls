{getBase64DataURI} = require 'dauria'

multipartToDatauri = (hook) -> 
  if not hook.data.uri and hook.params.file
    file = hook.params.file
    {buffer, mimetype} = file
    uri = getBase64DataURI buffer, mimetype
    hook.data = {uri, mimetype}
  hook 

createDatabaseLog = (hook) ->>
  partnerId = hook.params.useraccount.organization.profile.id
  rawFileUrl = (hook.result.id.split '.')[0]
  delete hook.result.uri
  try
    bulkupload = await hook.app.services.bulkuploads.create {rawFileUrl, partnerId}
    hook.result = Object.assign {}, hook.result, bulkupload
  catch
    hook.app.error 'createDatabaseLog Error', createDatabaseLog
  hook

module.exports =
  before: 
    # all: [disallow 'external']
    all: []
    find: []
    get: []
    create: [
      multipartToDatauri
    ]
    update: []
    patch: []
    remove: []
  after:
    all: []
    find: []
    get: []
    create: [
      createDatabaseLog
    ]
    update: []
    patch: []
    remove: []
  error:
    all: []
    find: []
    get: []
    create: [
    ]
    update: []
    patch: []
    remove: []