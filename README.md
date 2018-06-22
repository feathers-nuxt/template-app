
### Quick start
Ensure you have installed `f3` cli globally. At the moment the package isn't published to `npm` so you'd install from [github](https://github.com/feathers-nuxt/cli). Just run: 
> `npm i -g github:feathers-nuxt/cli`

To start a new `feathers-nuxt` project using `f3` cli, just invoke the following on your terminal
> `f3 init awesome-project` 

This will clone the template in this repository using [saojs](https://github.com/saojs/sao) and create a boilerplate, inside `awesome-project` directory, customized as per your answers to the prompted questions.

#### Directory structure
An application initialized using `f3` will have the following directory stucture


```text
├── f3.config.js                              # nuxt & backpack configuration
├── .babelrc                                  # babel configuration to use with backpack
├── .podhook                                  # shell commands to run on remote server during deploy
├── .gitignore                                # list of file to ignore while deploying to remote server
└── src
    ├── client                                # transpiled using nuxt
        ├── assets                            # files to transpile with webpack: less, stylus 
        ├── static                            # files to serve as static resources 
        ├── pages                             # Vue SFC accessible via a URL    
        ├── components                        # Vue SFC to use within other SFC
        ├── layouts                           # Vue SFC to use for page layout        
        ├── middleware                        # nuxt renderer middleware
        ├── plugins                           # Vue.js plugins
        ├── store                             # Vuex store modules
        └── utils                             
            ├── initClient.js                     # creates feathers client for server and client bundle
            ├── initAuth.js                       # autheticate and populate store with user object 
            └── store              
                ├── modules                         # modules for vuex
                └── plugins                         # plugins for vuex
    └── server                                # transpiled using backpack
        ├── config                            
            ├── default.yml                        # settings for development env
            ├── production.yml                     # settings for production env
            └── production-0.yml                   # settings for PM2 app instance 0
        ├── index.ls                           # entry to initialize both app and api servers   
        ├── app.ls                             # express server with nuxt middleware and feathers as sub app     
        ├── api.ls                             # feathers server with socket.io and rest transports
        ├── api.hooks.ls                       # configures global api hooks
        ├── hooks                              # triggers run during resource access
            └──r.ls                       # configures global api hooks
        ├── notifications                      # templates and dispatcher for email, sms, webpush,
        ├── services                           # service, schema, model and hooks for resources in db, fs,
            └── auth.ls                            # configures feathers for authentication
        └── db                                 
            ├── orm.ls                             # configures feathers to use mongoose or sequelize ORM
            ├── seed.ls                            # populates database with dummy data
            └── migrations                         # procedures to creates and drop tables
        └── middleware                         
	        └── nuxt.ls                            # nuxt middleware for SSR
```


## Logical structure
------

Can be considered data driven in architecture. There are, conceptually, two layers	
Relies on the capabilities of both `nuxt` and `feathers` to run on both the `browser` and `node`.

This is a `feathers` server using embeded `nuxt` middleware for building and rendering `UI` defined as `Vue` `SFC`s.

> Building only happens when app runs in `development` mode. Ensure you build the client before starting server in `production` mode.

By default, `nuxt` is set to build in **universal** mode so that the resulting build is an **isomorphic**; it can be used by the embedded middleware to render a ***route*** as a **pwa** that supports client-side navigation. `feathers` being isomorphic as well provides access to backend service to the universal build during rendering on the server and to the rendered ***route*** during interactions on the browser. 

> When deploying client build using `f3` to a static content server - such as **now.sh**, **surge.sh**, **ghpages** - 
`nuxt build` will be invoked with the **mode** option set to ***spa***. The resulting build does not require and will not work with the embedded middleware but it supports client-side navigation.

When a ***route*** in the **universal build** is rendered server side, the the server instance availed to ***nuxt resources*** is the actual Node.JS server. During client-side navigation, however, the available server instance is a proxy to the actual server over **webssocket** connection. The two instances have the same `API`.

Within ***nuxt resources*** the server instance can be accessed from `Vue` `SFC` script as `this.$store.app.api` or as `this.app.api` from `Vuex` store modules. It can also be accessed in your page middleware as well.

> It is recommended to externalize back-end services access logic outside components into store actions where you can access the server as `this.app.api`. However, there are other features of the back-end `api` that you may want to use in your components. For instance, `storyboard` logging (More on that below).

### `nuxt` baked into `feathers`

The content of `src/server` are processed by backpack are processed through `backpack` following configurations in declared under the key `backpack` in the file `f3.config`.  

**Backpack** handles file-watching, live-reloading, transpiling, and bundling targeting server so we can use awesome tools like [livescript](http://livescript.net/) or latest`EcmaScript` features. See [configuration options](https://github.com/jaredpalmer/backpack). 

In addition to standard `feathers` **server** resources, a middleware is included for leveraging `nuxt` on the server. It sets up `nuxt` for **server side rendering** and stashes the app instance in the context of every `request` so that it is accessible within `nuxtServerInit`.

>Ensure that nuxt middleware is declared last and that middleware configuration is last to set up.


#### `feathers` baked into `nuxt`

The contents of `src/client` are processed through `nuxt` following configurations in declared under the key `nuxt` in the file `f3.config` See [nuxt documentation](https://nuxtjs.org/).

In addition to the resources in a standard `nuxt` project,   `src/client` includes an extra folder called `api` containing a single file named `feathers.js` for initializing `feathers` on the frontend. 

The instance is available within `Vue` components as `this.$store.app.api` and within `Vuex` store modules as `this.app.api` to provide access to backend `services`.

> Ensure that you first declare every service you intend to use in `api/feathers.js` 

When rendering is done server-side, `feathers-client`is never initialized. Instead, `feathers` server instance will be availed as stated above. 

>Thanks, to its isomorphic design, replacing  `feathers` **client ** *instance* with **server** *instance* does not necessiate changing our code.


## Features
------

#### mongodb baked in 
Mongo Database set up with

* `mongoose` for model ***schema*** *declaration* and *validation*
* `mongoose-gridfs` for ***streaming*** file uploads to `mongodb`


