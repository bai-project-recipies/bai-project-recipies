import Vue from 'vue';
import Router from 'vue-router';
import Recipes from '../components/RecipesSearchGeneral/RecipiesComponent';
import RecipesByIngredient from '../components/RecipiesSearchByIngredients/RecipesSearchByIngredients';
import GenerateMealPlan from '../components/GenerateMealPlan/GenerateMealPlan';
import RecipesByNutrient from '../components/RecipiesSearchByNutrients/RecipiesSearchByNutrientsComponent';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/bai-project-recipies/',
  routes: [
    {path: '/', name: 'Recipes', component: Recipes},
    {path: '/by-ingredients', name: 'RecipesByIngredients', component: RecipesByIngredient},
    {path: '/by-nutrients', name: 'RecipiesByNutrients', component: RecipesByNutrient},
    {path: '/generate-meal-plan', name: 'RecipesByIngredients', component: GenerateMealPlan}
  ]
});
