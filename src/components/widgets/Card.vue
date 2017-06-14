<template>
  <div class="app-card"> 
    <draggable-box class="app-card__dragger">{{ title }}</draggable-box>
    <div class="app-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import DraggableBox from '@/components/widgets/DraggableBox'

export default {
  props: ['raised', 'title'],
  components: { DraggableBox }
}
</script>

<style lang="less">
.app-card {
  position: relative;
  background-color: white;
  border: 2px solid #0a0a0a;
  margin: 10px;
  box-shadow: 2px 2px 2px rgba(0,0,0,.5);
}

.app-card__dragger {
  width: 100%;
  min-height: 30px;
  padding: 5px;
  color: white;
  background-color: #0a0a0a;
  text-transform: uppercase;
}

.app-card__content {
  padding: 10px;
  user-select: none;
}
</style>