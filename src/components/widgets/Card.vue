<template>
  <draggable-box><div class="app-card"><slot></slot></div></draggable-box>
</template>

<script>
import DraggableBox from '@/components/widgets/DraggableBox'

export default {
  components: { DraggableBox }
}
</script>

<style lang="less">
.app-card {
  background-color: white;
  border: 2px solid #0a0a0a;
  padding: 10px;
  margin: 10px;
  box-shadow: 2px 2px 2px rgba(0,0,0,.5);
}
</style>