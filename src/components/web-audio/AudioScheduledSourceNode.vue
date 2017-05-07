<script>
import AudioNode from '@/components/web-audio/AudioNode'

export default {
  mixins: [ AudioNode ],
  props: {
    onended: {
      type: Function
    },
  },
  methods: {
    start(when, offset, duration) {
      this._instance.start(when, offset, duration);
    },
    stop(when) {
      this._instance.stop(when);
    }
  }
}
</script>