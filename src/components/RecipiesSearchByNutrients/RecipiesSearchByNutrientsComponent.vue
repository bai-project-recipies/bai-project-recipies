<template>
  <div class="RecipiesComponent">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Search Recipes - nutrients <br></h1>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill">
        <RecipeSearchFormComponent @setRequestUrl="setRequestUrl"/>
      </div>
      <div class="recipes d-flex flex-wrap justify-content-center mt-5" style="width: 90%">
        <div v-if="results.length> 0" class="d-flex flex-wrap justify-content-center">
          <RecipeComponent v-for="recipe in results"
                           v-bind:title="recipe.title"
                           v-bind:id="recipe.id"
                           v-bind:calories="recipe.calories"
                           v-bind:carbs="recipe.carbs"
                           v-bind:fat="recipe.fat"
                           v-bind:sugar="recipe.sugar"
                           v-bind:protein="recipe.protein"
                           v-bind:image="recipe.image"
                           v-bind:imageUrls="recipe.imageUrls"/>
        </div>
        <div v-else-if="isLoading" style="margin-top: 1rem; text-align: center;">
          <FetchingData/>
        </div>
        <div v-else style="width: 100%; margin-top: 1rem; text-align: center;">
          <NothingFoundComponent text="No recipes found or you have not made a search yet :("/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeComponent from "./RecipeNutrientsComponent";
  import NothingFoundComponent from "../shared/NothingFoundComponent";
  import RecipeSearchFormComponent from './RecipeSearchByNutrientsSearchFormComponent.vue'
  import FetchingData from "../shared/FetchingDataComponent";
  import '../../styles/_RecipesComponent.css'
  import axios from 'axios';

  export default {
    name: 'RecipesByNutrients',
    components: {RecipeComponent, RecipeSearchFormComponent, FetchingData, NothingFoundComponent},
    data() {
      return {
        results: [],
        isLoading: false,
      }
    },
    methods: {
      setRequestUrl: function (url) {
        this.isLoading = true
        axios
          .get(url)
          .then(response => {
            console.log(response);
            this.results = response.data;
          })
          .then(() => {
            this.isLoading = false
          })
      }
    }
  };
</script>
