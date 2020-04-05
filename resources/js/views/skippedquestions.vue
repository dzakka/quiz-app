<template>
  <div>
    <button v-on:click="playagain()">Do you want to play the skipped questions</button>
  </div>
</template>

<script>
import { bus } from "../app";
import game from "./game";
export default {
  name: "skippedquestions",
  props: ["allques", "skipindex", "scorefromgame"],
  data() {
    return {
      allskip: [],
      allquestions: [],
      skipques: {},
      counter: "",
    };
  },
  created() {
      
  },
  methods: {                                                                                                                                                                                  
    playagain() {
      this.allquestions = Object.entries(this.allques).map(e => e[1]);
      this.skipques = this.skipindex;
      this.counter = this.scorefromgame;
      for (let i = 0; i < this.skipques.length; i++) {
        this.allskip.push(this.allquestions[this.skipques[i]]);
      }
      //console.log(this.allskip);
      bus.$emit("skippedquesfinal", this.allskip);
    }
  }
};
</script>

<style scoped>
</style>
