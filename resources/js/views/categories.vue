<template>
  <div>
    <p>text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-royal btn-sm" v-on:click="categoryuser(9)" type="submit">
        General Knowledge
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-space btn-sm" v-on:click="categoryuser(10)" type="submit">
        Boooks
        <br />
        <i class="fas fa-book fa-3x"></i>
      </button>
      <button class="btn btn-prussian btn-sm" v-on:click="categoryuser(11)" type="submit">
        Film
        <br />
        <i class="fas fa-photo-video fa-3x"></i>
      </button>
      <button class="btn btn-navy btn-sm" v-on:click="categoryuser(12)" type="submit">
        Music
        <br />
        <i class="fas fa-music fa-3x"></i>
      </button>
      <button class="btn btn-yale btn-sm" v-on:click="categoryuser(13)" type="submit">
        Musicals & Theatres
        <br />
        <i class="fas fa-theater-masks fa-3x"></i>
      </button>
      <button class="btn btn-egyptain btn-sm" v-on:click="categoryuser(14)" type="submit">
        Television
        <br />
        <i class="fas fa-tv fa-3x"></i>
      </button>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-azure btn-sm" v-on:click="categoryuser(15)" type="submit">
        Video Games
        <br />
        <i class="fas fa-gamepad fa-3x"></i>
      </button>
      <button class="btn btn-sapphire btn-sm" v-on:click="categoryuser(16)" type="submit">
        Board Games
        <br />
        <i class="fas fa-chess-rook fa-3x"></i>
      </button>
      <button class="btn btn-olympic btn-sm" v-on:click="categoryuser(17)" type="submit">
        Science & Nature
        <br />
        <i class="fas fa-leaf fa-3x"></i>
      </button>
      <button class="btn btn-cornflower btn-sm" v-on:click="categoryuser(18)" type="submit">
        Computers
        <br />
        <i class="fas fa-laptop-code fa-3x"></i>
      </button>
      <button class="btn btn-independence btn-sm" v-on:click="categoryuser(19)" type="submit">
        Mathematics
        <br />
        <i class="fas fa-square-root-alt fa-3x"></i>
      </button>
      <button class="btn btn-teal btn-sm" v-on:click="categoryuser(20)" type="submit">
        Mythology
        <br />
        <i class="fab fa-pied-piper-alt fa-3x"></i>
      </button>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-maya btn-sm" v-on:click="categoryuser(21)" type="submit">
        Sports
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-pigeon btn-sm" v-on:click="categoryuser(22)" type="submit">
        Geography
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-turkish btn-sm" v-on:click="categoryuser(23)" type="submit">
        History
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-carolina btn-sm" v-on:click="categoryuser(24)" type="submit">
        Politics
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-steel btn-sm" v-on:click="categoryuser(25)" type="submit">
        Art
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-tiffany btn-sm" v-on:click="categoryuser(26)" type="submit">
        Celebrities
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-baby btn-sm" v-on:click="categoryuser(27)" type="submit">
        Animals
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-airforce btn-sm" v-on:click="categoryuser(28)" type="submit">
        Vehicles
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-electric btn-sm" v-on:click="categoryuser(29)" type="submit">
        Comics
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-sky btn-sm" v-on:click="categoryuser(30)" type="submit">
        Gadgets
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-powder btn-sm" v-on:click="categoryuser(31)" type="submit">
        Japanese Anime & Manga
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
      <button class="btn btn-turquoise btn-sm" v-on:click="categoryuser(32)" type="submit">
        Cartoon & Animations
        <br />
        <i class="fas fa-book-reader fa-3x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { bus } from "../app";

const opentdb = require("opentdb-api");
export default {
  name: "categories",
  data() {
    return {
      categories: {}
    };
  },
  methods: {
    categoryuser(id) {
      //     bus.$emit('categoryid' ,id);
      //     console.log('emitted');
      this.$router.push(`/difficulty/${id}`);
    }
  },
  created() {
    opentdb.getCategories().then(result => {
      this.categories = result;
      // console.log(this.categories);
    });
  }
};
</script>

<style lang="scss" scoped>
.btn {
  width: 160px;
  height: 90px;
}
</style>