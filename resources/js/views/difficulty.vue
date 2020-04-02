<template>
    <div>
        <p>Choose your difficulty Level</p>
        <div class="d-flex justify-content-center align-items-center mt-4">
            <button class="btn btn-baby btn-md mr-5" v-on:click="getdifficulty('easy')" type="submit">Easy<br>
                 <i class="fas fa-book-reader fa-3x"></i></button>
            <button class="btn btn-airforce btn-md mr-5" v-on:click="getdifficulty('medium')" type="submit">Medium<br>
                 <i class="fas fa-book-reader fa-3x"></i></button>
            <button class="btn btn-electric btn-md" v-on:click="getdifficulty('hard')" type="submit"> Hard<br>
                 <i class="fas fa-book-reader fa-3x"></i></button>
        </div>        

    </div>    
</template>

<script>
import {bus} from '../app';
export default {
name:'difficulty',
data(){
    return{
        useroptions:{
            id:'',
            diff:''
        }
    }
},
created(){
    //console.log(this.$route.params.categoryid);
   this.useroptions.id =this.$route.params.categoryid;
},
methods:{
    getdifficulty(userdiff){
        this.useroptions.diff = userdiff;
        this.$router.push({
            name:'game',
            params:{
                useroptions: this.useroptions
            }
        });
    }

}

}
</script>

<style lang="scss" scoped>
.btn{
    width:200px;
    height:110px;
}
</style>