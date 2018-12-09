<template lang="pug">
#selectpartner
  Select(v-model='selection' @on-change='acknowledge'  :placeholder='help' filterable)
    Option(v-for='option in options' :value='option.id' :key='option.id') {{ option.name }}
</template>
<script lang="livescript">
module.exports =
  props: <[ selected endpoint ]> 
  methods:
    acknowledge: (selected) ->
      @$emit "selected", selected , @entity
  data: ->
    selection: void
    options: @$store.state.lookup[@endpoint]
  computed: 
    help: -> "Select #{@entity}"
    entity: -> 
      endpoint = @endpoint
      endpoint.slice 0, -1
</script>
<style lang="stylus">
#selectpartner
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

