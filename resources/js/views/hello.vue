<template>
  <div>
    <p>This is hello component(parent)</p>
    <test :par="tochild" :ptochild="this.daniel"></test>
    <p>{{daniel}}</p>
    <button
      v-on:click="change()"
    >talk to child component from parent(hello) via props alwasy thorugh custom comp</button>
  </div>
</template>

<script>
import { bus } from "../app";

import test from "./test";
export default {
  name: "hello",
  //props:['ctoparent'],
  components: {
    test
  },

  data() {
    return {
      tochild: "This is a text from parent(hello comp) to child(test comp)",
      daniel: ""
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
    }
  }
};
</script>