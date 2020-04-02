<template>
  <p>This is the homepage</p>
</template>


<script>
const opentdb = require('opentdb-api');
  
export default {
    
data(){
    return{
     options :{
    amount: 49,
    category: 22,
    difficulty: 'medium',
    type: 'any'
    },

}
},
created(){
opentdb.getTrivia(this.options).then(result => {
  console.log(result);
});
opentdb.getCategories()
.then(result =>{
    console.log(result);
});
opentdb.getQuestionCount(22)
.then(result =>{
    console.log(result);
});
}    


}
</script>


//const {Client, Defs} = require('opendtb-wrapper');
//Client.get().then(console.log); // Get a random question
// Client.get({amount: 5, category: Defs.CATEGORIES.ART, difficulty: 'easy', type: 'multiple'}).then(console.log) // Get 5 random questions of category "ART", with easy difficulty and with multiple answers (A, B, C, D)
 
// const Trivia = new Client(); // Create a new instance of the client class - with caching disabled.
// await Trivia.setToken(); // Make sure the token has generated before fetching questions. You do not need this if you aren't going to get questions right after creating the client.
 
// Trivia.fetchQuestion();
