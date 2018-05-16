# STORE

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.
Creating a index.js file in this directory activate the option in the framework automatically.

Since there are multiple files in this directory, vuex store is activated by nuxt. 
As `index.js` does not instanciate vuex, nuxt sets up vuex store in *modules mode*.

*auth module* is activated since `auth.js` file is included in this directory. 
Peek inside to see how you can activate your store modules declare in `api/store/` directories.

More information about the usage of this directory in the documentation:
https://nuxtjs.org/guide/vuex-store

**This directory is not required, you can delete it if you don't want to use it.**
