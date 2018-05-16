<template lang="pug">
footer.flex-c
  .copyleft
    | f3 © {{ new Date().getFullYear() }}
  .copyright
    | all rights reserved
    // all lefts reversed
</template>

<style lang="stylus">
footer
  padding 2rem
  text-align left
  justify-content space-between
footer > div
  flex 1
.copyright
  text-align right
  text-transform capitalize
</style>
