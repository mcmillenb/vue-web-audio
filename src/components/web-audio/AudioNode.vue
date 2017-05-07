<script>
export default {
  props: {
    audioNode: {
      type: Object,
      required: true,
    },
    channelCount: {
      type: Number
    },
    channelCountMode: {
      type: Number
    },
    channelInterpretation: {
      type: Number
    }
  },
  computed: {
    _instance() {
      return this.$store.getters.audioNodes[this.audioNode.id]._instance;
    }
  },
  methods: {
    connect(destination, outputIndex, inputIndex) {
      return this._instance.connect(destination, outputIndex, inputIndex);
    },
    disconnect(destination, output, input) {
      this._instance.disconnect(destination, output, input);
    }
  },
  created() {
    this.initializeOptions();
    this.initializeInstance();
  }
}
</script>