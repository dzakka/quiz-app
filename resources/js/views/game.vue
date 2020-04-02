<template>
    <div>
            This is a game componenet
    </div>
</template>

<script>
export default {
    props :['useroptions'],
 name: 'game',
 data(){
     return{

     }
 },
created(){

    console.log(this.useroptions.id);
    console.log(this.useroptions.diff);
}


}
</script>