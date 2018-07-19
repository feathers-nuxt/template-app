<template lang='pug'>
.pageholder 
  h2 f3
  .human
    .head
    .body
    .arm.left
      .limb.upper
      .limb.lower
    .arm.right
      .limb.upper
      .limb.lower
    .leg.left
      .limb.upper
      .limb.lower
        .limb.foot
    .leg.right
      .limb.upper
      .limb.lower
        .limb.foot
    .limb.easterEgg
</template>

<script>
  // credits: https://codepen.io/nickspiel/pen/djGrZW
</script>

<style lang='scss' scoped>
@keyframes rotateBody {
  0% {
    transform: rotate(-35deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-35deg);
  }
}

@keyframes headBop {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1px) translateX(-2px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-1px) translateX(-2px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bodyBop {
  0% {
    transform: translateY(0) rotate(7deg);
  }
  25% {
    transform: translateY(-12px) rotate(0deg);
  }
  50% {
    transform: translateY(0) rotate(7deg);
  }
  75% {
    transform: translateY(-12px) rotate(0deg);
  }
  100% {
    transform: translateY(0) rotate(7deg);
  }
}

@keyframes rotateLeg {
  0% {
    transform: rotate(-40deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-40deg);
  }
} 

@keyframes rotateLowerLeg {
  0% {
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(40deg);
  }
  75% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(5deg);
  }
}

@keyframes rotateFoot {
  0% {
    transform: rotate(-100deg);
  }
  50% {
    transform: rotate(-40deg);
  }
  75% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-100deg);
  }
}

@keyframes rotateArm {
  0% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(15deg);
  }
}

@keyframes rotateLowerArm {
  50% {
    transform: rotate(-30deg);
  }
}

@keyframes easterEgg {
  0% {
    transform: rotate(-80deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(-80deg);
  }
  75% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(-80deg);
  }
}

html {
  height: 100%;
}

.pageholder {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {margin: 2rem;}

.human {
  position: relative;
  animation: bodyBop 1s infinite;
}

.head {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: black;
  animation: headBop 1s -0.4s infinite;
}

.body {
  width: 30px;
  height: 80px;
  border-radius: 20px;
  background-color: black;
}

.limb {
  width: 10px;
  border-radius: 5px;
  background-color: #444444;
}

.arm {
  position: absolute;
  animation: rotateArm 1s infinite;
  transform-origin: 5px 5px;
  &.right {
    top: 45px;
  }
  &.left {
    top: 38px;
    left: 20px;
    animation-delay: -0.5s;
    z-index: -1;
    .lower {
      animation-delay: -0.5s;
    }
  }
  .upper {
    height: 30px;
  }
  .lower {
    position: absolute;
    top: 20px;
    height: 30px;
    transform-origin: 5px 5px;
    animation: rotateLowerArm 1s infinite;
  }
}

.leg {
  position: absolute;
  transform-origin: 5px 5px;
  animation: rotateLeg 1s infinite;
  &.left {
    top: 96px;
    left: 5px;
    z-index: 1;
  }
  &.right {
    top: 89px;
    left: 16px;
    animation-delay: -0.5s;
    z-index: -1;
    .lower,
    .foot {
      animation-delay: -0.5s;  
    }
  }
  .upper {
    height: 35px;
  }
  .lower {
    position: absolute;
    top: 28px;
    height: 40px;
    transform-origin: 5px 5px;
    animation: 1s rotateLowerLeg infinite;
  }
}

.foot {
  position: absolute;
  top: 30px;
  height: 20px;
  transform-origin: 5px 5px;
  animation: rotateFoot 1s infinite;
}

.easterEgg {
  display: none;
  background-color: black;
  height: 20px;
  position: absolute;
  left: 17px;
  top: 98px;
  animation: easterEgg 1s infinite -0.2s;
  transform-origin: 5px 5px;
}
</style>
