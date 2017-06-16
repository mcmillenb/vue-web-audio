<template>
  <app-card :raised="true" :title="audioNode.id + ': ' + audioNode.type">
    <v-divider></v-divider>
    <slot></slot>
    <div slot="footer" class="node-wrapper__footer">
      <div>
        <icon class="material-icons">remove_circle_outline</icon>
        <icon class="material-icons">add_circle_outline</icon>
      </div>
    </div>
  </app-card>
</template>

<script>
export default {
  props: ['audioNode'],
  data() {
    return {
      destination: this.audioNode.destination,
    }
  },
  computed: {
    items() {
      return this.$store.getters.audioNodeIDs;
    }
  },
  watch: {
    destination(value) {
      let id = this.audioNode.id;
      let destinations = [ value ];

      this.$store.dispatch('setNodeDestinations', { id, destinations });
    }
  }
}
</script>

<style lang="less">
.node-wrapper__footer {
  width: 100%;
  display: block;

  > div { 
    display: flex;
    padding: 4px;
    justify-content: space-between;

    .material-icons { color: rgba(0,0,0,.2); } 
  }
}
</style>