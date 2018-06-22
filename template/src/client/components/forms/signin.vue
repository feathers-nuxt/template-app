<template lang="pug">
#signin_comp
  Form(:model='signin', :rules='validationrules', label-position="top", ref='signin')
    FormItem(label='Username', prop='username')
      Input(v-model='signin.username')
    FormItem(label='Password', prop='password')
      Input(v-model='signin.password', type='password')
    FormItem(:style="{marginBottom: 0}")
      Button#submit(:disabled="!$store.state.network.online" type='success' long shape='circle' @click="handleSubmit") Login
</template>
<script lang="livescript">
module.exports =
  methods:
    handleSubmit: ->
      @$refs['signin'].validate (valid) ~>>
        if not valid
          err = 'Please correct all the errors on the form before resubmitting'
          @$Message.error content: err, duration: 10
          return
        else
          try
            await @$store.dispatch 'auth/authenticate', {
              strategy: 'local',
              username: @signin.username,
              password: @signin.password
            }
            @$Message.success content: "Welcome back #{@signin.username}" duration: 15
            @$router.push path: @$store.state.auth.redirectTo
          catch
            err = "Error #{e.code}: #{e.name}! #{e.message}"
            @$Message.error content: err, duration: 10
            console.error 'auth/authenticate >> ', @
  data: ->
    prefix: '+254 ### ### ###'
    signin:
        username: undefined
        password: undefined
    validationrules:
      username: [{
        required: true
        message: 'Please provide your username address'
        trigger: 'blur'
      }]
      password: [{
        required: true
        message: 'Password is required'
        trigger: 'blur'
      }]
</script>
<style lang="stylus" scoped>
.ivu-form-item
    text-align left
#signin_comp
    border 2px solid #fff
    background #f5f7f9 
    padding 2rem
#submit
    font-size 1rem
    font-weight bold
.ivu-radio-inner:after
    border-radius 50% !important
    width 8px
    height 9px
.ivu-radio-group-item
    margin-right 10rem
.ivu-date-picker
    width 100%
.ivu-col-span-11
    padding-left 0 !important
    padding-right 0 !important 
.ivu-btn-group-large>.ivu-btn
    padding 1rem 3rem 
#country_code
    padding .5rem auto
#signin_comp .ivu-notice-title
    height 1rem !important
    margin-bottom .5rem
#help
    color rgb(158, 167, 180)
    text-align center
#signin_cont
    display flex
    background #ffffff !important
    border 1px solid #d7dde4
#signin_cont > div
    flex 1
#signin_form > form
    border 1px solid #d7dde4
.ivu-form-label-top .ivu-form-item-label
    font-size 1rem
</style>
