<template lang="pug">
.container
  div(style='margin-bottom: .5rem; display: flex')
    Input(v-model='searchstring' clearable placeholder='Search any column' style='width: 345px')
      // Button(slot='append' icon='ios-search')
    Button(v-if='entity && windowWidth > 666' type='success' style='margin-left: auto; text-transform: capitalize')
      nuxt-link(:to='createurl')
        Icon(type='plus-round')
        span(style='font-weight: bold')    Add {{entity}}
  Table(:loading="loading" v-on:on-current-change='viewEntry' :columns='tablecols' :data='tabledata' v-bind:class='screenSize' ref='datatable')
  .pager
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
  props: <[ columns rows actions total endpoint query url ]>
  created: ->
    @rowscache = @rows
    @entity = @url .split '/' .pop! if @url
  data: -> 
    entity: null
    loading: false
    searchstring: ''
    rowscache: []
    itemsperpage: 10
  computed:
    screenSize: -> small: @windowWidth < 666
    createurl: -> @url + '/add'
    includecreate: -> if @excludecreate is undefined then true else false
    clause: -> Object.assign {}, @query, $limit: @itemsperpage
    tablerows: -> @rows
    tablecols: -> 
      cols = @columns.map (c) ->
        Object.assign {}, c, render: (h, params) -> h 'div', attrs: 'data-label': c.title, [h 'span', {}, params.row[c.key]]
      cols.push @actions if @actions #and @windowWidth > 666 
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
      @clause.$skip = pagenumber * @itemsperpage
      res = await @$store.app.api.services[@endpoint].find query: @clause
      {data} = res
      console.log 'paginate@DataTable', pagenumber, res
      @rowscache = data
      await ( new Promise( (resolve, reject) -> setTimeout((-> resolve('done delay')), 1000 ) ) )
      @loading = false
    resize: (@itemsperpage) -> 
      console.log \pagesize, @itemsperpage
      @paginate 1
    viewEntry: (currentRow, oldCurrentRow) ->
      showurl = @url + '/' + currentRow.id
      console.error showurl, currentRow
      #@$router.push path: showurl
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
