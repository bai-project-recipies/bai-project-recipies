<template>
  <div class="RecipeIngredientsComponent">
    <b-card v-bind:title="title"
            v-bind:img-src="imageUrl"
            img-alt="Image"
            img-top
            class="mb-1 mr-1"
            style="min-width: 15rem; max-width: 20rem; height: 40rem" img-height="300rem">
      <b-card-text>
        <p class="information">Used ingredients count: {{usedIngredientCount}}
          <b-button type="button" disabled class="info" size="sm" data-toggle="tooltip" :title="usedIngredients.map(ing => ing.name).toString()">Show</b-button>
        </p>
        <p class="information">Missed ingredients count: {{missedIngredientCount}}
          <b-button type="button" disabled class="info" size="sm" data-toggle="tooltip" :title="missedIngredients.map(ing => ing.name).toString()">Show</b-button>
        </p>

        <p class="information">Unused ingredients count: {{unusedIngredients.length}}
          <b-button type="button" disabled class="info justify-content-end" size="sm" data-toggle="tooltip" :title="unusedIngredients.map(ing => ing.name).toString()">Show</b-button>
        </p>

        <p class="information mt-2">Likes: {{likes}} <button v-on:click="setLikes(id, likes+1)" :disabled="liked"><b-icon :icon="icon" style="color: red;"></b-icon></button></p>
      </b-card-text>
      <b-button href="#" variant="primary" style="color: aliceblue">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  import {getLikes, setLikes} from '../../shared/DBHandling';

  export default {
    data() {
      return {
        results: [],
        likes: 0,
        liked: false
      }
    },
    props: {
      id: Number,
      title: String,
      usedIngredientCount: Number,
      missedIngredientCount: Number,
      image: String,
      missedIngredients: Array,
      usedIngredients: Array,
      unusedIngredients: Array,
    },
    computed: {
      imageUrl: function () {
        return `${this.image}`
      },
      icon: function () {
        if(this.liked){
          return "heart-fill";
        }else{
          return "heart";
        }
      },
    },
    mounted() {
      getLikes(this.id)
        .then(likes => this.likes = likes);
    },
    created() {
    },
    methods: {
      print: function () {
        console.log(this.id)
      },
      setLikes: function (id, likes) {
        setLikes(id, likes)
          .then(likes => this.likes = likes);
        this.liked = true;
      }
    }
  }
</script>
