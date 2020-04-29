<template>
  <div class="RecipiesComponent">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Search Recipes - fast search <br></h1>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill">
        <RecipeSearchFormComponent @setRequestUrl="setRequestUrl"/>
      </div>
      <div class="recipes d-flex flex-wrap justify-content-center mt-5" style="width: 100%">
        <div v-if="results.length > 0" class="d-flex flex-wrap justify-content-center">
          <RecipeComponent v-for="recipe in results"
                           v-bind:key="recipe.id"
                           v-bind:title="recipe.title"
                           v-bind:id="recipe.id"
                           v-bind:readyInMinutes="recipe.readyInMinutes"
                           v-bind:servings="recipe.servings"
                           v-bind:image="recipe.image"
                           v-bind:imageUrls="recipe.imageUrls"/>
        </div>
        <div v-else-if="isLoading" style="margin-top: 1rem; text-align: center; width: 100%">
          <FetchingData/>
        </div>
        <div v-else style="margin-top: 1rem; text-align: center;">
         <NothingFoundComponent text="Unfortunately we have not found cuisine for you, maybe try something else?"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeComponent from "./RecipeComponent";
  import RecipeSearchFormComponent from './RecipeSearchFormComponent.vue'
  import '../../styles/_RecipesComponent.css'
  import axios from 'axios';
  import NothingFoundComponent from "../shared/NothingFoundComponent";
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'
  import FetchingData from "../shared/FetchingDataComponent";

  export default {
    name: 'Recipes',
    components: {RecipeComponent, RecipeSearchFormComponent, NothingFoundComponent, FetchingData},
    data() {
      return {
        results: [],
        isLoading: false,
      }
    },
    mounted() {
      this.isLoading = true
      axios
        .get(getWithEndpoint(new URL(`${baseRecipiesApiUrl}/search/`)))
        .then(response => this.results = response.data.results)
        .then(() => {
          this.isLoading = false
        })
    },
    methods: {
      setRequestUrl: function (url) {
        this.isLoading = true
        axios
          .get(url)
          .then(response => this.results = response.data.results)
          .then(() => {
            this.isLoading = false
          })
      }
    }
  };
</script>
