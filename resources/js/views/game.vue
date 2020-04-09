<template>
  <div id="main-div-game">
    <div v-if="!showthebutton">
      <div v-if="!gameover || playedskipped === 1">
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
        <div v-if="index === results.length">
          <button v-on:click="skip(result)" class="button btn-primary">Skip</button>
        </div>
        <div v-else>
          <button v-on:click="next()" class="button btn-primary">Next Question</button>
          <button v-on:click="skip()" class="button btn-primary">Skip</button>
        </div>
      </div>
      <div v-else v-bind:class="{hide:daniel}"></div>
    </div>
    <div v-else-if="(showthebutton) && (playedskipped === 0) && (skippedquestionz.length>0)">
      <skippedquestions
        :allques="this.results"
        :skipindex="skippedquestionz"
        :scorefromgame="counter"
      ></skippedquestions>
    </div>
    <div v-else>
      <p>Your final score is {{counter}}</p>
    </div>
    <p>{{formattedElapsedTime}}</p>
  </div>
</template>

<script>
import skippedquestions from "./skippedquestions";
import timer from "./timer";
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
      skippedquestionz: [],
      index: 0,
      allans: [],
      len: "",
      correct: "",
      counter: 0,
      gameover: 0,
      daniel: false,
      transfer: 0,
      showthebutton: 0,
      playedskipped: 0,
      elapsedTime: 0,
      timer: undefined
    };
  },

  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },
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
      this.reset();
      this.skippedquestionz.push(this.index - 1);
      if (this.index != this.results.length) {
        this.next();
      } else {
        this.gameover = 1;
        this.showthebutton = 1;
      }
    },
    score(data) {
      this.reset();
      if (data === this.correct) {
        this.counter++;
        if (this.index != this.results.length) {
          this.next();
        } else {
          this.gameover = 1;
          this.showthebutton = 1;
          this.stop();
        }
      } else {
        if (this.index != this.results.length) {
          this.next();
        } else {
          this.gameover = 1;
          this.showthebutton = 1;
          this.stop();
        }
      }
    }
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  watch: {
    elapsedTime(val) {
      if (this.elapsedTime > 20000) {
        this.reset();
        this.next();
      }
    },
    showthebutton(val){
      if(this.playedskipped === 0 && this.showthebutton ===1){
        this.stop();
      }
    }
  },
  created() {
    opentdb.getTrivia(this.options).then(result => {
      bus.$on("skippedquesfinal", data => {
        if (data) {
          this.start();
          this.results = data;
          this.playedskipped = 1;
          this.showthebutton = 0;
          this.gameover = 0;
          this.index = 0;
          this.next();
        }
      });
      this.results = result;
      this.round = 0;
      this.start();
      this.next();
    });
    opentdb.getQuestionCount(this.options.category).then(result => {
      this.totalcount = result;
    });
  }
};
</script>


<style  lang="scss" scoped>
</style>