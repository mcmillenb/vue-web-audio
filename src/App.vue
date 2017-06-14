<template>
  <div id="app">
    <div id="sidebar">
      <div class="add-node">
        <v-menu offset-y>
          <v-btn light slot="activator"><icon class="material-icons">add</icon></v-btn>
          <v-list>
            <v-list-item 
              v-for="name in nodeNames" 
              :key="name" 
              @click="createNode(name)"
            >
              <v-list-tile>
                <v-list-tile-title>{{ name.toUpperCase() }}</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div id="sandbox">
      <component 
        v-for="node in nodes" 
        :key="node.id"
        :ref="'node' + node.id"
        :is="node.type" 
        :audio-node="node"
      ></component>
    </div>
  </div>
</template>

<script>
import OscillatorNode from '@/components/web-audio/OscillatorNode'
import GainNode from '@/components/web-audio/GainNode'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'app',
  components: { OscillatorNode, GainNode },
  data() {
    return {
      nodeNames: ['oscillator', 'gain'],
    }
  },
  computed: {
    ...mapGetters({
      nodes: 'audioNodeList',
      connectionMap: 'connectionMap'
    })
  },
  methods: {
    createNode(name) {
      this.$store.commit('ADD_NODE', { 
        type: name + '-node',
        destinations: null, 
      });
    },
  },
}
</script>

<style lang="less">
body {
  font-family: arial;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
}

#sidebar {
  position: relative;
  width: 240px;
  height: 100%;
  background-color: #CA8D6E;
  box-shadow: 3px 1px 6px rgba(0,0,0,.2);
  z-index: 2;

  .btn {
    background-color: #F9AE74;
    color: #383745;
  }
}

#sandbox {
  background-color: #7D6962;
  width: 100%;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
</style>
