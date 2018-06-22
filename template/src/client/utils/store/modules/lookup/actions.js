export default {
  populateUser({ commit, state }, user) {
    commit('setUser', user)
    // const feathersClient = this.app.api
    // return feathersClient.service(state.userService)
    //   .get(user.id)
    //   .then(user => {
    //     commit('setUser', user)
    //     return user
    //   })
  },
  async sourceAddresses({ commit, state }) {  
    // if(state.lookup.sourceAddresses.length) return  
    const feathersClient = this.app.api
    try {
      const res = await feathersClient.services.sourceaddresses.find()
      commit('setSourceAddresses', res.data)
      return res.data
    } catch(error) {      
      commit('setLookupError', error)
      return Promise.reject(error)
    }    
  },
  async permissions({ commit, state }) {    
    // if(state.lookup.permissions.length) return
    const feathersClient = this.app.api
    try {
      const res = await feathersClient.services.roles.find({
        query: {
          $limit: '-1',
          $select: [ 'id', 'code' ]
        }
      })
      commit('setPermissions', res)
      return res.data
    } catch(error) {      
      commit('setLookupError', error)
      return Promise.reject(error)
    }    
  },
  async messageTypes({ commit, state }) {    
    // if(state.lookup.permissions.length) return
    const feathersClient = this.app.api
    try {
      const res = await feathersClient.services.messagetypes.find()
      commit('setmessageTypes', res.data)
      return res.data
    } catch(error) {      
      commit('setLookupError', error)
      return Promise.reject(error)
    }    
  },
  async partners({ commit, state }) {    
    // if(state.lookup.permissions.length) return
    const feathersClient = this.app.api
    try {
      const res = await feathersClient.services.partners.find()
      commit('setPartners', res.data)
      return res.data
    } catch(error) {      
      commit('setLookupError', error)
      return Promise.reject(error)
    }    
  },
  async contactGroups({ commit, state }) {    
    // if(state.lookup.permissions.length) return
    const feathersClient = this.app.api
    try {
      const res = await feathersClient.services.contactgroups.find()
      commit('setContactGroups', res.data)
      return res.data
    } catch(error) {      
      commit('setLookupError', error)
      return Promise.reject(error)
    }    
  }


}