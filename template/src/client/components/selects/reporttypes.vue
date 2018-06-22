<template lang="pug">
#selectreporttype
    Select(v-model='reporttype', v-on:on-change='acknowledge', :value='reporttype', placeholder='Select Report Type')
        Option(v-for='reporttype in reporttypes', :value='reporttype._id', :key='reporttype._id') {{ reporttype.name }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  methods:
    acknowledge: (selected) ->
      @.reporttype = selected
      @.$emit 'selectedreporttype', selected 
  data: ->
    reporttype: @selected 
    reporttypes:
      * name: 'Credit Allocation', _id: 'Credit Allocation'
      * name: 'Credit Consumption', _id: 'Credit Consumption'
      * name: 'Total Credits Usage/User', _id: 'Total Credits Usage/User'
      * name: 'Payments', _id: 'Payments'
      * name: 'Inbox Messages', _id: 'Inbox Messages'
      * name: 'Outbox Messages', _id: 'Outbox Messages'
      * name: 'Quick SMS Messages', _id: 'Quick SMS Messages'
      * name: 'Interactive Messages', _id: 'Interactive Messages'
      * name: 'Voting Messages', _id: 'Voting Messages'
      * name: 'Bulk Messages Stats', _id: 'Bulk Messages Stats'
      * name: 'Bulk Messages: Scheduled', _id: 'Bulk Messages: Scheduled'
      * name: 'Bulk Messages: Sent', _id: 'Bulk Messages: Sent'
      * name: 'Bulk Messages: Delivered', _id: 'Bulk Messages: Delivered'
      * name: 'Bulk Messages: Not Delivered', _id: 'Bulk Messages: Not Delivered'
      * name: 'BulkUpload Messages: Scheduled', _id: 'BulkUpload Messages: Scheduled'
      * name: 'BulkUpload Messages: Sent', _id: 'BulkUpload Messages: Sent'
      * name: 'BulkUpload Messages: Delivered', _id: 'BulkUpload Messages: Delivered'
      * name: 'BulkUpload Messages: Not Delivered', _id: 'BulkUpload Messages: Not Delivered'
      ...
</script>
<style lang="stylus">
#selectreporttype
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

