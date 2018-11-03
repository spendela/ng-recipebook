import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Subject } from 'rxjs';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping-list/service/shopping-list.service';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  isHttpServiceAvailable = false;

  constructor(private shoppingListService: ShoppingListService, private http: Http) {}

  private recipes: Recipe[] = [

    // tslint:disable-next-line:max-line-length
    new Recipe( 'Blueberry cake',
                'sweet french dish',
                'http://www.bakespace.com/images/large/ae6c6afe57a7987db3fabf0788d4706b.jpeg',
                [
                  new Ingredient('Cheese ', 2),
                  new Ingredient('blueberry', 20),
                  new Ingredient('bread', 2)
                ]
                ),
    // tslint:disable-next-line:max-line-length
    new Recipe( 'Tasty schnitzel',
                'Austrian fav dish',
                'https://www.dessertfortwo.com/wp-content/uploads/2014/12/Schnitzel-2.jpg',
                [ new Ingredient('Chicken', 2), new Ingredient('Lemon', 1)]
              ),
    new Recipe( 'Hyderabadi biryani', 'south indian fav.',
                'http://www.cooktube.in/wp-content/uploads/2016/10/vegetable-biryani-1.jpg',
                [new Ingredient('Chicken', 1), new Ingredient('Rice', 2)]
              ),
    new Recipe('Chipotle Burrito', 'No Words, Just YUM! ',
               'https://livekindlyproduction-8u6efaq1lwo6x9a.stackpathdns.com/wp-content/uploads/2018/07/chipotle-vegan-option.jpg',
               [ new Ingredient('Bread', 1), new Ingredient('Chicken', 1), new Ingredient('Gauc', 1), new Ingredient('Cheese', 1) ]
               ),
    new Recipe('jalapeno poppers', 'New all time fav in JIB',
               'https://images-gmi-pmc.edge-generalmills.com/a2dfa61a-20f1-4b33-a94d-eaca2f5fb6fb.jpg',
               [ new Ingredient('Cheese', 2), new Ingredient('jalapenos', 10), new Ingredient('Butter', 2)]
              )
  ];

  // this is a valid way to store the recipes to the db.
  // saveRecipeNIngredientsToFireBase() {
  //     return this.http.put('https://sree-angular-recipebook.firebaseio.com/recipes.json', this.recipes);
  // }


  /**
   *this is called from the header section where we get the data from firebase.
   *
   * @param {Recipe[]} recipes
   * @memberof RecipeService
   */
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

/**
 * gets a copy of the recipes array object.
 */
  getRecipes() {
    return this.recipes.slice();
  }
  /**
   *@param: ingredients[] Array to the Shopping cart.
   * Sends
   */
  sendIngreditsToShoppingCart(ingredients: Ingredient[]) {
    console.log('adding ingredients from recipe');
    this.shoppingListService.addIngredientsArrayFromRecipe(ingredients);
  }

  /**
   *get a specific recipe at the particular index
   *
   * @param {number} index
   * @returns
   * @memberof RecipeService
   */
  getRecipe(index: number) {
      return this.recipes[index];
  }

  /**
   *
   *
   *adds a new ingredient to the existing recipe.
   * @param {number} index
   * @param {Recipe} newRecipe
   * @memberof RecipeService
   */
  addOrUpdateIngredientToRecipe(index: number, newRecipe: Recipe) {
    console.log(' in the recipe service, adn adding index : ' + index);
    console.log(newRecipe);
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
  }

  /**
   *adds a new Recipe to the existing list of Recipes.
   *
   * @param {Recipe} recipe
   * @memberof RecipeService
   */
  addNewRecipe(recipe: Recipe) {
    console.log('in recipeservice : adding new recipe ');
    console.log(recipe);
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * deletes a recipe at the particular index.
   * @param index
   */
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
