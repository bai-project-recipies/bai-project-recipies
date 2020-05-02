<template>
  <div class="OneGeneratedMealPlan mb-3">
<<<<<<< HEAD
=======
    <b-modal ref="recipe-modal" size="lg" centered hide-footer :title="recipeTitle">
      <div>
        <RecipeDetailComponent
          v-bind:id=this.id
          v-bind:units=this.units
          v-bind:steps=this.steps
          v-bind:ingredients=this.ingredients
          v-bind:image=imageUrl
        />
        <b-button variant="outline-info" block @click="changeUnits">{{changeUnitButtonName}}</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Close</b-button>
      </div>
    </b-modal>
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
    <b-card v-bind:title="title">
      <b-card-text>
        <p>Ready in minutes: {{readyInMinutes}} <br>
          Servings: {{servings}} <br>
          Source url: <a :href="sourceUrl">{{sourceUrl}}</a>
        </p>
      </b-card-text>
<<<<<<< HEAD
      <b-button href="#" variant="primary" style="color: aliceblue">Go to recipe</b-button>
=======
      <b-button href="#" variant="primary" style="color: aliceblue" v-on:click="showRecipe">Go to recipe</b-button>
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
    </b-card>
  </div>
</template>

<script>
<<<<<<< HEAD
  export default {
    name: 'OneGeneratedMealPlan',
    data() {
      return {
        likes: 0
=======
  import {setLikes} from "../../shared/DBHandling";
  import axios from "axios";
  import {baseRecipiesApiPhotosUrl, baseRecipiesApiUrl, getWithEndpoint} from "../../shared/constants";
  import RecipeDetailComponent from "../shared/RecipeDetailComponent";

  export default {
    components: {RecipeDetailComponent,},
    name: 'OneGeneratedMealPlan',
    data() {
      return {
        likes: 0,
        steps: [],
        ingredients: [],
        recipeTitle: "",
        units: "metric",
        changeUnitButtonName: "change units to us"
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
      }
    },
    props: {
      id: Number,
      title: String,
      readyInMinutes: Number,
      servings: Number,
      sourceUrl: String,
<<<<<<< HEAD
    },
    mounted() {
    },
=======
      image: String,
    },
    computed: {
      imageUrl: function () {
        return `${baseRecipiesApiPhotosUrl}${this.image}`
      }
    },
    mounted() {
    },
    methods: {
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
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
  };
</script>
