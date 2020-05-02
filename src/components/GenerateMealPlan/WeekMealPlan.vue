<template>
  <div class="WeekMealPlan mb-3">
    <h3>Meal plan for one week (3 meals per day)</h3>
    <div v-for="day in daysOfWeek" v-bind:key="day" class="mt-3">
      <b-card :key="day">
        <div class="row">
          <h4 class="col-11">{{day.toLocaleUpperCase()}}</h4>
          <b-button v-b-toggle="day + '-toggle'" class="col-1" size="sm"  variant="primary">Show proposal</b-button>
        </div>

        <b-collapse collapse :id="day + '-toggle'" class="mt-2">
          <DayMealPlan :meals="weekPlan[`${day}`].meals" :nutrients="weekPlan[`${day}`].nutrients"/>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
  import DayMealPlan from "./DayMealPlan";

  export default {
    name: 'OneGeneratedMealPlan',
    components: {DayMealPlan},
    data() {
      return {
        daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        likes: 0
      }
    },
    props: {
      weekPlan: Object,
    },
  };
</script>
