# See (doc site)[feathers-nuxt.netlify.com] for comprehensive guide

<!-- https://github.com/feathersjs/feathers/issues/509#issuecomment-342871157 -->

<!-- 
https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve/32600959#32600959 
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
-->

Changes: 
- Use @nuxtjs/axios module for xhr with feathers client
- Use rest transport instead of websockets with feathers client
- Use feathers server instance intead of client instance when server side rendering
- Include End to End tests