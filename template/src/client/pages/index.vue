<template lang='pug'>
.index
  iframe(id="frame" src="/api/docs" width="100%" height="95%")
  .sticky
    nav
      ul
        li.active
          nuxt-link(to='/') Swagger
        li 
          nuxt-link(to='/') Sao
        li 
          nuxt-link(to='/') Console
</template>

<script>
</script>

<style lang='sass' scoped>
body 
  overflow: hidden
.index 
  height: 100vh
.sticky
  padding: 0
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  // background: #d7dde4
  ul
    // background: #d7dde4
    display: flex
    list-style-type: none
    li
      width: 100px
      font-weight: bold
      text-align: center
      padding: 9px !important
      margin: 0 2rem
      &.active
        border-top: 2px solid #256e6d
        & > a
          color: #256e6d
          font-weight: bolder

</style>
