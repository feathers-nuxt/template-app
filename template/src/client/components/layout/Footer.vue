<template lang="pug">
footer.flex-c
  .copyleft
    | <%= name %> © {{ new Date().getFullYear() }}
  .copyright
    | all lefts reversed
</template>

<style lang="stylus">
footer
  padding 1rem
  text-align left
  justify-content space-between
  border-top 1px solid #ededed
footer > div
  flex 1
.copyright
  text-align right
  text-transform capitalize
</style>
