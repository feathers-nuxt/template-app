<template lang="pug">
#selectpermission
  Select(v-model='selections' v-on:on-change='acknowledge'  placeholder='Select Permissions' multiple filterable)
    Option(v-for='permission in permissions' :value='permission.id' :key='permission.id') {{ permission.code }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  created: ->
    console.log 'select permissions created', @$store.state.lookup.permissions.length
  methods:
    acknowledge: (selected) ->
      @permission = selected
      @$emit 'selectedpermission', selected 
  data: ->
    selections: []
    permissions: @$store.state.lookup.permissions
</script>
<style lang="stylus">
#selectpermission
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

