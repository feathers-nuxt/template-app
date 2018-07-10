<template lang='pug'>
.page
  .offline(v-if='!$store.state.network.online')
    p(v-bind:class='classObject') Connection to server lost
  .container(v-bind:class='classObject')
    .content(v-bind:class='classObject')
      img.header__logo-image(src='~/static/logo.png', alt='Home', v-bind:class='classObject')
      h1(style='text-align: right; color: #00b3ef;')  <%= name %>
      hr
      .form
        h3(style='text-align: left; margin: 1rem 0;')
          | Please Sign In to access your account
        | SigninForm Here

</template>

<script>
import SideNav from "~/components/layout/SideNav";
import AppFooter from "~/components/layout/Footer";

export default {
  middleware: 'anonymous',
  components: { SideNav, AppFooter },
  data() {
    return {
      online: true
    };
  },
  computed: {
    classObject() {
      return {
        small: this.windowWidth < 666
      };
    }
  },
  mounted() {
    // console.log('on it', this)
    if (!window.navigator) {
      this.online = false;
      return;
    }
    this.online = Boolean(window.navigator.onLine);
    window.addEventListener("offline", this._toggleNetworkStatus);
    window.addEventListener("online", this._toggleNetworkStatus);
  },
  methods: {
    _toggleNetworkStatus({ type }) {
      this.online = type === "online";
    }
  },
  destroyed() {
    window.removeEventListener("offline", this._toggleNetworkStatus);
    window.removeEventListener("online", this._toggleNetworkStatus);
  }
};
</script>

<style lang='stylus' scoped>
.offline
  display flex
  align-items center
  justify-content center
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
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #ff8d25;
  margin: 0;
  padding: 0;
}

.small.header__logo-image {
  height: 4.44rem;
}

.header__logo-image {
  height: 6.66rem;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: transparent;
}

.small.container {
  background: #ffffff;
}

.small.container .content {
  padding: 1rem;
}

.content {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.small.content {
  box-shadow: none;
}

.small.content > div {
  width: 90vw;
}

.network {
  font-weight: 400;
  font-size: 1rem;
}

.network .circle {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: green;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
}

.network.offline .circle {
  background: red;
}
</style>
