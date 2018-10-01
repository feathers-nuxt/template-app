export default function () {
  const loader = {
    loader: 'less-loader', 
    options: {
      sourceMap: true,
      javascriptEnabled: true // <- enable this option
    }
  }
  this.extendBuild((config) => {
    const lessLoaders = config.module.rules.filter(({ test = '' }) => {
      return ['/\\.less$/'].indexOf(test.toString()) !== -1
    })
    for (const lessLoader of lessLoaders) {
      for (const rule of lessLoader.oneOf) {
        rule.use.push(loader)
      }
    }
  })
}