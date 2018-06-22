const VueMediaQueryMixin = {
  install(Vue, options) {
    Vue.mixin({
      data: function () {
        return {
          windowWidth: 666,
          windowHeight: 0,
          wXS: true,
          wSM: false,
          wMD: false,
          wLG: false,
          wXL: false
        }
      }
    })
  }
};

export default VueMediaQueryMixin;
