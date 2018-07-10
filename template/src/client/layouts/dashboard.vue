<style scoped lang='stylus'>
.page
  border 1px solid #d7dde4
  position relative
  border-radius 4px
  overflow hidden
  display flex
  min-height 90vh

[v-cloak]
  display none

.network
  font-weight 400
  font-size 1rem
  text-align center
  .circle
    display inline-block
    background green
    color #ffffff
    padding 0rem 1rem
  &.offline
    .circle
      background #ff8d25

.page,
.ivu-layout
  overflow auto
  background #ece9e6
  background -webkit-linear-gradient( to top,  #ffffff, #ece9e6 )
  background linear-gradient( to top, #ffffff, #ece9e6 )

.layout
    padding 1rem
    flex 1

.hidden
  &.layout
    padding 0
    flex 0
    .portal
      padding 0

.sidemenu
  background #ffffff

.offline
  display flex
  align-items center
  justify-content center
  position absolute
  width 100%
  z-index 999
  p 
    text-align center
    font-weight bold
    color #FE4E02
    box-shadow 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    width 27rem
    margin-bottom .27rem
    background #f5f7f9
    &.small
      background transparent
</style>

<template lang='pug'>
.dashboard
  .offline(v-if='!$store.state.network.online')
    p(v-bind:class='classObject') Connection to server lost
  .viewport(v-cloak='')
    TopNav(v-on:togglesider='toggleSider', :showSider='showSider')
    .page
      .sidemenu
        Sider(hide-trigger='', :style="{background: '#fff'}", v-if='screenSize > 1300 | showSider')
          SideNav(v-on:navigateTo='toggleSider')
      Layout.layout(v-bind:class='classObject')
        Content.portal
          nuxt
    AppFooter
</template>


<script>
import TopNav from "~/components/layout/TopNav";
import SideNav from "~/components/layout/SideNav";
import AppFooter from "~/components/layout/Footer";

export default {
  components: { TopNav, SideNav, AppFooter },
  computed: {
    opensections() {
      return Array.of(this.$store.state.route.name.split("-")[0]);
    },
    classObject() {
      return {
        hidden: this.windowWidth < 666 && this.showSider
      }
    },
    screenSize() {
      return this.windowWidth
    }
  },
  methods: {
    _toggleNetworkStatus({ type }) {
      this.online = type === "online";
    },
    toggleSider() {
      this.showSider = this.showSider ? false : true;
      console.log('on it')
    }
  },
  data() {
    return {
      online: true,
      showSider: false
    };
  },
  mounted() {
    // console.log('all aboard', this.$can('create', 'contacts'))
    if (!window.navigator) {
      this.online = false;
      return;
    }
    this.online = Boolean(window.navigator.onLine);
    window.addEventListener("offline", this._toggleNetworkStatus);
    window.addEventListener("online", this._toggleNetworkStatus);
  }
};
</script>
