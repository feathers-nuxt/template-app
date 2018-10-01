export default function () {
  // Add .livescript extension for store, middleware and more
  this.nuxt.options.extensions.push('livescript')
  // Extend build
  const livescriptLoader = {
    test: /\.livescript$/,
    loader: 'livescript-loader'
  }
  this.extendBuild((config) => {
    // Add livescriptScruot loader
    config.module.rules.push(livescriptLoader)
    // Add .livescript extension in webpack resolve
    if (config.resolve.extensions.indexOf('.livescript') === -1) {
      config.resolve.extensions.push('.livescript')
    }
  })
}