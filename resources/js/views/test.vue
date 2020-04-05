<template>
  <div>
    <p>This is test componet(child comp)</p>
    <p>{{par}}</p>
    <button v-on:click=" childtoparents()">Emit data from child to parent</button>
    <p>{{ptochild}}</p>
  </div>
</template>

<script>
import { bus } from "../app";

export default {
  name: "test",
  props: ["par", "ptochild"],

  data() {
    return {
      txt: "text from child to parent and it worked"
    };
  },
  methods: {
    childtoparents() {
      bus.$emit("ctoparent", this.txt);
    }
  }
};
</script>

<style scoped>
</style>