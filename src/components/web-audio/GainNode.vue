<template>
  <node-wrapper :audio-node="audioNode">
    <div class="options">
      <wg-dial v-model.number="gain" label="gain"></wg-dial>
    </div>
  </node-wrapper>
</template>

<script>
import NodeWrapper from '@/components/web-audio/NodeWrapper'
import AudioScheduledSourceNode from '@/components/web-audio/AudioScheduledSourceNode'

export default {
  mixins: [ AudioScheduledSourceNode ],
  components: { NodeWrapper },
  props: {
    audioNode: {
      type: Object,
    },
    options:{
      type: Object,
    }
  },
  data() {
    return {
      gain: 0,
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

      let { gain } = this.options;
      if (typeof this.gain !== 'undefined') {
        this.gain = gain;
      }
    },
    initializeInstance() {
      let id = this.audioNode.id;
      let _instance = this.$audio.createGain();
      _instance.gain.value = this.gain / 100;

      this.$store.commit('UPDATE_NODE', { id, data: { _instance }});
    }
  },
  watch: {
    gain(value) {
      this._instance.gain.value = value / 100;
    }
  },
  created() {
    this.connect(this.$audio.destination);
  }
}
</script>

<style scoped> 
.input-group {
  margin-left: 10px;
}

.options {
  display: flex;
  justify-content: flex-start;
}
</style>