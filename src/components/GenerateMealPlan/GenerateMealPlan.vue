<template>
  <div class="GenerateMealPlan">
    <h1 class="mb-3 ml-md-10 mt-md-7 text-center blue--text">Generate you meal plan<br></h1>
    <h6 class="text-center font-italic ml-md-10 ">Generate you meal plan and don't look for your meal yourself! :)</h6>
    <div class="panel d-flex">
      <div class="filter-panel flex-fill">
        <GenerateMealPlanSearchFormComponent @setRequestUrl="setRequestUrl" @setTimeFrame="setTimeFrame"/>
      </div>
      <div class="recipes d-flex flex-wrap justify-content-center" style="width: 100%">
        <div v-if="!isEmpty(results) && results !== undefined" class="d-flex flex-wrap justify-content-center mt-10"
             style="width: 100%">
          <div v-if="timeFrame === 'day'" style="width: 90%">
            <DayMealPlan title="Meal plan for one day - 3 meals" :meals="results.meals" :nutrients="results.nutrients"/>
          </div>

          <div v-else style="width: 90%">
            <WeekMealPlan :week-plan="results.week"/>
          </div>
        </div>
<<<<<<< HEAD
        <div v-else><h4 class="mt-10 ml-10">No meal plans found or you have not generated one yet :(</h4></div>
=======
        <div v-else-if="isLoading" style="margin-top: 1rem; text-align: center;">
          <FetchingData/>
        </div>
        <div v-else style="width: 100%; margin-top: 1rem; text-align: center;">
          <NothingFoundComponent text="No meal plans found or you have not generated one yet :("/>
        </div>
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import GenerateMealPlanSearchFormComponent from "./GenerateMealPlanSearchFormComponent";
  import DayMealPlan from "./DayMealPlan";
  import OneGeneratedMealPlan from "./OneGeneratedMealPlan";
<<<<<<< HEAD
  import WeekMealPlan from "./WeekMealPlan";

  export default {
    name: 'GenerateMealPlan',
    components: {OneGeneratedMealPlan, GenerateMealPlanSearchFormComponent, DayMealPlan, WeekMealPlan},
=======
  import NothingFoundComponent from "../shared/NothingFoundComponent"
  import WeekMealPlan from "./WeekMealPlan";
  import FetchingData from "../shared/FetchingDataComponent";

  export default {
    name: 'GenerateMealPlan',
    components: {OneGeneratedMealPlan, GenerateMealPlanSearchFormComponent, DayMealPlan, WeekMealPlan, FetchingData, NothingFoundComponent},
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
    data() {
      return {
        timeFrame: '',
        results: {},
<<<<<<< HEAD
=======
        isLoading: false,
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
      }
    },
    methods: {
      setTimeFrame: function (timeFrame) {
        this.timeFrame = timeFrame
      },
      setRequestUrl: function (url) {
<<<<<<< HEAD
        axios
          .get(url)
          .then(response => this.results = response.data)
=======
        this.isLoading = true
        axios
          .get(url)
          .then(response => this.results = response.data)
          .then(() => {
            this.isLoading = false
          })
>>>>>>> d08b4e0bc87c1f54307c975e54b8e3ddcc8d7f89
      },
      isEmpty: function (obj) {
        for (let key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
      }
    }
  };
</script>
