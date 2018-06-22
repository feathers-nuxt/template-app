const path = require('path')

module.exports = {
  paths: {
    pkgDir: path.resolve(__dirname),
    srcDir: path.resolve(__dirname, 'src'), // uncompiled sources
    configDir: path.resolve(__dirname, 'config'), // server configuration
    deployDir: path.resolve(__dirname, 'releases'), // deployable builds
  },
  deploy: { 
    // available deployment options: pods, now, ghpages, surge,

    server: { // server deployments deal with the realtime server

      // pod :: git push deployment for Node.JS - see https://github.com/yyx990803/pod 
      // The remote host must be accessible via SSH. Multiple targets may be provided.
      // For each target, a directory with provided name is created inside paths.deployDir
      // and populated with copies of package.json, f3.config.js, configDir and srcDir
      pods: [      
        {
          name: 'newyork', //servername. 
          host: '', // server IP or FQDN
          user: '', // SSH user name. 
          // SSH user password or private key passphrase will be prompted
        }
      ]


    }
  },
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
    build: {
      extractCSS: true,
      publicPath: '/_nuxt/',
      // vendor: ['iview'],
      watch: ['utils', 'components/partials/*'],
      extend(config, { isDev, isClient, isServer }) {
          let vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
          vueLoader.options.loaders.html = {
              loader: 'iview-loader',
              options: {
                  prefix: false
              }
          }
          const aliases = Object.assign(config.resolve.alias, {
          '~utils': path.resolve(__dirname, 'src/client/utils')
        })
        config.resolve.alias = aliases
      }
    },
    buildDir: 'dist/client',
    cache: true,
    css: [
      // eot is needed for Internet Explorers that are older than IE9 - they invented the spec,
      // but eot is a horrible format that strips out much of the font features
      {src: 'iview/dist/styles/fonts/ionicons.eot'},
      //ttf and otf are normal old fonts,
      // but some people got annoyed that this meant anyone could download and use them
      {src: 'iview/dist/styles/fonts/ionicons.ttf'},
      // At about the same time, iOS on the iPhone and iPad implemented svg fonts
      {src: 'iview/dist/styles/fonts/ionicons.svg'},
      // Then, woff was invented which has a mode that stops people pirating the font.
      // This is the preferred format and WOFF2, a more highly compressed WOFF
      {src: 'iview/dist/styles/fonts/ionicons.woff'},
      {src: 'iview/dist/styles/iview.css'},

      {src: '~assets/theme.less', lang: 'less'},
      {src: '~assets/app.styl', lang: 'stylus'},
    ],
    env: {
      HOST: process.env.HOST,
      PORT: process.env.PORT
    },
    head: {
      title: '<%= name %>"',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'feathers nuxt fullstack' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      ]
    },
    manifest: {
      name: '<%= name %>"',
      description: 'feathers nuxt fullstack',
      theme_color: '#188269'
    },
    modules: [
      // '@nuxtjs/sitemap',
      // '@nuxtjs/component-cache',
      [ '@nuxtjs/pwa',  {
          globPatterns: ['**/*.{js,css,svg,png,html,json}']
      }]
    ],
    plugins: [
      { src: '~/plugins/casl' },
      { src: '~/plugins/iview' },
      { src: '~/plugins/fuzzysort' },
      { src: '~/plugins/storyboard' },
      { src: '~/plugins/media-query' },
      { src: '~/plugins/vuebar', ssr: false },
      { src: '~/plugins/feathers', ssr: false },
      { src: '~/plugins/scrollto', ssr: false },
      { src: '~/plugins/routersync', ssr: false }
    ],
    // render: {
    //   static: {
    //     maxAge: '1y',
    //     setHeaders (res, path) {
    //       if (path.includes('sw.js')) {
    //         res.setHeader('Cache-Control', 'public, max-age=0')
    //       }
    //     }
    //   }
    // },
    router: {
      base: '/',
  //    middleware: ['ssr-cookie', 'https']
    },
    srcDir: path.resolve(__dirname, 'src', 'client'),
    loading: {
      color: '#00b3ff',
      height: '2px'
    }
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