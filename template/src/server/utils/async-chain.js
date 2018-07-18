// ============================================================================
// Author: Arleigh Dickerson
// (adapted from https://github.com/eliaslfox/lazy-chain)
// See https://gist.github.com/arleighdickerson/df30fd9d0fa6873983785e244f9d3b59
// See https://github.com/feathersjs/feathers/issues/509#issuecomment-379777880
// ============================================================================

const handler = {
  get(methods, methodName) {
    switch (methodName) {
      case 'chain':
        return async (obj) => {
          /* eslint-disable */
          for (const { name, args } of methods) {
            if(name === 'configure'){
              await args[0].call(obj,obj);
            }else{
              obj[name](...args);
            }
          }
          /* eslint-enable */
          return obj;
        };
      default:
        methods.push({ name: methodName });
        return (() => {
          const i = methods.length - 1;
          return (...args) => {
            methods[i].args = args;
          };
        })();
    }
  },
  set() {
    throw new Error('Unable to set prop of async-chain');
  },
};

module.exports = () => new Proxy([], handler);