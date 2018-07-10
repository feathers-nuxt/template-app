<template lang="pug">
#reports_form_comp
  Form#reports_form(inline  ref='report' :model='report' :rules='validationrules' label-position='top' )
    FormItem(label='Start Date', prop='startdate')
      DatePicker(type="date" placeholder="Pick Start date" v-model="report.startdate" style="width: 100%" )
    FormItem(label='End Date', prop='enddate')
      DatePicker(type="date" placeholder="Pick End date" v-model="report.enddate" style="width: 100%" )
    FormItem(label=' ' style="margin-left: auto")
      Button(type='info' long shape='circle' @click="handleSubmit('report')") Generate

</template>

<script lang="livescript">
module.exports = 
  fetch: ({store}) ->>
    await store.dispatch 'lookup/partners'
    console.log 'fetch@pages/reports/index'
  data: ->
    report:
      startdate: void 
      enddate: void 
      reporttype: void
      partner: void
</script>

<style lang="stylus" scoped>
#reports_form_comp
  background #f0f0f0
  padding 1rem
  border 1px solid #fff
#reports_form
  display flex
  align-items flex-end
.actions  
  display flex
  justify-content flex-end
</style>

