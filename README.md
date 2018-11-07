This is a [sao](https://saojs.org/) template enabling you to scaffold a feathers+nuxt app in seconds. See documentation [site]( https://feathers-nuxt.netlify.com/) for available features.

**THIS IS ALPHA, BE CAREFUL**

I'm also VERY interested in feedback / PRs, so send them my way or email me!

## Quick Start
Use npx, if you do not have sao installed. npx comes bundled with npm version 5.2+.
```bash
npx sao feathers-nuxt/template-app --update awesome-app
```
You will be prompted to answer a couple of questions to determine how the template should be customized to your needs. Sao will then clone the template in this repository and put the customized template inside `awesome-app` directory.

If you already have sao installed globally, just invoke it with this template. 
```bash
sao feathers-nuxt/template-app --update awesome-app
```

## Installation
You may also use `f3` cli instead of `sao` if you install it globally. 
```bash
yarn global add @feathers-nuxt/cli
# npm i -g @feathers-nuxt/cli
f3 init awesome-app
```
> `yarn` is preferred to `npm`, although you may use the later if you so wish.

## Usage
Once your app is initialized do `cd awesome-app` to access your new project.
> To start the application in development mode - watch files for changes and reload - run
```bash
yarn dev
```

> There are several other `npm scripts` defined in `package.json`. To list them all, invoke
```bash
yarn run
```
### Features
- SSR ready PWA with offline support.
- User Authentication and Authorization taken care of.
- Logging mixin for Feathers app backed by winston with file and console transports.
- End-to-end, hierarchical, real-time, colorful logs and stories with console and websockets transports.
- Bring your own database or RESTful backend for data storage.
- Database migration and seeding npm scripts included.
- Project build and deployment scripts provided.
- Use any compile to JS langauge supported by webpack: livescipt, coffescript, typescript,
- Use any compile to CSS language supported by webpack: stylus, sass, less,
- Use any compile to HTML language supported by webpack: pug, slim, haml,
- Use HEML markup language for building responsive emails with any compile to HTML language.
- Notifications service for sending all kinds of transactional alerts via emails, SMS, pushes, webpushes or slack
- File uploads service with configurable backing storage: Any store that implements the blob store interface.
- All feathers services automatically available in `vuex` store.
- Namespaced routing to prevent conflict of API and UI routes.
- Optional caching for API routes using Redis on the backend.
- Automatic caching for API routes using feathers-vuex on the frontend.
- Automatic caching for UI routes using workbox runtimeCaching.
- Optional distributed, delayed background job system backed by Redis.
- iView: A high quality UI Toolkit built on Vue.js
- DataTable and DataCard UI components compatible with feathers service endpoints.

### Guide
An application initialized using `f3` will have the following directory stucture. 

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
            └──global.ls                       # configures global api hooks
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
