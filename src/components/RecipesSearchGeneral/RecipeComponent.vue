<template>
  <div class="RecipeComponent">
    <b-modal ref="recipe-modal" size="lg" centered hide-footer :title="recipeTitle">
      <div>
        <RecipeDetailComponent
          v-bind:id=this.id
          v-bind:units=this.units
          v-bind:steps=this.steps
          v-bind:ingredients=this.ingredients
          v-bind:image=imageUrl
        />
        <b-button variant="outline-info" block @click="changeUnits">{{changeUnitButtonName}}</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Close</b-button>
      </div>
    </b-modal>
    <b-card v-bind:title="compactTitle"
            v-bind:img-src="imageUrl"
            img-alt="Image"
            img-top
            class="mb-1 mr-1"
            style="min-width: 15rem; max-width: 20rem; height: 37rem"
            img-height="300rem"
            img-width="300rem"
            footer-tag="footer">
      <!--      <b-img :src="imageUrl" center fluid rounded="10"/>-->
      <b-card-text>
        <p class="information">Ready in minutes: {{readyInMinutes}}</p>
        <p class="information">Servings: {{servings}}</p>
        <p class="information">Likes: {{likes}} <button v-on:click="setLikes(id, likes+1)" :disabled="liked"><b-icon :icon="icon" style="color: red;"></b-icon></button></p>
      </b-card-text>
      <template v-slot:footer>
        <b-button href="#" variant="primary" style="color: aliceblue" v-on:click="showRecipe">Go to recipe</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
  import {baseRecipiesApiPhotosUrl, getWithEndpoint, baseRecipiesApiUrl} from '../../shared/constants';
  import {getLikes, setLikes} from '../../shared/DBHandling';
  import RecipeDetailComponent from "../shared/RecipeDetailComponent.vue";
  import axios from "axios";
  export default {
    components: {RecipeDetailComponent,},
    data() {
      return {
        results: [],
        steps: [],
        ingredients: [],
        likes: 0,
        recipeTitle: "",
        units: "metric",
        changeUnitButtonName: "change units to us",
        liked: false
      }
    },
    props: {
      id: Number,
      title: String,
      readyInMinutes: Number,
      servings: Number,
      image: String,
      imageUrls: Array,
    },
    computed: {
      imageUrl: function () {
        return `${baseRecipiesApiPhotosUrl}${this.image}`
      },
      icon: function () {
        if(this.liked){
          return "heart-fill";
        }else{
          return "heart";
        }
      },
      compactTitle: function(){
        let acceptableLength = 45;
        if(this.title.length>acceptableLength){
          return `${this.title.substring(0, acceptableLength-3)}...`;
        }
        return this.title;
      }
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
      setLikes: function(id, likes){
        setLikes(id, likes)
          .then(likes => this.likes = likes);
        this.liked = true;
      },
      showRecipe: function() {
        axios
          .get(
            getWithEndpoint(
              new URL(`${baseRecipiesApiUrl}/${this.id}/analyzedInstructions`)
            )
          )
          .then(response => (this.steps = response.data[0].steps));
        axios
          .get(
            getWithEndpoint(
              new URL(`${baseRecipiesApiUrl}/${this.id}/ingredientWidget.json`)
            )
          )
          .then(response => (this.ingredients = response.data.ingredients));
        this.recipeTitle = this.title;
        this.$refs["recipe-modal"].show();
      },
      hideModal() {
        this.$refs["recipe-modal"].hide();
      },
      changeUnits() {
        if (this.units === "metric") {
          this.units = "us";
          this.changeUnitButtonName = "change units to metric";
        } else {
          this.units = "metric";
          this.changeUnitButtonName = "change units to us";
        }
      }
    }
  }
</script>
