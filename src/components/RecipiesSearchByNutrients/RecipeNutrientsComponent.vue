<template>
  <div class="RecipeComponent">
    <b-modal ref="recipe-modal" size="lg" centered hide-footer :title="recipeTitle">
      <div>
        <RecipeDetailComponent
          v-bind:id=this.id
          v-bind:units=this.units
          v-bind:steps=this.steps
          v-bind:ingredients=this.ingredients
          v-bind:image=this.image
        />
        <b-button variant="outline-info" block @click="changeUnits">{{changeUnitButtonName}}</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Close</b-button>
      </div>
    </b-modal>
    <b-card v-bind:title="title"
            v-bind:img-src="imageUrl"
            img-alt="Image"
            img-top
            class="mb-1 mr-1"
            style="min-width: 15rem; max-width: 20rem; height: 37rem" img-height="300rem">
      <!--      <b-img :src="imageUrl" center fluid rounded="10"/>-->
      <b-card-text>
        <p class="information">Calories: {{calories}}</p>
        <p class="information">Carbs: {{carbs}}</p>
        <p class="information">Fat: {{fat}}</p>
        <p class="information">Protein: {{protein}}</p>
      </b-card-text>
      <b-button href="#" variant="primary" style="color: aliceblue" v-on:click="showRecipe">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  import {baseRecipiesApiPhotosUrl, baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'
  import axios from "axios";
  import RecipeDetailComponent from "../shared/RecipeDetailComponent.vue";

  export default {
    components: {RecipeDetailComponent,},
    data() {
      return {
        results: [],
        recipeTitle: "",
        steps: [],
        ingredients: [],
        units: "metric",
        changeUnitButtonName: "change units to us"
      }
    },
    props: {
      id: Number,
      title: String,
      image: String,
      imageUrls: Array,
      calories: Number,
      carbs: String,
      fat: String,
      protein: String
    },
    computed: {
      imageUrl: function () {
        return `${this.image}`
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
      print: function () {
        console.log(this.id)
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
  }
</script>
