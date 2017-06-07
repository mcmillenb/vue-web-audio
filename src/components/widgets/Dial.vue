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
    }
  },
  methods: {
    drawArc() {
      let { context, size, value, tween, min, max } = this;

      let incr = Math.ceil(Math.abs((value - tween) / 8)); 
      console.log(value, tween, incr);
      tween = (tween < value) ? tween + incr : tween - incr;
      let percent = tween / (max - min);
      let start = Math.PI / 2;
      let end = Math.PI * 2 * percent + Math.PI / 2;
 
      context.clearRect(0, 0, size, size);
      context.beginPath();
      context.arc(size / 2, size / 2, 3 / 8 * size, start, end);
      context.lineWidth = size / 4;
      context.strokeStyle = "#03A9F4";
      context.stroke();

      if (tween !== value) {
        this.tween = tween;
        this.requestAnimationFrame.call(window, this.drawArc);
      }
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');

    this.requestAnimationFrame = window.requestAnimationFrame || 
                                 window.mozRequestAnimationFrame || 
                                 window.webkitRequestAnimationFrame || 
                                 window.msRequestAnimationFrame;
    this.drawArc();
  },
  watch: {
    value(value) {
      this.drawArc();
    }
  }
}
</script>

<style lang="less">
.wg-dial {
}
</style>