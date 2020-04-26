<template>
  <div class="RecipiesByIngredientComponent">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Search Recipes - by ingredients <br></h1>
    <h6 class="text-center font-italic ml-md-10 ">Search recipes by ingredients you have in your fridge! Don't waste
      anything :)</h6>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill ml-2">
        <RecipeSearchByIngredientSearchFormComponent @setRequestUrl="setRequestUrl"/>
      </div>
      <div class="recipes d-flex flex-wrap justify-content-center">
        <div v-if="results.length > 0" class="d-flex flex-wrap justify-content-center">
          <RecipeIngredientsComponent v-for="recipe in results"
            v-bind:title="recipe.title"
            v-bind:id="recipe.id"
            v-bind:usedIngredientCount="recipe.usedIngredientCount"
            v-bind:missedIngredientCount="recipe.missedIngredientCount"
            v-bind:missedIngredients="recipe.missedIngredients"
            v-bind:unusedIngredients="recipe.unusedIngredients"
            v-bind:usedIngredients="recipe.usedIngredients"
            v-bind:image="recipe.image"/>
        </div>
        <div v-else>
          <h4 class="mt-10 ml-10">No recipes found or you have not made a search yet :(</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeSearchByIngredientSearchFormComponent from "./RecipeSearchByIngredientSearchFormComponent";
  import RecipeIngredientsComponent from "./RecipeIngredientsComponent";
  import axios from "axios";

  export default {
    name: 'RecipesByIngredients',
    components: {RecipeSearchByIngredientSearchFormComponent, RecipeIngredientsComponent},
    data() {
      return {
        results: [],
      }
    },
    methods: {
      setRequestUrl: function (url) {
        axios
          .get(url)
          .then(response => {this.results = response.data})
      }
    }
  };
</script>
