<template>
  <div class="RecipeSearchFormComponent ml-md-4">
    <b-button v-b-toggle.filter size="sm" style="min-width: 7rem" variant="primary">
      <b-icon icon="filter-left"/> Filter <b-icon icon="arrows-collapse"/>
    </b-button>
    <b-collapse visible id="filter" class="mt-2">
      <h4 class="text-center mb-5">Search criteria</h4>
        <b-alert v-model="noNutrientsError" variant="danger" dismissible>No nutrients have been selected!</b-alert>
      <b-form class="row justify-content-center" @submit="onSubmit">
        <b-button class="mb-3" v-b-toggle.nutrient-container size="sm" style="min-width: 7rem" variant="primary" block>
          <b-icon icon="filter-left"/> Nutrients <b-icon icon="arrows-collapse"/>
        </b-button>
        <b-collapse id="nutrient-container" class="mt-2">
          <span v-for="nutrient in form.nutrientValues" v-bind:key="nutrient['key']">
            <b-row>
              <b-col sm="6">
                <label>{{nutrient['key']}}</label>
              </b-col>
              <b-col sm="6">
                <b-form-input v-model="nutrient.value" type="number" placeholder="-"/>
              </b-col>
            </b-row>
          </span>
        </b-collapse>
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
  import {baseRecipiesApiUrl, getWithEndpoint} from '../../shared/constants'

  export default {
    data() {
      return {
        noNutrientsError: false,
        form: {
          selectedNutrients: [],
          nutrientValues: [
            {key: 'minCarbs', value: ''},
            {key: 'maxCarbs', value: ''},
            {key: 'minProtein', value:''},
            {key: 'maxProtein', value: ''},
            {key: 'minCalories', value:''},
            {key: 'maxCalories', value: ''},
            {key: 'minFat', value:''},
            {key: 'maxFat', value: ''},
            {key: 'minCholesterol', value:''},
            {key: 'maxCholesterol', value: ''},
            {key: 'minSugar', value:''},
            {key: 'maxSugar', value: ''},
          ],
          number: 30,
        },
      }
    },
    props: {
      baseUrl: String,
    },
    methods: {

      onSubmit(evt) {
        evt.preventDefault()
        const url = new URL(`${baseRecipiesApiUrl}/findByNutrients/`);
        let searchParams = 0;
        for(let nutrient in this.form.nutrientValues){
          if(this.form.nutrientValues[nutrient].value){
            url.searchParams.append(this.form.nutrientValues[nutrient].key, this.form.nutrientValues[nutrient].value);
            searchParams += 1;
          }
        }
        url.searchParams.append('number', this.form.number);
        if(searchParams>0){
          this.$emit('setRequestUrl', getWithEndpoint(url))
        }else{
          this.noNutrientsError = true;
        }

      },
    }
  }
</script>
