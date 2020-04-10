<template>
  <div>
 
    <p>This is hello component(parent)</p>
    <test :par="tochild" :ptochild="this.daniel"></test>
    <p>{{daniel}}</p>
    <button></button>
    <button
      v-on:click="change()"
    >talk to child component from parent(hello) via props alwasy thorugh custom comp</button>
    <button v-on:click="nearby=!nearby" v-bind:class="compclass">toggling class</button>
    <button @click="testvon($event)" id="foo">data daniel zakka</button>
  </div>
</template>

<script>
import { bus } from "../app";
import test from "./test";
export default {
  name: "hello",
  //props:['ctoparent'],
  components: {
    test,
  },

  data() {
    return {
      tochild: "This is a text from parent(hello comp) to child(test comp)",
      daniel: "",
      check:false,
      nearby:false,
    };
  },
  created() {
    bus.$on("ctoparent", data => {
      this.daniel = data;
    });
  },
  methods: {
    change() {
      this.daniel = "this is daniel changed to daniel zakka from parent comp";
    },
    changeclass(){
      this.check=true;
    },
    testvon(event){
      console.log(event);

    }
  },
  computed:{
    compclass:function(){
        return{
          btnclass:this.check,
          diffclass:this.nearby
        }

    }

  }
};
</script>

<style lang="scss" scoped>

.btnclass{
  background-color:red;

}
.diffclass{
  background-color:green;
}

</style>