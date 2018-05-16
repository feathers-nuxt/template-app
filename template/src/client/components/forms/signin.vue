<template lang="pug">
#signin_comp
  Row
    Col
        h6.logo
  Row
    Col
        h1.btngrp
            ButtonGroup(size='large')                
                nuxt-link#si(to='/auth/signin', class='ivu-btn') Sign In
                nuxt-link#su(to='/auth/signup', class='ivu-btn') Create Account
  Row#signin_cont(:gutter='16')
    Col#signin_form_sec(span='12')
        #signin_form
            Form(:model='signin', :rules='validationrules', label-position='top', ref='signin')
                FormItem(label='Email', prop='email')
                    Input(v-model='signin.email')
                FormItem(label='Password', prop='password')
                    Input(v-model='signin.password', type='password')
                FormItem
                    Button#submit(type='success', long='', @click="handleSubmit('signin')") Login
                FormItem#help
                    p#alt Or sign in using
                    ul#social
                        li
                            Icon.fb(type='social-facebook')
                        li
                            Icon.gp(type='social-googleplus')
                        li
                            Icon.ln(type='social-linkedin')
                FormItem
                    p#terms
                        | Forgot account? &nbsp;
                        nuxt-link(to='/') click here
</template>
<script lang="livescript">

module.exports =
  methods:
    handleSubmit: (name) ->
      ctx = this
      @$refs[name].validate ((valid) ->
        if valid
          then ( (ctx.$store.dispatch 'auth/authenticate', {
              strategy: 'local',
              email: ctx.signin.email,
              password: ctx.signin.password
          }).then( (signin) ->
            titl = 'Welcome back  ' + ctx.$store.state.auth.user.email
            messag = 'Check out you notifications center to see your new messages '
            ctx.$Notice.success title: titl, desc: messag, duration: 16
            #ctx.$router.replace path: '/store' 
            window.location.href = ctx.$store.state.auth.redirectTo
            console.log 'redirects to store after timeout'        
            ).catch( (err) ->
                ctx.$Notice.error title: err.code + ': ' + err.name, desc: err.message, duration: 16
                #console.error 'erroreroor >> ', err
                ) )
            else ctx.$Message.error 'Please correct all the errors on the form before resubmitting'
        #if valid then ctx.$Message.success 'success!' else ctx.$Message.error 'error!'
        return )
      return
  data: ->
    prefix: '+254 ### ### ###'
    signin:
        email: \nrhyska@gmail.com
        password: 'undefined'
    validationrules:
      email: [{
        required: true
        message: 'Please provide your email address'
        trigger: 'blur'
      }, {
        type: 'email'
        message: 'Provided email is invalid'
        trigger: 'blur'
      }]
      password: [{
        required: true
        message: 'Password is required'
        trigger: 'blur'
      }]
</script>
<style lang="stylus">
#signin_comp
    border 2px solid #fff
    width 70%
    margin 0 auto !important
    background #f5f7f9 !important
#su
    background #fff
    font-weight bold
    border-bottom 2px solid #5cadff
#si
    font-weight bold
#social
    display flex
    align-items center
    justify-content center
#social li
    padding 1rem
#alt
    font-size 1.2rem
#social li i
    font-size 2rem
    cursor pointer
#social li i.fb
    color #365899
#social li i.gp
    color #dd4b39
#social li i.ln
    color #007bb6
#submit:hover
    color #ffffff
    border-color #39f
#submit
    padding 1rem
    font-size 1rem
    font-weight bold
    color #f5f7f9
#terms
    font-size 1rem
    text-align center
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
.btngrp
    text-align left
    margin .125rem -.5rem
.ivu-btn-group-large>.ivu-btn
    padding 1rem 3rem
.logo
    width 20rem
    height 4rem
    margin 1rem auto
    background-repeat no-repeat !important
#country_code
    padding .5rem auto
#signin_comp
    padding 1rem 5rem
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
#signin
    // padding-right .5rem
#signin_cta
    padding 2rem
    text-align center
#signin_cta_sec
    background #f5f7f9
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
#signin_form
    padding-top: 0
#signin_form,
#signin_form_sec
    background #ffffff !important
    padding 2rem
#signin_form > form
    padding 2rem
    margin 2rem
    border 1px solid #d7dde4
#signin_img
    width 25rem
    height auto
.ivu-form-label-top .ivu-form-item-label
    font-size 1rem
</style>
