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
    background -webkit-linear-gradient(
    to top,
    #ffffff,
    #ece9e6
  )
    background linear-gradient(
    to top,
    #ffffff,
    #ece9e6
  )

.layout
    padding 1rem
    flex 1

.hidden
    &.layout
        padding 0
        flex 0
        .portal
            padding 0
</style>

<template>
  <div> 
    <div  v-cloak >
        <TopNav v-on:togglesider='toggleSider' :showSider="showSider" />
        <div class="page">
          <Sider hide-trigger :style="{background: '#fff'}" v-if="screenSize > 1300 | showSider" >
            <SideNav v-on:navigateTo='toggleSider' />
          </Sider>
          <Layout class="layout" v-bind:class="classObject"  >
            <!-- <Breadcrumb :style="{margin: '0', display: 'flex', justifyContent: 'flex-end'}">
                <BreadcrumbItem>{{$store.state.auth.user.organization.profile.companyName}}</BreadcrumbItem>
            </Breadcrumb> -->
            <Content class="portal"  >
              <nuxt/>
            </Content>
          </Layout>
        </div>
        <AppFooter/>
    </div>
  </div>
</template>
<script>
import TopNav from "~/components/partials/TopNav";
import SideNav from "~/components/partials/SideNav";
import AppFooter from "~/components/partials/Footer";

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
