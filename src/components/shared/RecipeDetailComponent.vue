<template>
  <div class="RecipeDetailComponent">
    <div v-if="this.steps" class="d-block text-left">
      <div style="display: flex; justify-content: space-between">
        <div>
          <h5>You will need:</h5>
          <ul v-if="this.units === 'metric'" id="ingridients" style="list-style-type:none; margin-left: 1rem">
            <li v-for="el in this.ingredients" :key="el">
              {{ el.amount.metric.value }} {{ el.amount.metric.unit }} of
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on"><b>{{ el.name }}</b></span>
                </template>
                <IngredientsGroceriesComponent
                  v-bind:ingredient=el.name
                />
              </v-tooltip>
            </li>
          </ul>
          <ul v-if="this.units === 'us'" id="ingridients" style="list-style-type:none; margin-left: 1rem">
            <li v-for="el in this.ingredients" :key="el">
              {{ el.amount.us.value }} {{ el.amount.us.unit }} of
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on"><b>{{ el.name }}</b></span>
                </template>
                <IngredientsGroceriesComponent
                  v-bind:ingredient=el.name
                />
              </v-tooltip>
            </li>
          </ul>
        </div>
        <img v-bind:src=this.image height="200rem" style="float: right; margin-top: 1rem; margin-right: 1rem">
      </div>
      <h5>All you have to do is:</h5>
      <ul id="steps" style="list-style-type:none; margin-left: 1rem">
        <li v-for="el in this.steps" :key="el">
          <b>{{el.number}}</b>
          : {{ el.step }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VTitle from 'v-title';
  import IngredientsGroceriesComponent from "./IngredientsGroceriesComponent.vue";

  export default {
    directives: {
      VTitle
    },
    components: {IngredientsGroceriesComponent,},
    data() {
      return {};
    },
    props: {
      id: Number,
      units: String,
      steps: Array,
      ingredients: Array,
      image: String,
    },
    computed: {
    },
    mounted(){},
    methods: {}
  };
</script>
