<template>
  <div class="RecipeSearchByIngredientSearchFormComponent ml-md-4 p-1">
    <b-button v-b-toggle.filter size="sm" style="min-width: 7rem" variant="primary">
      <b-icon icon="filter-left"/>Filter<b-icon icon="arrows-collapse"/>
    </b-button>
    <b-collapse visible id="filter" class="mt-2">
      <h4 class="text-center mb-5">Search criteria</h4>

      <b-form class="row justify-content-center" @submit="onSubmit">
        <b-form-tags input-id="ingredients"
                     separator=" ,;"
                     placeholder="Ingredients..."
                     no-add-on-enter
                     v-model="form.ingredients"
                     class="mb-2 mt-2"/>

        <b-card>
          <label class="font-weight-bold">Choose whether to maximize used ingredients or minimize missing ingredients first.</label>
          <b-radio-group v-model="form.ranking">
            <b-radio checked="true" value="1">Maximize used ingredients</b-radio>
            <b-radio checked="false" value="2">Minimize missing ingredients first</b-radio>
          </b-radio-group>
        </b-card>

        <div class="custom-control custom-switch ml-2 mt-2">
          <input type="checkbox" class="custom-control-input" id="pantrySwitch" v-model="form.pantry">
          <label class="custom-control-label" for="pantrySwitch">Do you want to ignore typical pantry items, such as
            water, salt, flour, etc. ?</label>
        </div>

        <b-card id="recipes-number" class="mt-2">
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
  import FormCriteriaCheckBoxComponent from "../shared/FormCriteriaCheckBoxComponent.vue";
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'

  export default {
    components: {FormCriteriaCheckBoxComponent},
    data() {
      return {
        form: {
          ingredients: [],
          number: 30,
          ranking: 1,
          pantry: true,
        },
      }
    },
    props: {
      baseUrl: String,
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const url = new URL(`${baseRecipiesApiUrl}/findByIngredients`);
        url.searchParams.append('number', this.form.number);
        url.searchParams.append('ranking', this.form.ranking);
        url.searchParams.append('ignorePantry', this.form.pantry);
        url.searchParams.append('ingredients', this.form.ingredients);

        this.$emit('setRequestUrl', getWithEndpoint(url))
      },
    }
  }
</script>
