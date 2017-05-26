<template>
  <div id="app" class="green lighten-4">
    <div class="container">
      <component 
        v-for="node in nodes" 
        :key="node.id"
        :ref="'node' + node.id"
        :is="node.type" 
        :audio-node="node"
      ></component>

      <div class="add-node">
        <v-menu offset-y>
          <v-btn primary light slot="activator">Add Node</v-btn>
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

<style>
body {
  font-family: arial;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
</style>
