import Debug from 'debug';
import Proto from 'uberproto';
import NotifmeSdk from 'notifme-sdk';

const debug = Debug('feathers-notifme');

class Service {
  constructor (options) { // https://github.com/notifme/notifme-sdk#1-general-options
    debug('constructor', options);
    this.notifier = new NotifmeSdk(options);
  }

  extend (obj) {
    return Proto.extend(obj, this);
  }

  create (body, params, cb) {
    debug('create', body, params);
    return this.notifier.send(body);
  }
}

export default function init (options) {
  return new Service(options);
}

init.Service = Service;