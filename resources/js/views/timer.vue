<template>
  <div>
    <!-- <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button> -->
    <p>{{formattedElapsedTime}}</p>
  </div>
</template>

<script>
import { bus } from "../app";
export default {
  name: "timer",
  props: ['stoptimergame'],
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      automaticnext:0,
    };
  },
  watch:{
      elapsedTime(val){
          if(this.elapsedTime >60000){
              this.reset();
              this.automaticnext =1;
              bus.$emit('automaticnext', this.automaticnext);
          }
     },

     
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    }
  },
  created(){
      this.start();

  }
};
</script>