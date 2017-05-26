<template>
  <node-wrapper :audio-node="audioNode">
    <div class="options">
      <v-text-field label="frequency" type="number" v-model.number="frequency" dark>
      </v-text-field>
      <v-text-field label="detune" type="number" v-model.number="detune" dark>
      </v-text-field>
      <v-select label="type" type="text" v-model="type" :items="typeOpts" dark>
      </v-select>
    </div>
  </node-wrapper>
</template>

<script>
import NodeWrapper from '@/components/web-audio/NodeWrapper'
import AudioScheduledSourceNode from '@/components/web-audio/AudioScheduledSourceNode'

export default {
  mixins: [ AudioScheduledSourceNode ],
  components: { NodeWrapper },
  props: ['audioNode', 'options' ],
  data() {
    return {
      typeOpts: [ 'sine', 'square', 'sawtooth', 'triangle' ],
      frequency: 440,
      detune: 0,
      type: 'sine'
    }
  },
  methods: {
    setPeriodicWave(wave) {
      this._instance.setPeriodicWave(wave);
    },
    initializeOptions() {
      if (!this.options) {
        return;
      }

      let { frequency, detune, type } = this.options;
      if (typeof this.frequency !== 'undefined') {
        this.frequency = frequency;
      }
      if (typeof this.detune !== 'undefined') {
        this.detune = detune;
      }
      if (typeof this.type !== 'undefined') {
        this.type = type;
      }
    },
    initializeInstance() {
      let id = this.audioNode.id;
      let _instance = this.$audio.createOscillator();
      _instance.frequency.value = this.frequency;
      _instance.detune.value = this.detune;
      _instance.type = this.type;

      this.$store.commit('UPDATE_NODE', { id, data: { _instance } });
    }
  },
  watch: {
    frequency(value) {                                                                            
      this._instance.frequency.value = value;
    },
    detune(value) {
      this._instance.detune.value = value;
    },
    type(value) {
      this._instance.type = value;
    }
  },
  created() {
    this.start()
  }
}
</script>

<style scoped> 
.app-card {
  width: 300px;
}

.input-group {
  margin: 20px 10px;
}

.options {
  display: flex;
  justify-content: center;
}
</style>