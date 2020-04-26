<template>
  <div class="RecipeComponent">
    <b-modal ref="recipe-modal" size="lg" centered  hide-footer :title= recipeTitle>
      <div v-if="this.steps" class="d-block text-left" >
        <ul id="example-1" style="list-style-type:none">
          <li v-for="el in this.steps" :key="el"><b>{{el.number}}</b>: {{ el.step }}</li>
        </ul>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
    <b-card
      v-bind:title="title"
      v-bind:img-src="imageUrl"
      img-alt="Image"
      img-top
      class="mb-1 mr-1"
      style="min-width: 15rem; max-width: 20rem; height: 37rem"
      img-height="300rem"
    >
      <!--      <b-img :src="imageUrl" center fluid rounded="10"/>-->
      <b-card-text>
        <p class="information">Ready in minutes: {{readyInMinutes}}</p>
        <p class="information">Servings: {{servings}}</p>
      </b-card-text>
      <b-button
        href="#"
        variant="primary"
        v-on:click="showRecipe"
        style="color: aliceblue"
      >Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
import { baseRecipiesApiPhotosUrl } from "../../shared/constants";
import axios from "axios";
import { baseRecipiesApiUrl, getWithEndpoint } from "../../shared/constants";

export default {
  data() {
    return {
      results: [],
      steps:[],
      recipeTitle: "",
      recipeImageUrl: "",
    };
  },
  props: {
    id: Number,
    title: String,
    readyInMinutes: Number,
    servings: Number,
    image: String,
    imageUrls: Array
  },
  computed: {
    imageUrl: function() {
      return `${baseRecipiesApiPhotosUrl}${this.image}`;
    }
  },
  mounted() {},
  created() {},
  methods: {
    print: function() {
      console.log(this.id);
    },
    showRecipe: function() {
      axios
        .get(
          getWithEndpoint(
            new URL(`${baseRecipiesApiUrl}/${this.id}/analyzedInstructions`)
          )
        )
        .then(response => (this.steps = response.data[0].steps));

      this.recipeTitle = this.title;
      this.$refs["recipe-modal"].show();
    },
    hideModal() {
      this.$refs["recipe-modal"].hide();
    }
  }
};
</script>
