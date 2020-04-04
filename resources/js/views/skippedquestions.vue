<template>
    <div>
       
    </div>    
</template>

<script>
import {bus} from '../app'
export default {
    name:'skippedquestions',
    data(){
        return{
            allquestions:[],
            skipques:{},
            allskip:[],
            allskipback:{},
            peopleObject:{}   

        }
    },
created(){

    bus.$on('daniel',(data)=>{
         this.allquestions =Object.entries(data.allquestions).map((e)=>(e[1])) ;
         this.skipques = data.skippedques; 
          for(let i=0;i<this.skipques.length;i++){

              this.allskip.push(this.allquestions[this.skipques[i]]);
          }
          //console.log(this.allskip);
          bus.$emit('allskip', this.allskip);

            });

},
methods:{

}

}
</script>

<style scoped>






</style>
 