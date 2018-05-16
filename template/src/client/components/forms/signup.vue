<template lang="pug">
#signup_comp
  Row
    Col
        //- h6.logo
  Row
    Col
        h1.btngrp
            ButtonGroup(size='large')                
                nuxt-link#si(to='/auth/signin', class='ivu-btn') Sign In
                nuxt-link#su(to='/auth/signup', class='ivu-btn') Create Account
  Row#signup_cont(:gutter='16')
    Col#signup_form_sec(span='12')
        #signup_form
            Form(:model='signup', :rules='validationrules', label-position='top', ref='signup')
                FormItem
                    Row
                        Col(span='11')
                            FormItem(label='First name', prop='first_name')
                                Input(v-model='signup.first_name', placeholder='First name')
                        Col(span='11', offset='2')
                            FormItem(label='Last name', prop='last_name')
                                Input(v-model='signup.last_name', placeholder='Last name')
                FormItem(label='Email', prop='email')
                    Input(v-model='signup.email')
                FormItem(label='Password', prop='password')
                    Input(v-model='signup.password', type='password')
                FormItem(label='Confirm Password', prop='confirm_password')
                    Input(v-model='signup.confirm_password', type='password')
                FormItem(label='Date of birth', prop='confirm_password')
                    DatePicker(type='date', placeholder='Date of birth', v-model='signup.dob')
                FormItem(label='Gender', prop='gender')
                    RadioGroup(v-model='signup.gender')
                        Radio(label='male') Male
                        Radio(label='female') Female
                FormItem
                    p#terms
                        | By clicking Create account,you agree to our &nbsp;
                        nuxt-link(to='/') terms of service
                FormItem
                    Button#submit(long='', @click="handleSubmit('signup')") Create account
                FormItem#help
                    p#alt Or sign up using
                    ul#social
                        li
                            Icon.fb(type='social-facebook')
                        li
                            Icon.gp(type='social-googleplus')
                        li
                            Icon.ln(type='social-linkedin')
</template>
<script lang="livescript">

module.exports =
  methods: 
    handleSubmit: (name) ->
      ctx = this
      @$refs[name].validate ((valid) ->
        if valid
          then ( (ctx.$store.dispatch 'auth/signup', {
            email: ctx.signup.email
            phone: ctx.signup.phone
            first_name: ctx.signup.first_name
            last_name: ctx.signup.last_name
            dob: ctx.signup.dob
            gender: ctx.signup.gender
            password: ctx.signup.password
          }).then( (signup) -> set-timeout (-> ctx.$router.push path: '/store' ), 1500
          ).catch( (err) -> console.error 'signup error >> ', err ) )
        else ctx.$Message.error 'Please correct all the errors on the form before resubmitting'
        return )
      return
  data: ->
    prefix: '+254 ### ### ###'
    signup:
        email: \nrhyska@gmail.com
        phone: 254723304318
        first_name: \Ever
        last_name: \Greatest
        dob: '1990-11-15'
        gender: 'female'
        password: 'undefined'
        confirm_password: 'undefined'
    validationrules:
      first_name: [{
        required: true
        message: 'First Name is required'
        trigger: 'blur'
      }]
      last_name: [{
        required: true
        message: 'Last Name is required'
        trigger: 'blur'
      }]
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
      confirm_password: [{
        required: true
        message: 'Password confirmation is required'
        trigger: 'blur'
      }]
</script>
<style lang="stylus">
#signup_comp
    border 1px solid #fff
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
    color #39f
#submit
    padding 1rem
    font-size 1rem
    font-weight bold
    color #657180
    background #ffda00
#terms
    font-size 0.9rem
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
#signup_comp
    padding 1rem 5rem
#help
    color rgb(158, 167, 180)
    text-align center
#signup_cont
    display flex
    background #ffffff !important
    border 1px solid #d7dde4
    border-top 1px solid #5cadff
#signup_cont > div
    flex 1
#signup
    // padding-right .5rem
#signup_cta
    padding 2rem
    text-align center
#signup_cta_sec
    background #f5f7f9
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
#signup_form
    padding-top: 0
#signup_form,
#signup_form_sec
    background #ffffff !important
    padding 2rem
#signup_form > form
    padding 2rem
    margin 2rem
    border 1px solid #d7dde4
#signup_img
    width 25rem
    height auto
.ivu-form-label-top .ivu-form-item-label
    font-size 1rem
</style>
