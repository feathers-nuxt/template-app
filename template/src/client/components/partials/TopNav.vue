<template lang="pug">
Header(:style="{background: '#fff', padding: '0px 10px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}")
    IviewMenu.topnav(mode='horizontal' theme='light' active-name='1' )
        .layout-logo
            Icon(:type="menuicon"  v-if="windowWidth < 1300" @click='toggleSider')
            .logoanchor
              nuxt-link(to='/')
                img.header__logo-image(src='~/static/logo.png' alt='Home')
        .layout-nav
        MenuItem(name='0', :style="{ padding: '0' }")
            Dropdown(style='margin: 0' v-on:on-click="handleSelected")
                a(href='javascript:void(0)', :style="{ color: '#495060' }")
                    | {{username}}
                    span(:style="{ display: 'inline-block', width: '.5rem' }")  
                    icon(type='arrow-down-b')
                DropdownMenu(slot='list')
                    DropdownItem(name='profile')  Profile
                    DropdownItem(name='logout') Log Out
</template>

<style lang="stylus" scoped>

.topnav 
    display flex
    align-items center
    justify-content center

.logoanchor 
    cursor pointer
    margin-top .666rem

.layout-logo
    display flex
    align-items center
    justify-content center
    i 
        font-size 1.5rem
        margin-right 1rem
        cursor pointer

.layout-nav
    margin-left auto
    margin-right 1rem

.header__logo-image 
    width: 10rem

.ivu-menu-horizontal 
  height: 64px
  line-height: 64px

</style>

<script lang="livescript">
IviewMenu = require "~/components/iview/IviewMenu"
module.exports =
    props: <[ showSider ]>
    components:
        IviewMenu: IviewMenu.default
    computed:
        menuicon: ->
            if @showSider then 'close-round' else 'navicon-round'
        username: ->
            @$store.state.auth.user and @$store.state.auth.user.username
    methods: 
        toggleSider: ->
            @$emit 'togglesider' 
        handleSelected: (option) ->>
            console.log 'handle selections' option
            if option is \logout 
                await @$store.dispatch 'auth/logout'
                console.log 'log out res'
                @goHome!

</script>