const path = require('path')

module.exports = { 
  backpack: (config, options, webpack) => {
    config.mode = 'development' // or 'production'
    // server main file
    config.entry.main = path.resolve(__dirname, 'src', 'server', 'index.ls')
    config.output.path = path.resolve(__dirname, 'dist', 'server')
    config.resolve.alias = {
      '~middleware': path.resolve(__dirname, 'src', 'server', 'middleware'),
      '~services': path.resolve(__dirname, 'src', 'services', 'util'),
      '~util': path.resolve(__dirname, 'src', 'server', 'util'),
      '~': path.resolve(__dirname, 'src', 'server')
    }
    // console.log(config.resolve.extensions)
    return config
  }, 
  nuxt: {
    srcDir: path.resolve(__dirname, 'src', 'client'),
    modules: [
      ['~/modules/livescript'], // add support for livescript language
      ['~/modules/less'],  // add support for less language

      ['@nuxtjs/axios'], // for use by feathers-rest client

      ['nuxt-robots-module'], // SEO 
      '@nuxtjs/pwa',

    ],    
    plugins: [
      { src: '~/plugins/iview' }, // ui components
      { src: '~/plugins/data' },  // datatables backed by feathers
      { src: '~/plugins/media-query' }, // responsive rendering
      { src: '~/plugins/feathers' },
      { src: '~/plugins/casl' },
      { src: '~/plugins/routersync', ssr: false },
    ],
    buildDir: 'dist/client',
    build: {
      extractCSS: {
        allChunks: true
      },
      watch: ['utils', 'components/partials/*'],
      extend(config, ctx) { 
        const aliases = Object.assign(config.resolve.alias, {
          // ensure we can require files in utils directory with path alias
          '~utils': path.resolve(__dirname, 'src/client/utils')
        })
        config.resolve.alias = aliases
      }
    },
    loading: {
      color: '#ff0099'
    },
    head: {
      title: '<%= name %>',
      htmlAttrs: {
        lang: 'en-US',
      },
      meta: [
        { charset: 'utf-8' }, 
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Vue JS Radar' },
        { hid: 'keywords', name: 'keywords', content: 'cellulant, bulksms, ui, app' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      ]
    }, 
    css: [
      // Then, woff was invented which has a mode that stops people pirating the font.
      // This is the preferred format and WOFF2, a more highly compressed WOFF
      {src: 'iview/dist/styles/fonts/ionicons.woff'},
      // {src: 'iview/dist/styles/iview.css'},

      {src: '~assets/theme.less', lang: 'less'},
      {src: '~assets/app.styl', lang: 'stylus'},
    ]
  },

  project: { // config options obtained from prompts by sao
    name: "<%= name %>",
    description: "<%= description %>",
    database: "<%= database %>",
    sequelize_dialect: "<%= sequelize_dialect %>",
    sequelize_host: "<%= sequelize_host %>",
    sequelize_port: "<%= sequelize_port %>",
    sequelize_database: "<%= sequelize_database %>",
    sequelize_username: "<%= sequelize_username %>",
    sequelize_password: "<%= sequelize_password %>",
    cache: "<%= cache %>",
    resque: "<%= resque %>",
    redis_host: "<%= redis_host %>",
    redis_port: "<%= redis_port %>",
    redis_database: "<%= redis_database %>",
    redis_password: "<%= redis_password %>",
    username: "<%= username %>",
    email: "<%= email %>",
    website: "<%= website %>"
  }

}