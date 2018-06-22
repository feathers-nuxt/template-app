import Vue from 'vue';
import {client, server} from '~/utils/vue-media-query-mixin';


if(process.client) {
  // use vue-media-query-mixin that listens to window resize events
  Vue.use(client, {framework:'vuetify'});
} else {
  // use vue-media-query-mixin that doesn't depend on window object
  Vue.use(server, {framework:'vuetify'});
}