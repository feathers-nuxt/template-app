<template lang="pug">
  .container
    nuxt-child(:key="$route.params.id")
</template>

<script lang="livescript">
module.exports =
  layout: 'dashboard',
  middleware: 'authenticated'
</script>

<style lang="stylus" scoped>
</style>