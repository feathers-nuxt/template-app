<template lang="pug">
#selectservicetype
    Select(v-model='servicetype', v-on:on-change='acknowledge', :value='servicetype', placeholder='Select Service Type')
        Option(v-for='servicetype in servicetypes', :value='servicetype._id', :key='servicetype._id') {{ servicetype.name }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  methods:
    acknowledge: (selected) ->
      @.servicetype = selected
      @.$emit 'selectedservicetype', selected 
  data: ->
    servicetype: @selected 
    servicetypes:
      * name: 'Bulk SMS', _id: 'Bulk SMS'
      * name: 'Conversation', _id: 'Conversation'
      * name: 'Voting', _id: 'Voting'
      * name: 'Inbox Service', _id: 'Inbox Service'
      ...
</script>
<style lang="stylus">
#selectservicetype
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

