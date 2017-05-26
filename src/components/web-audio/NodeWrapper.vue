<template>
  <app-card :raised="true">
    <h5>{{ audioNode.type }} (ID: {{ audioNode.id }})</h5>
    <v-divider></v-divider>
    <slot></slot>
    <v-select label="out" type="text" v-model="destination" :items="items" dark>
    </v-select>
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