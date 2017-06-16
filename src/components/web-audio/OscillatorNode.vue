<template>
  <node-wrapper :audio-node="audioNode">
    <div class="options">
      <div>
        <wg-dial 
          v-model.number="frequency" 
          label="freq" 
          :min="0" 
          :max="1000"
        ></wg-dial>
        <wg-dial 
          v-model.number="detune" 
          label="detune"
          :min="-1000"
          :max="1000"
        ></wg-dial>
      </div>
      <div>
        <v-select
          label="type" 
          type="text" 
          v-model="type" 
          :items="typeOpts" 
          dark
        ></v-select>
      </div>
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

<style lang="less"> 
.input-group {
  margin: 20px 10px;
}

.options > div {
  width: 100%;
  position: relative;
  padding-bottom: 8px;

  .input-group--select { 
    width: 100%; 
    height: 28px;
    padding: 0 8px;
    margin: 10px 0;

    label { padding: 6px 8px; }
  }

  > * { float: left; }
}
</style>