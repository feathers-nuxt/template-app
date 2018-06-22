# Utils

This directory contains a utilities necessary for integration of feathersjs with nuxt.

The script creates an instance of feathers client targeted at either the browser or the server depending on whether rendering is serverside or not. 

The browser optimized client uses `socket.io` for *websockets tranport* and `cookie-storage` for persistence. 
The server optimized version on the other hand uses `axios` for *rest transport* and  `localstorage-memory` for persistance.

Accessible as `context.api` anywhere within client files.

Each sub-directory inside `store` directory contains definitions for store modules. See included Auth module for inspiration on how to write custom store modules as state, actions and mutations. Actions define interface between the UI and feathersClient.

More information about the usage of this directory in the documentation:
https://nuxtjs.org/guide/assets#webpacked

