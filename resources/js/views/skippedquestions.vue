<template>
  <div>
    <div v-if="round">
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
      <p>Your score skip is {{counter}}</p>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { bus } from "../app";
export default {
  name: "skippedquestions",
  data() {
    return {
      result: {
        question: "",
        ans: {}
      },
      allquestions: [],
      skipques: {},
      allskip: [],
      allskipback: {},
      peopleObject: {},
      results: {},
      skippedquestions: [],
      index: 0,
      allans: [],
      len: "",
      correct: "",
      counter: "",
      gameover: 0,
      skippedid: "",
      round: ""
    };
  },
  created() {
    bus.$on("daniel", data => {
      this.allquestions = Object.entries(data.allquestions).map(e => e[1]);
      this.skipques = data.skippedques;
      this.counter = data.scoregame;
      for (let i = 0; i < this.skipques.length; i++) {
        this.allskip.push(this.allquestions[this.skipques[i]]);
      }
      this.results = this.allskip;
      this.round = 1;
      this.next();
    });
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
        if (this.index != this.skipques.length) {
          this.next();
        } else {
          this.gameover = 1;
        }
      } else {
        if (this.index != this.skipques.length) {
          this.next();
        } else {
          this.gameover = 1;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
