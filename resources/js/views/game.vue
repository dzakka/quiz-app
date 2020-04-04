<template>
  <div>
    <div>
      <div v-if="!gameover">
        <div>
          <p>score:{{counter}}</p>
        </div>
        <div v-if="len>2">
          <button
            type="button"
            class="list-group-item list-group-item-action active"
          >{{result.question}}</button>
          <div class="list-group">
            <button
              type="button"
              v-on:click="score(result.ans[0])"
              class="list-group-item list-group-item-action"
            >{{result.ans[0]}}</button>
            <button
              type="button"
              v-on:click="score(result.ans[1])"
              class="list-group-item list-group-item-action"
            >{{result.ans[1]}}</button>
            <button
              type="button"
              v-on:click="score(result.ans[2])"
              class="list-group-item list-group-item-action"
            >{{result.ans[2]}}</button>
            <button
              type="button"
              v-on:click="score(result.ans[3])"
              class="list-group-item list-group-item-action"
            >{{result.ans[3]}}</button>
          </div>
        </div>
        <div v-else>
          <button
            type="button"
            class="list-group-item list-group-item-action active"
          >{{result.question}}</button>
          <div class="list-group">
            <button
              type="button"
              v-on:click="score(result.ans[0])"
              class="list-group-item list-group-item-action"
            >{{result.ans[0]}}</button>
            <button
              type="button"
              v-on:click="score(result.ans[1])"
              class="list-group-item list-group-item-action"
            >{{result.ans[1]}}</button>
          </div>
        </div>
        <div v-if="index === options.amount">
          <button v-on:click="skip(result)" class="button btn-primary">Skip</button>
        </div>
        <div v-else>
          <button v-on:click="next()" class="button btn-primary">Next Question</button>
          <button v-on:click="skip()" class="button btn-primary">Skip</button>
        </div>
      </div>
      <div v-else v-bind:class="{hide:daniel}">
        <button v-on:click="repeat()">Repeat the skipped questions</button>
        <p>Your score is {{counter}}</p>
      </div>
    </div>
    <div>
      <skippedquestions></skippedquestions>
    </div>  
  </div>
</template>

<script>
import skippedquestions from "./skippedquestions";
import { bus } from "../app";
const opentdb = require("opentdb-api");

export default {
  props: ["useroptions"],
  name: "game",
  components: {
    skippedquestions
  },
  data() {
    return {
      result: {
        question: "",
        ans: {}
      },
      options: {
        amount: 5,
        category: parseInt(this.useroptions.id),
        difficulty: this.useroptions.dif,
        type: "any"
      },
      results: {},
      skippedquestions: [],
      index: 0,
      allans: [],
      len: "",
      correct: "",
      counter: 0,
      gameover: 0,
      skippedid: "",
      daniel:false,
    };
  },
  methods: {
    next() {
      this.allans = [];
      this.len = 0;
      this.result.ans = this.allanswers(this.results[this.index]);
      this.result.question = this.results[this.index].question;
      this.index++;
    },
    allanswers(data) {
      if (data.type === "multiple") {
        this.allans = this.allans.concat(data.incorrect_answers);
        this.allans.push(data.correct_answer);
        this.correct = data.correct_answer;
        this.allans = this.shuffle(this.allans);
        this.len = 4;
        return this.allans;
      } else {
        this.len = 2;
        this.correct = data.correct_answer;
        this.allans = this.allans.concat(data.incorrect_answers);
        this.allans.push(data.correct_answer);
        return this.allans;
      }
    },
    shuffle(data) {
      return data.sort(data => 0.5 - Math.random());
    },
    skip() {
      this.skippedquestions.push(this.index - 1);
      if (this.index != this.options.amount) {
        this.next();
      } else {
        this.gameover = 1;
      }
    },
    score(data) {
      if (data === this.correct) {
        this.counter++;
        if (this.index != this.options.amount) {
          this.next();
        } else {
          this.gameover = 1;
        }
      } else {
        if (this.index != this.options.amount) {
          this.next();
        } else {
          this.gameover = 1;
        }
      }
    },
    repeat() {
         bus.$emit("daniel", 
         {
            allquestions: this.results,
            skippedques: this.skippedquestions,
            scoregame: this.counter,
        });
        this.daniel = true;
          console.log(this.results);
    }
  },
  created() {
    opentdb.getTrivia(this.options).then(result => {
      this.results = result;
      this.round=0;
      this.next();
      //console.log(this.results);
    });
    opentdb.getQuestionCount(this.options.category).then(result => {
      this.totalcount = result;
    });
  }
};
</script>


<style  lang="scss" scoped>
</style>