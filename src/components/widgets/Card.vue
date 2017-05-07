<template>
  <div class="app-card"><slot></slot></div>
</template>

<script>
export default {
  
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