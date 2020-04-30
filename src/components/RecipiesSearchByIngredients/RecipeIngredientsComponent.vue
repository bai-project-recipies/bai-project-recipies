<template>
  <div class="RecipeIngredientsComponent">
    <b-modal ref="recipe-modal" size="lg" centered hide-footer :title="recipeTitle">
      <div>
        <RecipeDetailComponent
          v-bind:id=this.id
          v-bind:units=this.units
          v-bind:steps=this.steps
          v-bind:ingredients=this.ingredients
          v-bind:image=this.image
        />
        <b-button variant="outline-info" block @click="changeUnits">{{changeUnitButtonName}}</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Close</b-button>
      </div>
    </b-modal>
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
      <b-button href="#" variant="primary" style="color: aliceblue" v-on:click="showRecipe">Go to recipe</b-button>
    </b-card>
  </div>
</template>

<script>
  import {getLikes, setLikes} from '../../shared/DBHandling';
  import axios from "axios";
  import {baseRecipiesApiUrl, getWithEndpoint} from "../../shared/constants";
  import RecipeDetailComponent from "../shared/RecipeDetailComponent.vue";


  export default {
    components: {RecipeDetailComponent,},
    data() {
      return {
        results: [],
        likes: 0,
        liked: false,
        steps: [],
        ingredients: [],
        recipeTitle: "",
        units: "metric",
        changeUnitButtonName: "change units to us"
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
