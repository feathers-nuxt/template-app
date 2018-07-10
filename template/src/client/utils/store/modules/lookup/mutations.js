import serializeError from 'serialize-error'

export default {

  setLookupError(state, error) {
    state.errorOnLookup = Object.assign({}, serializeError(error))
  },

  // source addresses
  setSourceAddresses(state, payload) {
    state.sourceAddresses = payload
  },
  unsetSourceAddresses(state) {
    state.sourceAddresses = []
  },

  // source addresses
  setPermissions(state, payload) {
    state.permissions = payload
  },
  unsetPermissions(state) {
    state.permissions = []
  },

  // source addresses
  setmessageTypes(state, payload) {
    state.messageTypes = payload
  },
  unsetmessageTypes(state) {
    state.messageTypes = []
  },

  // ContactGroups
  setContactGroups(state, payload) {
    state.contactGroups = payload
  },
  unsetContactGroups(state) {
    state.contactGroups = []
  },

  // partners
  setPartners(state, payload) {
    state.partners = payload
  },
  unsetPartners(state) {
    state.partners = []
  },

  // partners
  setGroups(state, payload) {
    state.groups = payload
  },
  unsetGroups(state) {
    state.groups = []
  },

  // partners
  setShortcodes(state, payload) {
    state.shortcodes = payload
  },
  unsetShortcodes(state) {
    state.shortcodes = []
  },

  // partners
  setContactLists(state, payload) {
    state.contactLists = payload
  },
  unsetContactLists(state) {
    state.contactLists = []
  },

}