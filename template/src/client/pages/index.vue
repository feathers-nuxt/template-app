<template lang='pug'>
.index
  .wrap.fixed
    header
      .logo
      nav
        ul
          li
          li
          li
    section.transparent
      .headline
      .text
      .text
      .button
    section.cards
      .card
        img(src='https://imgplaceholder.com/500x300/transparent/ddd/ion-image', alt='')
        .content
          .headline
          .text
          .text
          .button
      .card
        img(src='https://imgplaceholder.com/500x300/transparent/ddd/ion-image', alt='')
        .content
          .headline
          .text
          .text
          .button
      .card
        img(src='https://imgplaceholder.com/500x300/transparent/ddd/ion-image', alt='')
        .content
          .headline
          .text
          .text
          .button
    section.contentbox
      .headline
      .text
      .text
      .text
      .text
      .text
      .text
      .text
      .text
      .text
      .button
    footer
      .logo
      nav
        ul
          li
          li
          li
  .sticky
    nav
      ul
        li 
          a(href='/api/docs' target='_blank') Swagger
        li 
          a(href='http://127.0.0.1:8090/' target='_blank') StoryBoard
</template>

<script>
  // https://codepen.io/mfritsch/pen/VYdeEE
</script>

<style lang='sass' >
.sticky
  border-top: 2px solid #666
  padding: .5rem
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  padding: .5rem 2rem
  background: #efefef
  ul
    display: flex
    list-style-type: none
    li
      width: 100px
      font-weight: bold
\:root
  --clr1: #bababa
  --clr2: #666
  --clr3: #efefef
  --clr4: tomato
  --border-radius: 7px
  --text-radius: 50em

body
  *, :after, :before
    box-sizing: border-box
  background: var(--clr1)
  padding: 50px 0 0 0
  margin: 0 10px

.transparent
  background: transparent !important

.wrap
  max-width: 960px
  min-width: 360px
  margin: 0 auto
  position: relative
  &.sticky
    margin-top: 150px

.fluid .wrap
  max-width: 100% !important

header
  background: var(--clr2)
  padding: 50px
  width: 100%
  border-radius: var(--border-radius)
  position: relative
  z-index: 99

.wrap.sticky header
  background: var(--clr2)
  padding: 50px
  position: fixed
  top: 0px
  max-width: 960px
  width: calc(100% - 20px)
  min-width: 360px
  border-radius: 0px 0px var(--border-radius) var(--border-radius)

.fluid .wrap.sticky header
  max-width: 100% !important

header
  .logo
    background: var(--clr3)
    width: 50px
    height: 50px
    border-radius: var(--text-radius)
  nav
    position: absolute
    right: 0
    top: 50%
    transform: translate(-50px, -50%)
    ul li
      display: inline-block
      list-style: none
      width: 60px
      height: 10px
      background: var(--clr3)
      border-radius: var(--text-radius)

section
  background: var(--clr2)
  padding: 100px 50px
  width: 100%
  border-radius: var(--border-radius)
  position: relative
  margin: 10px 0 0 0
  .headline
    display: block
    margin: 0 auto
    list-style: none
    max-width: 260px
    height: 30px
    background: var(--clr3)
    border-radius: var(--text-radius)
  .text
    display: block
    margin: 10px auto
    max-width: 500px
    height: 14px
    background: var(--clr3)
    border-radius: var(--text-radius)
  .button
    display: block
    margin: 20px auto 0 auto
    max-width: 120px
    height: 35px
    background: var(--clr3)
    border-radius: var(--text-radius)
  &.contentbox
    .headline
      margin: 10px 0 !important
      max-width: 65%
    .text
      margin: 10px 0 !important
      max-width: 100%
    .button
      margin: 10px 0 !important
  &.cards
    padding: 0px
    background: transparent
    display: table
    .card
      background: var(--clr2)
      width: calc(33.6% - 10px)
      margin: 0 5px
      border-radius: var(--border-radius)
      display: inline-block
      &:first-child
        margin: 0 5px 0 0
      &:last-child
        margin: 0 0 0 5px
      .content
        padding: 40px
      img
        width: 100%
        height: auto
        border-radius: var(--border-radius) var(--border-radius) 0px 0px

footer
  background: var(--clr3)
  padding: 50px
  width: 100%
  border-radius: var(--border-radius) var(--border-radius) 0px 0px
  position: relative
  margin: 10px 0 0 0
  .logo
    background: var(--clr2)
    width: 50px
    height: 50px
    border-radius: var(--text-radius)
  nav
    position: absolute
    right: 0
    top: 50%
    transform: translate(-50px, -50%)
    ul li
      display: inline-block
      list-style: none
      width: 60px
      height: 10px
      background: var(--clr2)
      border-radius: var(--text-radius)

</style>
