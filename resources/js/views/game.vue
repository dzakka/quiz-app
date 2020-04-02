<template>
    <div>
         <div>
            <button type="button" class="list-group-item list-group-item-action active">
                    {{result.question}}
                </button>
          <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action">{{result.ans[0]}}</button>
                <button type="button" class="list-group-item list-group-item-action">{{result.ans[1]}}</button>
                <button type="button" class="list-group-item list-group-item-action">{{result.ans[2]}}</button>
                <button type="button" class="list-group-item list-group-item-action" disabled>{{result.ans[3]}}</button>
         </div>      
        </div> 
        <div>
            <button v-on:click="next()" class="button btn-primary">Next Question</button>
            <button class="button btn-primary">skip</button>
        </div>
    </div>
</template>

<script>
const opentdb = require('opentdb-api');
export default {
    props :['useroptions'],
 name: 'game',
 data(){
     return{
         totalcount:{},
         result:{
             question:'',
             ans:{

             }
         },
        options :{
            amount: 5,
            category: parseInt(this.useroptions.id),
            difficulty: this.useroptions.dif,
            type: 'any'
        },
        results:{},
        index:0,
        allans:[]

     }                                                                                                                                                                                                                                                                                                                                                                                                  
 },
 methods:{
     next(){
         this.allans =[];
        this.result.ans = this.allanswers(this.results[this.index]);
        this.result.question = this.results[this.index].question;
        this.index++;
        
     },
     allanswers(data){
        if(data.type === 'multiple') {
        this.allans  = this.allans.concat(data.incorrect_answers);
        this.allans.push(data.correct_answer);
        this.allans = this.shuffle(this.allans);
        return this.allans;
        
        }
         else{
             return;
         }
    },
    shuffle(data){
        return data.sort((data)=>0.5- Math.random());

    }


 },
created(){
 opentdb.getTrivia(this.options).then(result => {
   this.results = result;
   this.next();
   console.log(this.results);
 });
opentdb.getQuestionCount(this.options.category)
.then(result =>{
    this.totalcount = result
});
}


}
</script>