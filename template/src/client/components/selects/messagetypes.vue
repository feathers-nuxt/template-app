<template lang="pug">
#messagetype
    Select(v-model='messagetype', v-on:on-change='acknowledge', :value='messagetype', placeholder='Select Message Type')
        Option(v-for='messagetype in messagetypes', :value='messagetype.id', :key='messagetype.id') {{ messagetype.code }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  methods:
    acknowledge: (selected) ->
      @.messagetype = selected
      @.$emit 'selectedmessagetype', selected 
  data: ->
    messagetype: @selected 
    messagetypes: @.$store.state.lookup.messageTypes
</script>
<style lang="stylus">
#messagetype
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

