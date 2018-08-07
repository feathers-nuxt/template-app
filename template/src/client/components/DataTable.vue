<template lang="pug">
.container
  .deactivate_modal
    Modal(v-model='deactivate_modal', width='500')
      p(slot='header', style='color:#f60;text-align:center')
        icon(type='information-circled' style='padding-right: 1rem')
        span Deactivate Confirmation
      div(style='text-align:center')
        p Sure to deactivate selected entry?
      div(slot='footer')
        Button(type='error' size='large' long :loading='deactivate_modal_loading' @click='deactivate') Deactivate
  .activate_modal
    Modal(v-model='activate_modal', width='500')
      p(slot='header', style='color:green;text-align:center')
        icon(type='information-circled' style='padding-right: 1rem')
        span Activate Confirmation
      div(style='text-align:center')
        p Sure to activate selected entry?
      div(slot='footer')
        Button(type='success' size='large' long :loading='activate_modal_loading' @click='activate') Activate
  div(style='margin-bottom: .5rem; display: flex')
    Input(v-model='searchstring' clearable placeholder='Search any column' style='width: 345px')
      // Button(slot='append' icon='ios-search')
    Button(v-if="insert == '' && windowWidth > 666" type='success' style='margin-left: auto; text-transform: capitalize')
      nuxt-link(:to='createurl')
        Icon(type='plus-round')
        span(style='font-weight: bold')    Add {{entity}}
  Table(:loading="loading" v-on:on-current-change='viewEntry' :columns='tablecols' :data='tabledata' v-bind:class='screenSize' ref='datatable')
  .pager(v-if="total > itemsperpage")
    Page(v-if="windowWidth > 666" :total="total" show-sizer show-total v-on:on-change='paginate' v-on:on-page-size-change='resize')
    Page(v-else :total="total" show-total v-on:on-change='paginate' v-on:on-page-size-change='resize')
</template>

<style lang="stylus" scoped> 
.container 
  justify-content: flex-start
  min-height: 80vh
  background: #f0f0f0
  padding: 1rem
  border: 1px solid #fff
.pager
  display flex
  align-items center
  justify-content flex-end
  margin 0
  margin-top 1rem
.ivu-table-cell div[data-label]
  color: green
  height 1rem
  border 1px solid hotpink !important
.small 
  td.ivu-table-column-right
    .ivu-table-cell > div
      border 1px solid hotpink
      display: flex
      align-items: flex-end
      justify-content: flex-end
</style>


<script lang="livescript" >
module.exports =
  props: <[ columns rows total prefix endpoint suffix query actions expand toggle update insert  ]>
  created: ->>
    @rowscache = @rows
    #console.log '<<<<<<<< ', @insert
  data: -> 
    loading: false
    searchstring: ''
    rowscache: []
    itemsperpage: 10
    totalcache: 0
    selected: void
    activate_modal: false
    activate_modal_loading: false
    deactivate_modal: false
    deactivate_modal_loading: false
  computed:
    screenSize: -> small: @windowWidth < 666
    entity: -> 
      if @endpoint
        str = @endpoint
        str.toLowerCase! 
        exp = /^proxy/
        str = str.slice 5 if exp.test str
        str.charAt(0).toUpperCase! + str.slice 1
        str.slice 0, - 1
      else
        void
    createurl: -> 
      if @prefix
        "#{@$store.state.route.path}/#{@prefix}/add"
      else
        "#{@$store.state.route.path}/add"
    includecreate: -> if @excludecreate is undefined then true else false
    clause: -> Object.assign {}, @query, $limit: @itemsperpage
    tablerows: -> @rowscache
    tablecols: -> 
      cols = @columns.map (c) ->
        Object.assign {}, c, render: (h, params) -> h 'div', attrs: 'data-label': c.title, [h 'span', {}, params.row[c.key]]
      cols.unshift {
        title: '' width: 50 align: 'right' render: (h, params) -> h 'div', attrs: {}, [++params.index]
      }
      w = 66
      w += 66 if @update is ""
      w += 66 if @toggle is ""
      actions =
        title: ' ' key: 'action' width: w, align: 'right' render: (h, params) ~> h 'div', [
          (if @update is "" and params.row.id then  
            (h 'Button',
              props: type: 'text' size: 'small' shape: 'circle'
              style: marginRight: '5px'
              on:
                click: ~> @edit params.row.id
            , [h('Tooltip', props: placement: 'left' content: 'Update', [h('Icon', props: type: 'compose')])] )),
          ( if @toggle is "" then 
            (h 'Button',
              props: type: 'text' size: 'small' shape: 'circle'
              style: marginRight: '5px'
              on:
                click: ~> if params.row.status is \active then @triggerDeactivate params.row.id else @triggerActivate params.row.id
            , [
              if params.row.status is \active then
                h('Tooltip', props: placement: 'left' content: 'Deactivate', [
                  h('Icon', { props: {type: 'unlocked'}, style: {color: 'green'} }  )])
              else
                h('Tooltip', props: placement: 'left' content: 'Activate', [
                  h('Icon', { props: {type: 'locked'}, style: {color: 'red'} }  )]) ] )),
          ( if @expand is "" and params.row.id then then 
            (h 'Button', 
              props: type: 'text' size: 'small' shape: 'circle'
              style: marginRight: '5px'
              on:
                click: ~> @show params.row.id
            , [h('Tooltip', props: placement: 'left' content: 'Details', [h('Icon', props: type: 'arrow-expand')])]  )
          ) ]
      cols.push actions
      #if @actions
      cols
    tabledata: ->
      if @searchstring
        if @tablerows.length
          searchkeys = Object.keys @tablerows.0 
          searchdata = @tablerows.map ((row) ->
            (Object.keys row).map ((key) -> row[key] = String row[key])
            row)
          results = (@$fuzzysort.go @searchstring, searchdata, {keys: searchkeys}).map ((r) -> r.obj)
          return results
      @tablerows
  methods:
    paginate: (pagenumber) ->>
      console.log 'paginate@DataTable', @$store
      @loading = true
      @clause.$skip = --pagenumber * @itemsperpage
      #res = await @$store.app.api.services[@endpoint].find query: @clause
      params = Object.assign {}, @clause
      res = await @$store.dispatch "#{@endpoint}/find" query: params
      {data} = res
      console.log 'paginate@DataTable', pagenumber, @endpoint, params, res
      @rowscache = data
      #await ( new Promise( (resolve, reject) -> setTimeout((-> resolve('done delay')), 1000 ) ) )
      @loading = false
    resize: (@itemsperpage) -> 
      console.log \pagesize, @itemsperpage
      @paginate 1
    viewEntry: (currentRow, oldCurrentRow) ->
      showurl = "#{@$store.state.route.path}/#{currentRow.id}"
      console.error showurl, currentRow
      @show currentRow.id
      #@$router.push path: showurl
    
    refresh: ->>
      params = { query: {} }
      params.query.urlPrefix = @prefix if @prefix
      res = await @$store.dispatch "#{@endpoint}/find" params
      @rowscache = res.data
      @totalcache = res.total
    edit: (id) -> @$router.push path: "#{@$store.state.route.path}/#{id}" query: edit: true
    show: (id) ->
      path = if @prefix then "#{@$store.state.route.path}/#{@prefix}/#{id}" else "#{@$store.state.route.path}/#{id}"
      @$router.push {path}
    triggerDeactivate: (id) ->>
      @deactivate_modal = true
      @selected = id
      return 
    triggerActivate: (id) ->>
      @activate_modal = true
      @selected = id
      return 
    toggleStatus: (intent) ->>
      if intent is \activate
        @activate_modal_loading = true
      else
        @deactivate_modal_loading = true
      try 
        id = parseInt @selected
        status = if intent is \activate then 1 else 2
        payload = [ id ]
        params = query: urlSuffix: 'status'
        console.log "#{@endpoint}/patch" id, {status}, params
        #await @$store.dispatch "#{@endpoint}/patch" payload, params
        res = await @$store.app.api.services[@endpoint].patch id, {status}, params
        console.log "#{@endpoint}/patch res" res
        @$Message.success "#{intent} Successful"
        await @refresh!
      catch
        @$Message.error "#{intent} failed" e.message
        console.error '@@@@@@@@@@@@@@@@' e
      finally
        @selected = void
        if intent is \activate
          @activate_modal_loading = false
          @activate_modal = false
        else
          @deactivate_modal_loading = false
          @deactivate_modal = false
    deactivate: ->>
      @toggleStatus \deactivate
    activate: ->>
      @toggleStatus \activate
    exportData: (type) ->
      if type is 1
        @$refs.datatable.exportCsv {filename: 'The original data'}
      else
        if type is 2
          @$refs.datatable.exportCsv {
            filename: 'Sorting and filtering data'
            original: false
          }
        else
          if type is 3
            @$refs.datatable.exportCsv {
              filename: 'Custom data'
              columns: @columns.filter ((col, index) -> index < 4)
              data: @rows.filter ((data, index) -> index < 4)
            }
      return 
</script>
