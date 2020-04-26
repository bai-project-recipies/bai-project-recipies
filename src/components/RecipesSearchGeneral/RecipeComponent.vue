<template>
  <div class="RecipeComponent">
    <b-modal ref="recipe-modal" size="lg" centered hide-footer :title="recipeTitle">
      <div v-if="this.steps" class="d-block text-left">
        <h5>You will need:</h5>
        <ul v-if="this.units === 'metric'" id="ingridients" style="list-style-type:none">
          <li v-for="el in this.ingredients" :key="el">
            {{ el.amount.metric.value }} {{ el.amount.metric.unit }} of
            <b>{{ el.name }}</b>
          </li>
        </ul>
        <ul v-if="this.units === 'us'" id="ingridients" style="list-style-type:none">
          <li v-for="el in this.ingredients" :key="el">
            {{ el.amount.us.value }} {{ el.amount.us.unit }} of
            <b>{{ el.name }}</b>
          </li>
        </ul>
        <h5>All you have to do is:</h5>
        <ul id="steps" style="list-style-type:none">
          <li v-for="el in this.steps" :key="el">
            <b>{{el.number}}</b>
            : {{ el.step }}
          </li>
        </ul>
      </div>
      <div>
        <b-button variant="outline-info" block @click="changeUnits">{{changeUnitButtonName}}</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Close</b-button>
      </div>
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
        <p class="information">
          Likes: {{likes}}
          <button v-on:click="setLikes(id, likes+1)">Add Like</button>
        </p>
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
import {
  baseRecipiesApiPhotosUrl,
  baseRecipiesApiUrl,
  getWithEndpoint
} from "../../shared/constants";
import { getLikes, setLikes } from "../../shared/DBHandling";
import axios from "axios";

export default {
  data() {
    return {
      results: [],
      steps: [],
      ingredients: [],
      recipeTitle: "",
      likes: 0,
      units: "metric",
      changeUnitButtonName: "change units to us"
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
  mounted() {
    getLikes(this.id).then(likes => (this.likes = likes));
  },
  methods: {
    print: function() {
      console.log(this.id);
    },
    setLikes: function(id, likes) {
      setLikes(id, likes).then(likes => (this.likes = likes));
    },
    showRecipe: function() {
      axios
        .get(
          getWithEndpoint(
            new URL(`${baseRecipiesApiUrl}/${this.id}/analyzedInstructions`)
          )
        )
        .then(response => (this.steps = response.data[0].steps));

      axios
        .get(
          getWithEndpoint(
            new URL(`${baseRecipiesApiUrl}/${this.id}/ingredientWidget.json`)
          )
        )
        .then(response => (this.ingredients = response.data.ingredients));

      this.recipeTitle = this.title;
      this.$refs["recipe-modal"].show();
    },
    hideModal() {
      this.$refs["recipe-modal"].hide();
    },
    changeUnits() {
      if (this.units === "metric") {
        this.units = "us";
        this.changeUnitButtonName = "change units to metric";
      } else {
        this.units = "metric";
        this.changeUnitButtonName = "change units to us";
      }
    }
  }
};
</script>
