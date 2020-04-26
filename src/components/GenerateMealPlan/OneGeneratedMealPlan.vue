<template>
  <div class="OneGeneratedMealPlan mb-3">
    <b-card v-bind:title="title">
      <b-card-text>
        <p>Ready in minutes: {{readyInMinutes}} <br>
          Servings: {{servings}} <br>
          Source url: <a :href="sourceUrl">{{sourceUrl}}</a>
        </p>
      </b-card-text>
      <b-button href="#" variant="primary" style="color: aliceblue">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'OneGeneratedMealPlan',
    data() {
      return {
        likes: 0
      }
    },
    props: {
      id: Number,
      title: String,
      readyInMinutes: Number,
      servings: Number,
      sourceUrl: String,
    },
    mounted() {
    },
  };
</script>
