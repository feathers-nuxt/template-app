<template lang="pug">
section
    SubscribeForm
</template>

<style scoped lang="stylus">
.title
  margin: 50px 0
</style>

<script lang="livescript">
require! '~/components/forms/signin.vue'
module.exports =
  components:
    SubscribeForm: signin.default
</script>