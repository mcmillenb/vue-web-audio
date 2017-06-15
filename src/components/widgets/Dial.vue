<template>
  <div class="wg-dial" :class="{ 'wg-dial--dragging': dragging }">
    <canvas 
      class="wg-dial__canvas" 
      ref="canvas" 
      :width="size" 
      :height="size"
    ></canvas>
    <div class="wg-dial__info">
      <div class="wg-dial__label">{{ label }}</div>
      <div class="wg-dial__value">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    size: { type: Number, default: 32 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    label: { type: String, default: '' },
  },
  data() {
    return {
      canvas: null,
      context: null,
      requestAnimationFrame: null,   
      tween: 0,
      fillVal: this.value,
      dragging: false,
    }
  },
  computed: {
    range() {
      return this.max - this.min;
    }
  },
  methods: {
    drawArc() {
      let { context, size, fillVal, tween, range } = this;

      let incr = Math.ceil(Math.abs((fillVal - tween) / 8)); 
      tween = (tween < fillVal) ? tween + incr : tween - incr;
      let percent = tween / range;
      let start = Math.PI / 2;
      let end = Math.PI * 2 * percent + Math.PI / 2;
 
      context.clearRect(0, 0, size, size);
      context.beginPath();
      context.arc(size / 2, size / 2, 3 / 8 * size, start, end);
      context.lineWidth = size / 4;
      context.strokeStyle = "#F9AE74";
      context.stroke();

      if (tween !== fillVal) {
        this.tween = tween;
        this.requestAnimationFrame.call(window, this.drawArc);
      }
    },
    startDrag(event) {
      if (event.target === this.$refs.canvas) {      
        this.dragging = true;
        window.addEventListener('mousemove', this.dragValue);
      }
    },
    stopDrag(event) {
      this.dragging = false;
      window.removeEventListener('mousemove', this.dragValue);
    },
    dragValue(event) {
      let factor = this.range / 200;
      this.fillVal += Math.floor((event.movementX - event.movementY) * factor);
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
  margin: 5px;

  &:hover, &:focus, &--dragging {
    .wg-dial__label, .wg-dial__value {
      color: #F9AE74;
    }
  }
}

.wg-dial__canvas {
  cursor: ne-resize;
  margin-right: 5px;
}

.wg-dial__info {
  display: inline-block;
}

.wg-dial__label, .wg-dial__value {
  color: grey;
  transition: color .3s ease;
}

.wg-dial__label {
  font-size: 10px;
}
</style>