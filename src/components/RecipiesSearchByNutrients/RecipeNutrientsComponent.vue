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
        <p class="information">Likes: {{likes}} <button v-on:click="setLikes(id, likes+1)" :disabled="liked"><b-icon :icon="icon" style="color: red;"></b-icon></button></p>
      </b-card-text>
      <b-button href="#" variant="primary" style="color: aliceblue">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  import {baseRecipiesApiPhotosUrl} from '../../shared/constants'
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
