import Vue from 'vue';
import Router from 'vue-router';
import Recipes from '../components/RecipesSearchGeneral/RecipiesComponent';
import RecipesByIngredient from '../components/RecipiesSearchByIngredients/RecipesSearchByIngredients';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Recipes', component: Recipes},
    {path: '/by-ingredients', name: 'RecipesByIngredients', component: RecipesByIngredient}
  ]
});
