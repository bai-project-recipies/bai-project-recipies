<template>
  <div class="IngredientsGroceriesComponent">
    <ul v-if="this.products.length > 0" id="products">
      <li v-for="el in this.products" :key="el">
        {{el.title}}
      </li>
    </ul>
    <span v-if="this.products.length === 0">No data</span>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseRecipiesApiUrl, getWithEndpoint} from "../../shared/constants";

  export default {
    data() {
      return {
        products: []
      };
    },
    props: {
      ingredient: String
    },
    computed: {},
    mounted: function () {
      const url = new URL(`https://api.spoonacular.com/food/ingredients/map`);
      let ingredients = [this.ingredient];

      axios
        .post(getWithEndpoint(url), {
          'ingredients': ingredients,
          'servings': 1
        })
        .then(response => (this.products = response.data[0].products));
    },
    methods: {}
  };
</script>
