<template>
  <div class="app-card"> 
    <draggable-box class="app-card__dragger">{{ title }}</draggable-box>
    <div class="app-card__content">
      <slot></slot>
    </div>
    <div class="app-card__footer">
      <slot name="footer"></slot>
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
  border: 2px solid #22202B;
  margin: 10px;
  box-shadow: 3px 1px 6px rgba(0,0,0,.5);
  border-radius: 4px;
}

.app-card__dragger {
  width: 100%;
  min-height: 30px;
  padding: 5px;
  color: white;
  background-color: #22202B;
  text-transform: uppercase;
}

.app-card__content {
  position: relative;
  width: 100%;
  overflow: visible;
  padding: 10px;
  user-select: none;
}

.app-card__footer {
  padding: 4px 8px;
}
</style>