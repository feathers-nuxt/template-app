fs = require 'fs'
path = require 'path'
util = require 'util'

_ = require 'highland'

format = require 'string-template'

toStream = require 'into-stream' 
{parseDataURI} = require 'dauria'
exceljsStream = require 'exceljs-transform-stream'

aw = require 'awaitify-stream'

D = require 'pipedreams'
{ $, $async  } = D

streamConsumer = ( transform, done ) ->
  $transform = -> $async (data, send, end) ->>
    if end  
      return end! if end
      console.log '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ended'
      done!
    if data?
      try
        x = await transform data
        console.log 'data send' data, x
        send.done data
      catch
        console.log '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' e
    else  
      console.log '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ done done done' 
      done!
  input = D.new_stream!
  input
    .pipe D.$show!
    .pipe $transform!
    .pipe $ 'finish', done
  input


parseUpload = (uri, validate, transform) -> 
  thru = (transform) -> (err, x, push, next) ->>
    if err
      push err
      console.log '<< err', err
      next!
    else
      if x is _.nil 
        push null, x      
        console.log 'x is _.nil ', x 
      else            
        console.log 'next x is y ', x
        y = await transform x # invoke transform fn passing x; f returns a promise
        console.log 'next x is y ', x, y
        push null, y 
        next!
    return x
  traverse = (buffer, transform, resolve, reject) ->>    
    dataStream = (buffer |> toStream) .pipe exceljsStream! # convert xlsx buffer to json stream   
    # headers = await _ ((buffer |> toStream) .pipe exceljsStream!) .head! .collect! .toPromise Promise 
    # if validate headers[0] # validate stream 
    if true
      try
        consumer = streamConsumer transform, resolve
        _ dataStream .take 30 #.ratelimit 1, 1000
          # .consume thru transform 
          .tap (x) -> 
            consumer.write x
            console.log 'tap x', x
          .errors (e) -> 
            consumer.end!
            reject e   
          .done -> 
            consumer.end!
            # resolve!   
        # delay = (ms) -> new Promise (resolve) -> setTimeout resolve, ms
        # s = fs.createReadStream '/home/kharhys/Downloads/Export Bulk.xlsx'
        # reader = aw.createReader s.pipe exceljsStream!
        # writer = aw.createWriter process.stdout
        # chunk = void
        # entries = 0
        # while null isnt (chunk = await reader.readAsync!)
        #   console.log 'chunk', chunk
        #   await delay 3000
        #   entries++
        # console.log 'done async read stream', entries
        # dataStream
        #   .on 'data', (x) ->>
        #       # s.pause!
        #       # y = await transform x
        #       console.log 'data', x
        #       await delay 300
        #       await transform x
        #       # s.resume!
        #   .on 'end', -> 
        #     console.log 'done'
        #     resolve!
      catch
        console.log 'trasformStream Error ', e
    else
      console.log 'xlsx header validation error', headers[0]
      reject new Error 'Uploaded file missing required columns'
  try
    {buffer} = parseDataURI uri 
    new Promise (resolve, reject) -> traverse buffer, transform, resolve, reject
  catch
    console.log 'parseUpload error', e
    Promise.reject e

profile = (app, partnerId) -> (contact)  ->>
  msisdn = contact['Phone Number']
  profile = phoneNumber: msisdn, fullNames: ' ', active: true,  partnerId: partnerId
  try
    lookup = await app.services.contacts.find query: phoneNumber: msisdn, partnerId: partnerId
    contactprofile = if lookup.total is 0 then await app.services.contacts.create profile else lookup.data[0]
    # console.log 'profiled contact', contactprofile.phoneNumber
    contactprofile 
  catch
    Promise.reject e

parseContactList = (app, uri, partnerId) ->
  validate = (header) -> if header.hasOwnProperty 'Phone Number' and header.hasOwnProperty 'Contact Name' then true else false
  parseUpload uri, validate, profile app, partnerId

parseBulkSMS = (app, uri, partnerId, sendtime) -> 
  validate = (header) -> if header.hasOwnProperty 'Phone Number' and header.hasOwnProperty 'Message' then true else false
  parseUpload uri, validate, (contact) ->>
    isTemplate = false
    SCHEDULED_STATUS = 2
    content = contact['Message'] 
    return contact if content is void
    try
      contactprofile = await contact |> profile app, partnerId
      # console.log 'parseBulkSMS for contact', contactprofile.phoneNumber
      mes = {typeId: 3, content, partnerId, isTemplate}
      message = await app.services.messages.create mes
      out = messageId: message.id, messageStatusId: SCHEDULED_STATUS, sendTime: sendtime, contactId: contactprofile.id
      outbound = await app.services.outbound.create out
      sched = messageId: message.id, dateTime: sendtime, outboundId: outbound.id
      schedule = await app.services.schedules.create sched
      scheduledOutboundMessage = Object.assign {}, message, {outbound, schedule}
      console.log 'scheduled Outbound Message to Contact', contact
      scheduledOutboundMessage 
    catch
      console.log 'profiled contact', 'parseupload err', e
      e

module.exports = (app) ->
  scheduleBroadcast:
    perform: (message, sendtime) ->>
      SCHEDULED_STATUS = 2
      broadcast = recipients: []
      for groupoutbound in message.outbound
        {contactGroupId} = groupoutbound
        contactlistlookup = await app.services.contactlists.find query: {contactGroupId} #TODO: pagination
        if contactlistlookup.total
          for contactlistentry in contactlistlookup.data
            id = contactlistentry.contactId 
            sms = messageId: message.id, messageStatusId: SCHEDULED_STATUS, sendTime: sendtime, contactId: id
            outbound = await app.services.outbound.create sms
            schedule = await app.services.schedules.create messageId: message.id, dateTime: sendtime, outboundId: outbound.id
            broadcast.recipients.push  Object.assign {}, message, {outbound, schedule}
        else
          app.error "personalizeBroadcast Error :: could not find contactgroup with id #{contactGroupId}"
      #broadcast.message = Object.assign {}, message, schedule: scheduled
      broadcast 
  scheduleBulkBroadcast:
    perform: (template, sendtime) ->>
      SCHEDULED_STATUS = 2
      broadcast = messages: []
      {typeId, partnerId} = template
      for groupoutbound in template.outbound
        {contactGroupId} = groupoutbound
        contactlistlookup = await app.services.contactlists.find query: {contactGroupId} #TODO: pagination
        if contactlistlookup.total
          for contactlistentry in contactlistlookup.data 
            id = contactlistentry.contactId 
            contactlookup = await app.services.contacts.find query: {id, partnerId}
            if contactlookup.total
              {phoneNumber, fullNames} = contactlookup.data[0]
              content = format template.content, {phoneNumber, fullNames}
              message = await app.services.messages.create {typeId, partnerId, content, sourceAddressId: template.sourceAddressId} 
              bulkextract = await app.services.bulkextracts.create bulkMessageId: template.id, extractedMessageId: message.id
              sms = messageId: message.id, messageStatusId: SCHEDULED_STATUS, sendTime: sendtime, contactId: id
              outbound = await app.services.outbound.create sms
              schedule = await app.services.schedules.create messageId: message.id, dateTime: sendtime, outboundId: outbound.id
              broadcast.messages.push Object.assign {}, message, {outbound, schedule, bulkextract}
            else
              app.error "scheduleBulkBroadcast Error :: could not find contact with id #{id}"
              return
        else
          app.error "scheduleBulkBroadcast Error :: could not find contactlist entries in group with id #{contactGroupId}"
          return
      broadcast.template = Object.assign {}, template
      # console.log util.inspect broadcast, { showHidden: true, depth: null }
      broadcast 
  scheduleBulk:
    perform: (message, sendtime) ->>
      try
        upload = await app.services.uploads.get message.content
        await parseBulkSMS app, upload.uri, message.partnerId, sendtime
        message 
      catch
        console.log 'RESQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ::scheduleBulk Error', e
        throw e
  extractContacts:
    perform: (partnerId, uploadId) ->>
      try
        upload = await app.services.uploads.get uploadId
        await parseContactList app, upload.uri, partnerId 
        uploadId
      catch
        console.log 'RESQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ::extractContacts Error', e
