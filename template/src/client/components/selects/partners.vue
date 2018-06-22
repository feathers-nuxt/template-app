<template lang="pug">
#selectpartner
  Select(v-model='selections' v-on:on-change='acknowledge'  placeholder='Select partners' filterable)
    Option(v-for='partner in partners' :value='partner.id' :key='partner.id') {{ partner.companyName }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  created: ->
    console.log 'select partners created', @$store.state.lookup.partners.length
  methods:
    acknowledge: (selected) ->
      @partner = selected
      @$emit 'selectedpartner', selected 
  data: ->
    selections: []
    partners: @$store.state.lookup.partners
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

