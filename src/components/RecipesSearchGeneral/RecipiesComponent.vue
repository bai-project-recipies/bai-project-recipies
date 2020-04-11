<template>
  <div class="RecipiesComponent">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Search Recipes - fast search <br></h1>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill">
        <RecipeSearchFormComponent @setRequestUrl="setRequestUrl"/>
      </div>
      <div class="recipes d-flex flex-wrap justify-content-center">
        <div v-if="results.length> 0" class="d-flex flex-wrap justify-content-center">
          <RecipeComponent v-for="recipe in results"
                           v-bind:title="recipe.title"
                           v-bind:id="recipe.id"
                           v-bind:readyInMinutes="recipe.readyInMinutes"
                           v-bind:servings="recipe.servings"
                           v-bind:image="recipe.image"
                           v-bind:imageUrls="recipe.imageUrls"/>
        </div>
        <div v-else><h4 class="mt-10 ml-10">No recipes found</h4></div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeComponent from "./RecipeComponent";
  import RecipeSearchFormComponent from './RecipeSearchFormComponent.vue'
  import '../../styles/_RecipesComponent.css'
  import axios from 'axios';
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'

  export default {
    name: 'Recipes',
    components: {RecipeComponent, RecipeSearchFormComponent},
    data() {
      return {
        results: [],
      }
    },
    mounted() {
      axios
        .get(getWithEndpoint(new URL(`${baseRecipiesApiUrl}/search/`)))
        .then(response => this.results = response.data.results)
    },
    methods: {
      setRequestUrl: function (url) {
        axios
          .get(url)
          .then(response => this.results = response.data.results)
      }
    }
  };
</script>
