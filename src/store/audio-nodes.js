import _ from 'lodash'

export default {
  state: {
    audioNodes: {},
    connectionMap: {},
  },
  mutations: {
    ADD_NODE(state, node) {
      let _nodes = state.audioNodes;

      node.id = _.keys(state.audioNodes).length;
      _nodes[node.id] = node;

      state.audioNodes = {..._nodes};
    },
    REMOVE_NODE(state, id) {
      delete state.audioNodes[id];
    },
    UPDATE_NODE(state, { id, data }) {
      _.assign(state.audioNodes[id], data);
    },
  },
  actions: {
    setNodeDestinations({commit, getters}, {id, destinations}) {
      let currentDestinations = getters.audioNodes[id].destinations;
      currentDestinations = _.defaultTo(currentDestinations, []);
      let fromInstance = getters.audioNodes[id]._instance

      // check for new destinations to connect to
      for (let i = 0; i < destinations.length; i++) {
        let index = _.indexOf(currentDestinations, destinations[i])
        if (index < 0) { // if it's not in the current destinations
          fromInstance.connect(getters.audioNodes[destinations[i]]._instance);
        } else { // if it is in the current destinations, remove entry
          currentDestinations.splice(index, 1); 
        }
      }

      // what's left is what was not in the new destinations, so disconnect
      for (let i = 0; i < currentDestinations.length; i++) {
        let toInstance = getters.audioNodes[currentDestinations[i]]._instance;
        fromInstance.disconnect(toInstance);
      }

      commit('UPDATE_NODE', {id, data: { destinations }});
    }
  },
  getters: {
    audioNodeList(state) {
      return _.values(state.audioNodes);
    },
    audioNodeIDs(state) {
      return _.keys(state.audioNodes);
    },
    audioNodes(state) {
      return state.audioNodes;
    },
    connectionMap(state) {
      return state.connectionMap;
    }
  }
}