<template lang="pug">
.show_comp    
  .demo-spin-container
    Spin(fix v-if='!model')
    Card(style=' ')
      p(slot='title')
        icon(type='android-contact', style='font-size: 1.2rem') 
        |  {{  intent }} {{ entity }}
      .edit(slot='extra' v-if="mode && mode == 'read'")
        Button(type='dashed' @click='edit')
          icon(type='edit')
          |             Edit
      .readonly(v-if="immutable")
        Table(:columns='cols' :data="rows")
      .form(v-else)
        Form(:label-width="150" label-position="left", :model='formModel' ref='form' autocomplete='off' :rules='validation')
          FormItem(v-for='row in rows' v-if="row.mode == 'write'" :prop='row.prop' :label='row.label' :key='row.prop' )
            Input(v-if="row.type == 'text' || row.type == 'password' || row.type == 'textarea' || row.type == 'url' || row.type == 'email'" 
            autocomplete='new-password' :type='row.type' v-model="formModel[row.prop]" :placeholder="row.label")   
            SelectCard(v-if="row.type == 'select'" v-on:selected='updateSelected' :endpoint='row.endpoint') 
            .fileUpload(v-if="row.type == 'file'")
              .uploaderr
                | {{form.uploaderr}}
              Upload(:headers='form.headers' accept='.csv' name='bulkupload' type='drag' action='/api/uploads' 
              :on-success='setBulkuploadId' :on-error='showUploadError' :on-remove='unsetBulkuploadId' 
              :before-upload='attacheFile(row.prop)')
                div(v-if="!form.bulkuploadId")
                  Icon(type='ios-cloud-upload', size='52', style='color: #3399ff')
                  p
                    | Upload Excel or CSV file
                    br
                    i  Click or drag files here to upload 
          .submit
            Button(type='dashed' shape='circle' @click="cancel") Cancel
            Button(type='info'  shape='circle' @click="upsert" style='margin-left: 1rem' :loading='submitting') {{intent}}
</template>

<style lang="stylus" scoped>
.ivu-card 
  width 96vw
  max-width 666px
.show_comp
  display flex
  flex-direction column
  justify-content center
  align-items center
  .demo-spin-container
    display inline-block
    position relative
    border 1px solid #eee
    .edit
      cursor pointer
      color #00897b
.form
  padding 1rem
  .submit
    padding-top 1rem
    display flex
    align-items flex-end
    justify-content flex-end
</style>


<script lang="livescript">
require! '~/components/SelectCard.vue' 
# mode read, write, readwrite
module.exports = 
  props: <[ model schema validation endpoint mode ]>
  data: ->
    immutable: true
    submitting: false
    form:
      contentType: void
      uploaderr: void
      meta: {}
      #headers:
      #  Authorization: @$store.app.api.passport.getCookie(@$store.app.api.passport.options.cookie)
    cols:
      *title: 'Attribute', key: 'prop', width: 200, fixed: 'left'
      *title: 'Value', key: 'val'
      ...
  computed:
    intent: -> if @mode is 'write' then 'Create' else if @mode is 'read' then 'View' else then 'Update'
    entity: -> 
      if @endpoint
        str = @endpoint
        str.trim!.toLowerCase! 
        exp = /^proxy/
        str = str.slice 5 if exp.test str
        str.charAt(0).toUpperCase! + str.slice 1
        str.slice 0, - 1
      else
        void
    title: ->
      singular = @endpoint.substring(0, @endpoint.length - 1)
      str = singular.charAt(0).toUpperCase! + singular.slice(1)
      "#{str} #{@$store.state.route.params.id}"
    rows: -> 
      Object.keys @schema .map (attr) ~> 
        rules = @schema[attr].split '|'
        _type = rules[1].split ':'
        if _type[0] is 'file'
          @form.contentType = 'multipart/form-data'
          @form[attr] = void
          #console.log '>>>>' @form #prop: attr, val: @model[attr], mode: rules[0], type: _type[0], endpoint: _type[1]
        prop: attr, val: @model[attr], mode: rules[0], type: _type[0], endpoint: _type[1], label: rules[2] || attr
  methods:
    setBulkuploadId: (response, file, fileList) ->
      @form.bulkuploadId = response.id
      console.log 'upload success', response, @form
    unsetBulkuploadId: (file, fileList) ->
      @form.bulkuploadId = void
      console.log 'on-remove success' @form
    showUploadError: (error, file, fileList) ->
      {code, name, message} = file
      @form.uploaderr = "Error #{code}: #{name}: #{message}"
      console.log 'upload Error', @form, @form.uploaderr
    attacheFile: (filename) ->
      #@form.uploaderr = void
      #console.log '>>>>>' filename
      (file) ~>
        @form[filename] = file
        @form.meta[filename] =
          filename: file.name
          contentType: file.type
          knownLength: file.size
        console.log '<<<<<<<' @form
        false
    updateSelected: (selected, entity) -> @formModel["#{entity}ID"] = selected
    cancel: -> 
      if @$store.state.route.query.edit or  @mode is 'write'
        @$router.push path: @$store.state.route.from.fullPath
      else @immutable = true
    edit: -> @immutable = false
    upsert: ->>
      @$refs['form'].validate (valid) ~>>
        console.log '@@@@@@ valid formModel' valid
        if not valid
          @$Message.error content: 'Please correct all errors before submitting again' duration: 16
        else
          @$Spin.show!
          data = Object.assign {}, @form, @formModel
          params = query: {}
          if data.contentType is "multipart/form-data"
            params.query.contentType = "multipart/form-data"
          delete data.contentType
          #  data = new FormData
          #  Object.keys(_data).map (field) ->
          #    if _data[field] and field isnt 'contentType'
          #      console.log '>>>>>' field, _data[field]
          #      data.append field, _data[field]
          #else
          #  data = _data
          console.log '@@@@@@ valid data' data
          path = if @mode is 'write' then 'create' else 'patch'
          try
            payload = if @mode is 'write' then data else [ data.id, data, params ]
            #await @$store.dispatch "#{@endpoint}/#{path}" payload
            res = await @$store.app.api.service(@endpoint)[path] payload, params
            console.log "upsert@DataCard #{@intent} :: #{@endpoint}/#{path}" data, payload, res
            @$Message.info content: res.message, duration: 16 if res.message
            @cancel!
          catch
            console.error "upsert@DataCard #{@intent}" e
            @$Message.error content: e.message, duration: 16
          finally
            @$Spin.hide!
  created: ->>
    @immutable = false if @mode and @mode is 'write'
    @immutable = false if @mode and @mode is 'readwrite'
    @formModel = @model
    console.log 'DataCard created' @mode, @immutable, @endpoint, @schema, @model, @cols
  components:
    SelectCard: SelectCard.default
</script>
