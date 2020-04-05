<template>
    <div>    
        <p>This is timer componet</p>
        <!-- <p>{{msg}} from test comp</p> -->
        <p>{{num}} from hello comp</p>
        <hello :msessage ="this.msg"></hello>
    </div>
</template>

<script>
import { bus } from "../app";
//import test from "./test";
import hello from "./hello";
export default {
    props:['msg', 'num'],
        name:'timer',
 components:{
     hello
 },
data(){
    return{
    

    }

},
methods:{
    // datatoemit(data){
    //     this.other = data;

    // }

}


}
</script>

<style scoped>



</style>