<template>
  <div class="wg-dial">
    <canvas ref="canvas" :width="size" :height="size"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    size: { type: Number, default: 32 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  },
  data() {
    return {
      canvas: null,
      context: null,
      requestAnimationFrame: null,   
      tween: 0,
      fillVal: this.value,
    }
  },
  methods: {
    drawArc() {
      let { context, size, fillVal, tween, min, max } = this;

      let incr = Math.ceil(Math.abs((fillVal - tween) / 8)); 
      tween = (tween < fillVal) ? tween + incr : tween - incr;
      let percent = tween / (max - min);
      let start = Math.PI / 2;
      let end = Math.PI * 2 * percent + Math.PI / 2;
 
      context.clearRect(0, 0, size, size);
      context.beginPath();
      context.arc(size / 2, size / 2, 3 / 8 * size, start, end);
      context.lineWidth = size / 4;
      context.strokeStyle = "#03A9F4";
      context.stroke();

      if (tween !== fillVal) {
        this.tween = tween;
        this.requestAnimationFrame.call(window, this.drawArc);
      }
    },
    startDrag(event) {
      if (event.target === this.$refs.canvas) {      
        window.addEventListener('mousemove', this.dragValue);
      }
    },
    stopDrag(event) {
      window.removeEventListener('mousemove', this.dragValue);
    },
    dragValue(event) {
      this.fillVal += Math.floor((event.movementX - event.movementY) / 2);
    },
    updateFillVal(value) {
      this.fillVal = Math.max(Math.min(value, this.max), this.min);
      this.drawArc();
      this.$emit('input', this.fillVal);
    }
  },
  watch: {
    fillVal(value) {
      this.updateFillVal(value);
    },
    value(value) {
      this.updateFillVal(value);
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');

    this.requestAnimationFrame = window.requestAnimationFrame || 
                                 window.mozRequestAnimationFrame || 
                                 window.webkitRequestAnimationFrame || 
                                 window.msRequestAnimationFrame;
    this.drawArc();

    window.addEventListener('mousedown', this.startDrag);
    window.addEventListener('mouseup', this.stopDrag);
  },
  destroyed() {
    window.removeEventListener('mousedown', this.startDrag);
    window.removeEventListener('mouseup', this.stopDrag);
  }
}
</script>

<style lang="less">
.wg-dial {
  canvas { cursor: ne-resize; }
}
</style>