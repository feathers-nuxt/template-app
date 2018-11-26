<template>
  <div class="fab" v-bind:class="{ open: isOpen }" @click="openMenu">
    <div class="overlay"></div>
    <div class="buttons">
      <div class="trigger"><span>+</span></div>
      <div class="actions">
        <div class="action">
          <a href="/">
            <i class="fa fa-bug"></i>
            <div class="tooltip">App</div>
          </a>
        </div>
        <div class="action">
          <a href="/api/docs">
            <i class="fa fa-paper-plane"></i>
            <div class="tooltip">Swagger</div>
          </a>
        </div> 
      </div>
    </div>
  </div>
</template>

<script lang="livescript"> 
#require '~/static/js/console.js'
module.exports =
  data: ->
    isOpen: false
  methods:
    openMenu: -> @isOpen = !@isOpen 
  head: ->
    link:
      rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      ...
</script>

<style scoped>
.fab .buttons {
  position: absolute;
  bottom: 16px;
  right: 16px;
  text-align: center;
}
.fab .trigger, .fab .action {
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.fab .trigger:active, .fab .action:active {
  opacity: .7;
}
.fab .trigger {
  position: relative;
  background: #2c4;
  color: #fff;
  height: 56px;
  width: 56px;
  line-height: 56px;
  vertical-align: middle;
  font-size: 1.5em;
  z-index: 1;
}
.fab .action {
  position: absolute;
  top: 0;
  margin: 0 8px;
  background: #fff;
  color: #333;
  height: 40px;
  width: 40px;
  line-height: 40px;
  transition: -webkit-transform 0.4s ease;
  transition: transform 0.4s ease;
  transition: transform 0.4s ease, -webkit-transform 0.4s ease;
}
.fab .actions, .fab .overlay {
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fab.open .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: .7;
}
.fab.open .actions {
  opacity: 1;
}
.fab.open .actions .action:nth-child(1) {
  -webkit-transform: translateY(-48px);
          transform: translateY(-48px);
}
.fab.open .actions .action:nth-child(2) {
  -webkit-transform: translateY(-96px);
          transform: translateY(-96px);
}
.fab.open .actions .action:nth-child(3) {
  -webkit-transform: translateY(-144px);
          transform: translateY(-144px);
}
.fab.open .actions .action:nth-child(4) {
  -webkit-transform: translateY(-192px);
          transform: translateY(-192px);
}
.fab.open .tooltip {
  opacity: 1;
  -webkit-transform: translateY(-50%) scale(1);
          transform: translateY(-50%) scale(1);
  right: 64px;
  transition-delay: 0.2s;
}
.fab .tooltip {
  position: absolute;
  top: 50%;
  right: 0;
  width: 50vw;
  -webkit-transform: translateY(-50%) scale(0);
          transform: translateY(-50%) scale(0);
  -webkit-transform-origin: right center 0;
          transform-origin: right center 0;
  text-align: right;
  transition: all 0.4s ease;
  opacity: 0;
  color: #fff;
}
</style>
