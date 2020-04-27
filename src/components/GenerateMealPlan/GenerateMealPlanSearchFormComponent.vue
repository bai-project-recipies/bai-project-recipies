<template>
  <div class="GenerateMealPlanSearchFormComponent ml-md-4">
    <b-button v-b-toggle.filter size="sm" style="min-width: 7rem" variant="primary">
      <b-icon icon="filter-left"/>
      Filter
      <b-icon icon="arrows-collapse"/>
    </b-button>
    <b-collapse visible id="filter" class="mt-2">
      <h4 class="text-center mb-5">Search criteria</h4>

      <b-form class="row justify-content-center" @submit="onSubmit">
        <div id="checkbox-container" class="d-flex flex-wrap flex-column justify-content-center col-12">
          <FormCriteriaCheckBoxComponent id="diet"
                                         :options="supportedDiet"
                                         label="Diet: "
                                         @setSelected="setSelectedDiet"
                                         toggleText="Diet"/>

        </div>

        <b-card>
          <label class="font-weight-bold">Generate plan for</label>
          <b-radio-group v-model="form.timeFrame">
            <b-radio checked="false" value="day">1 day</b-radio>
            <b-radio checked="true" value="week">a week</b-radio>
          </b-radio-group>
        </b-card>

        <b-form-tags input-id="exclude-ingredients"
                     separator=" ,;"
                     placeholder="Exclude ingredients or allergens..."
                     no-add-on-enter
                     v-model="form.exclude"
                     class="mb-2 mt-2"/>

        <b-card id="targetCalories" class="mt-2">
          <label>Target of calories</label>
          <b-form-input id="range-1" v-model="form.targetCalories" type="range" min="1000" max="4000" step="100"/>
          <div class="mt-2">Value: {{ form.targetCalories }}</div>
        </b-card>

        <b-button class="col-12 mt-md-4 mt-sm-2 ml-5" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-collapse>
  </div>
</template>

<script>
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'
  import FormCriteriaCheckBoxComponent from "../shared/FormCriteriaCheckBoxComponent";
  import '../../styles/_RecipeSearchFormComponent.css'

  export default {
    components: {FormCriteriaCheckBoxComponent},
    data() {
      return {
        supportedDiet: ['vegan', 'vegetarian', 'gluten free', 'ketogenic', 'whole30'],
        form: {
          timeFrame: 'week',
          targetCalories: 2000,
          diet: '',
          exclude: [],
        },
      }
    },
    props: {
      baseUrl: String,
    },
    methods: {
      setSelectedDiet: function (value) {
        this.form.diet = value
      },

      onSubmit(evt) {
        this.$emit('setTimeFrame', this.form.timeFrame)
        evt.preventDefault()
        const url = new URL(`https://api.spoonacular.com/mealplanner/generate`);
        url.searchParams.append('timeFrame', this.form.timeFrame);
        url.searchParams.append('targetCalories', this.form.targetCalories);
        url.searchParams.append('diet', this.form.diet);
        url.searchParams.append('exclude', this.form.exclude);

        this.$emit('setRequestUrl', getWithEndpoint(url))
      },
    }
  }
</script>
