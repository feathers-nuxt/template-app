<template lang="pug">
#selectshortcode
    Select(v-model='shortcode' v-on:on-change='acknowledge' :value='shortcode' placeholder='Select Short Code' clearable)
        Option(v-for='address in shortcodes', :value='address.id', :key='address.id') {{ address.shortCode }}
</template>
<script lang="livescript">
module.exports =
  props: <[selected]>
  methods:
    acknowledge: (selected) ->
      @shortcode = selected
      @$emit 'selectedshortcode', selected 
  data: ->
    shortcode: @selected 
    shortcodes: @$store.state.lookup.sourceAddresses
</script>
<style lang="stylus">
#selectshortcode
    width 100%
    overflow-x none
    // padding .5rem
.ivu-select-item
    text-align left
.ivu-select-dropdown
    overflow-x  hidden
    overflow-y auto
</style>

