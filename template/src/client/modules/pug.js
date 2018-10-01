export default function () {
  // Add .pug extension for store, middleware and more
  this.nuxt.options.extensions.push('pug')
  // Extend build
  const pugLoader = {
    test: /\.pug$/,
    loader: 'pug-plain-loader',
    options: {
      data: {}
    }
  }
  this.extendBuild((config) => {
    // Add pug loader
    config.module.rules.push(pugLoader)
    // Add .pug extension in webpack resolve
    if (config.resolve.extensions.indexOf('.pug') === -1) {
      config.resolve.extensions.push('.pug')
    }
  })
  
}