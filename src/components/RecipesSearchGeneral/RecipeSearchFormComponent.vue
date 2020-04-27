<template>
  <div class="RecipeSearchFormComponent ml-md-4">
    <b-button v-b-toggle.filter size="sm" style="min-width: 7rem" variant="primary">
      <b-icon icon="filter-left"/> Filter <b-icon icon="arrows-collapse"/>
    </b-button>
    <b-collapse visible id="filter" class="mt-2">
      <h4 class="text-center mb-5">Search criteria</h4>

      <b-form-input v-model="form.query" id="query" type="text" placeholder="Enter specific meal or leave (e.x. burger)"/>
      <b-form class="row justify-content-center" @submit="onSubmit">
        <div id="checkbox-container" class="d-flex flex-wrap flex-column justify-content-center col-12">
          <FormCriteriaCheckBoxComponent id="cuisine"
                                         :options="supportedCuisines"
                                         label="Cuisine: "
                                         toggleText="Cuisine"
                                         @setSelected="setSelectedCuisine"/>
          <FormCriteriaCheckBoxComponent id="diet"
                                         :options="supportedDiet"
                                         label="Diet: "
                                         @setSelected="setSelectedDiet"
                                         toggleText="Diet"/>
          <FormCriteriaCheckBoxComponent id="intolerances"
                                         :options="supportedIntolerances"
                                         label="Intolerances: "
                                         @setSelected="setSelectedIntolerates"
                                         toggleText="Intolerances"/>
        </div>

        <b-form-tags input-id="exclude-ingredients"
                     separator=" ,;"
                     placeholder="Exclude ingredients..."
                     no-add-on-enter
                     v-model="form.excludeIngredients"
                     class="mb-2 mt-2"/>

        <b-card id="recipes-number">
          <label>Number of recipes</label>
          <b-form-input id="range-1" v-model="form.number" type="range" min="1" max="100" step="1"/>
          <div class="mt-2">Value: {{ form.number }}</div>
        </b-card>

        <b-button class="col-12 mt-md-4 mt-sm-2 ml-5" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-collapse>
  </div>
</template>

<script>
  import '../../styles/_RecipeSearchFormComponent.css'
  import FormCriteriaCheckBoxComponent from "../shared/FormCriteriaCheckBoxComponent.vue";
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'

  export default {
    components: {FormCriteriaCheckBoxComponent},
    data() {
      return {
        supportedCuisines: ['african', 'american', 'british', 'caribbean', 'chinese', 'european',
          'french', 'german', 'indian', 'irish', 'italian', 'japanese', 'korean', 'jewish', 'mexican',
          'spanish', 'thai', 'vietnamese'],
        supportedDiet: ['vegan', 'vegetarian', 'gluten free', 'ketogenic', 'whole30'],
        supportedIntolerances: ['dairy', 'egg', 'gluten', 'peanut', 'seafood', 'shellfish', 'soy'],
        form: {
          query: '',
          intolerances: [],
          diet: [],
          cuisine: [],
          excludeIngredients: [],
          number: 30,
        },
      }
    },
    props: {
      baseUrl: String,
    },
    methods: {
      setSelectedCuisine: function (value) {
        this.form.cuisine = value
      },
      setSelectedDiet: function (value) {
        this.form.diet = value
      },
      setSelectedIntolerates: function (value) {
        this.form.intolerances = value
      },

      onSubmit(evt) {
        evt.preventDefault()
        const url = new URL(`${baseRecipiesApiUrl}/search/`);
        url.searchParams.append('number', this.form.number);
        url.searchParams.append('query', this.form.query);
        url.searchParams.append('cuisine', this.form.cuisine);
        url.searchParams.append('diet', this.form.diet);
        url.searchParams.append('excludeIngredients', this.form.excludeIngredients);
        url.searchParams.append('intolerances', this.form.intolerances);

        this.$emit('setRequestUrl', getWithEndpoint(url))
      },
    }
  }
</script>
