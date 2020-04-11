<template>
  <div class="RecipiesByIngredientComponent">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Search Recipes - by ingredients <br></h1>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill">

      </div>

      <div class="recipes d-flex flex-wrap justify-content-center">

      </div>
    </div>
  </div>
</template>

<script>
  import RecipeSearchFormComponent from './../RecipesSearchGeneral/RecipeSearchFormComponent.vue'

  export default {
    name: 'RecipesByIngredients',
    components: {RecipeSearchFormComponent},
    data() {
      return {
        results: [],
      }
    },
    mounted() {

    },
    methods: {
    }
  };
</script>
