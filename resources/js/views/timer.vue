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
  props: ["resetvalue", "gameover"],
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      cycle:1
    };
  },
  watch:{
      elapsedTime(val){
          if(this.elapsedTime >20000 || this.resetvalue === 1){
              this.reset();
              this.resetvalue =0;
              bus.$emit('CycleEvent', {
                 cycleround:this.cycle,
                 resetvalue: this.resetvalue
              })
              
          }
          else if(this.gameover){
              this.stop();
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