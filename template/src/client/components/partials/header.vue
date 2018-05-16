<template lang="pug">
Menu#header-menu(mode='horizontal', theme='dark', active-name='1')
  nuxt-link#header-logo(to='/')
  #header-nav
    MenuItem(name='2')
       f3
    MenuItem(name='1')
      Button#hiw(type='text', v-scroll-to="'#howitworks'")
        | How it works
</template>

<script scoped lang="livescript">  
</script>

<style lang="stylus">
#hiw
    border none
    border-radius 0
    padding-right 1rem
    border-right 1px solid #ffffff
#header-menu
    background #1f5268
    display flex
    align-items center
#header-nav
    float right
    margin-left auto
    margin-right 1rem
#header-nav > li
    float right
#header-nav > li > button
    color #ffffff
#header-logo
    width 10rem
    height 2.5rem
    margin-left 2rem
    position relative
    background-repeat no-repeat !important
.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu
    padding 0 .5rem
</style>
