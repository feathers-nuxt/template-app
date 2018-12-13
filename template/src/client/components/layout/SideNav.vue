<template lang='pug'>
Menu(:active-name='current' :open-names='opensections' theme='light' width='auto' v-on:on-select='navigateTo' accordion)
  MenuItem(name='mail-compose', style='background: #f3f3f3')
    Button(type='primary', shape='circle', class='compose_btn')
      Icon(type='compose', style='color: #fff; margin-right: 1rem')
      | Compose
  Submenu(name='mail', v-if="$can('read', 'mail')")
    template(slot='title')
      Icon(type='ios-email')
      | Inbox
    MenuItem(name='mail-drafts')
      | Drafts
  MenuItem(name='settings', v-if="$can('view', 'settings')")
    Icon(type='stats-bars')
    |  Settings
</template>

<script>

export default {
  computed : {
    current() {
      let name = this.$store.state.route.name
      if (this.$store.state.route.name) {
        let parts = this.$store.state.route.name.split('-')
        if(parts.length == 3) { parts.pop() }
        name = parts.join('-')
      }
      return name
    },
    opensections () {
      if(this.$store.state.route.name) {
          return Array.of( this.$store.state.route.name.split('-')[0] )
      }
    }
  },
  methods: {
    navigateTo(path) {
      const page = '/' + path.split('-').join('/')
      console.log('on-select', path, page)
      this.$router.push(page)
      this.$emit('navigateTo')
    }
  }
}
</script>

<style lang="stylus" scoped>
.compose_btn 
    font-weight bold
    box-shadow 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)

.ivu-menu-item-selected 
    background #f5f7f9
    font-weight bold

.ivu-menu-item a 
    color: #495060

.ivu-menu-item:hover a 
    color: #2d8cf0

.ivu-menu-item-selected a, 
.ivu-menu-item-selected i 
    color: #2d8cf0
    font-weight: bold

</style>
