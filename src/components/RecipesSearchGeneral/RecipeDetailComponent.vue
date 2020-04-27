<template>
  <div class="RecipeDetailComponent">
    <div v-if="this.steps" class="d-block text-left">
      <div style="display: flex; justify-content: space-between">
        <div>
          <h5>You will need:</h5>
          <ul v-if="this.units === 'metric'" id="ingridients" style="list-style-type:none; margin-left: 1rem">
            <li v-for="el in this.ingredients" :key="el">
              {{ el.amount.metric.value }} {{ el.amount.metric.unit }} of
              <b>{{ el.name }}</b>
            </li>
          </ul>
          <ul v-if="this.units === 'us'" id="ingridients" style="list-style-type:none; margin-left: 1rem">
            <li v-for="el in this.ingredients" :key="el">
              {{ el.amount.us.value }} {{ el.amount.us.unit }} of
              <b>{{ el.name }}</b>
            </li>
          </ul>
        </div>
        <img v-bind:src=imageUrl height="200rem" style="float: right; margin-top: 1rem; margin-right: 1rem">
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
  import {baseRecipiesApiPhotosUrl} from '../../shared/constants';
  export default {
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
      imageUrl: function () {
        return `${baseRecipiesApiPhotosUrl}${this.image}`
      }
    },
    mounted(){},
    methods: {}
  };
</script>
