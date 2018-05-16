
<template lang="pug">
section
    signup-form
</template>

<style scoped lang="stylus">
.title
  margin: 50px 0
</style>

<script lang="livescript">
require! '~/components/forms/signup.vue'
module.exports =
  components:
    signupForm: signup.default
</script>