<template>
  <div 
    class="app-draggable-box"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <slot></slot>
  </div>
</template>

<script> 
// Taken from http://codepen.io/ramenhog/pen/gmGzRQ?editors=0010

export default {
  data() {
    return {
      diffY: null,
      diffX: null,
      elmHeight: null,
      elmWidth: null,
      isMouseDown: false
    }
  },
  methods: {
    mouseDown(e) {
      this.isMouseDown = true;

      // get initial mousedown coordinated
      let mouseY = e.clientY;
      let mouseX = e.clientX;
      
      // get element top and left positions
      let elm = this.$el;
      let elmY = elm.offsetTop;
      let elmX = elm.offsetLeft;
      
      // get elm dimensions
      this.elmWidth = elm.offsetWidth;
      this.elmHeight = elm.offsetHeight;
      
      // get diff from (0,0) to mousedown point
      this.diffY = mouseY - elmY;
      this.diffX = mouseX - elmX;
    },
    mouseMove(e) {
      if (!this.isMouseDown) {
        return;
      }

      let elm = this.$el;
      // get new mouse coordinates
      let newMouseY = e.clientY;
      let newMouseX = e.clientX;
      
      // calc new top, left pos of elm
      let newElmTop = newMouseY - this.diffY;
      let newElmLeft = newMouseX - this.diffX;

      this.moveElm(newElmTop, newElmLeft);
    },
    moveElm(yPos, xPos) {
      this.$el.style.top = yPos + 'px';
      this.$el.style.left = xPos + 'px';
    },
    mouseUp() {
      this.isMouseDown = false;
    }
  }
}
</script>

<style lang="less">
.app-draggable-box {
  position: absolute;
}
</style>