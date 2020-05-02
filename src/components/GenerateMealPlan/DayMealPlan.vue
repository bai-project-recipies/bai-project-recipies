<template>
  <div class="DayMealPlan mb-3">
    <h3>{{title}}</h3>
    <h5 class="text-info"><b>Nutrients</b></h5>
    <p>
      Calories: {{nutrients.calories}} <br>
      Protein: {{nutrients.protein}} <br>
      Fat: {{nutrients.fat}} <br>
      Carbohydrates: {{nutrients.carbohydrates}}
    </p>
    <div v-for="meal in meals" :key="meal.id">
      <OneGeneratedMealPlan :title="meal.title"
                            :readyInMinutes="meal.readyInMinutes"
                            :servings="meal.servings"
                            :sourceUrl="meal.sourceUrl"
                            :image="meal.image"
                            :id="meal.id"/>
    </div>
  </div>
</template>

<script>
  import OneGeneratedMealPlan from "./OneGeneratedMealPlan";

  export default {
    name: 'DayMealPlan',
    components: {OneGeneratedMealPlan},
    props: {
      meals: Array,
      title: String,
      nutrients: Object,
    }
  };
</script>
