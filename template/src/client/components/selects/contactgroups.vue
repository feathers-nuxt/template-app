<template lang="pug">
#selectcontactgroup
    Select(v-model='contactgroup', v-on:on-change='acknowledge', :value='contactgroup', placeholder='Select Contact Group')
        Option(v-for='contactgroup in contactgroups', :value='contactgroup.id', :key='contactgroup.id') {{ contactgroup.groupName }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  methods:
    acknowledge: (selected) ->
      @.contactgroup = selected
      @.$emit 'selectedcontactgroup', selected 
  data: ->
    contactgroup: @selected 
    contactgroups: @.$store.state.lookup.contactGroups
</script>
<style lang="stylus">
#selectcontactgroup
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style> 


