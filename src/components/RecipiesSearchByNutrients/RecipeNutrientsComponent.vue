<template>
  <div class="RecipeComponent">
    <b-card v-bind:title="title"
            v-bind:img-src="imageUrl"
            img-alt="Image"
            img-top
            class="mb-1 mr-1"
            style="min-width: 15rem; max-width: 20rem; height: 37rem" img-height="300rem">
      <!--      <b-img :src="imageUrl" center fluid rounded="10"/>-->
      <b-card-text>
        <p class="information">Calories: {{calories}}</p>
        <p class="information">Carbs: {{carbs}}</p>
        <p class="information">Fat: {{fat}}</p>
        <p class="information">Protein: {{protein}}</p>
      </b-card-text>
      <b-button href="#" variant="primary" style="color: aliceblue">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  import {baseRecipiesApiPhotosUrl} from '../../shared/constants'

  export default {
    data() {
      return {
        results: []
      }
    },
    props: {
      id: Number,
      title: String,
      image: String,
      imageUrls: Array,
      calories: Number,
      carbs: String,
      fat: String,
      protein: String
    },
    computed: {
      imageUrl: function () {
        return `${this.image}`
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
      print: function () {
        console.log(this.id)
      }
    }
  }
</script>