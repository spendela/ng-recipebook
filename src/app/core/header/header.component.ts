import { Response } from '@angular/http';
import { Component } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../../recipes/recipe.model';
import { ShoppingListService } from './../../shopping-list/service/shopping-list.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from 'src/app/recipes/service/recipe.service';

@Component({
  selector : 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //     this.featureSelected.emit(feature);
  // }

  // constructor(private recipeSerivce: RecipeService ) {}
  constructor(private dataStorage: DataStorageService,
              private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private authService: AuthService) {}


  saveRecipesNIngredientstoServicetoFireBase() {
    console.log(' saving to db');
    // this.recipeSerivce.saveRecipeNIngredientsToFireBase().subscribe(

      this.dataStorage.storeRecipesToDB().subscribe(
      (responses: Response[]) => {
        for (const eachResponse of responses) {
            console.log('successfully saved to DB');
            console.log(eachResponse.json());
        }
      },
      (error) => {
        console.log(' errror posted while saving to db ' + error);
      }
    );
  }

  /***
   * different ways to fetch the data from firebase.
   */
  fetchRecipesfromFireBase() {
    console.log(' pinging datastorage to get recipes from DB');
    //  this.dataStorage.getRecipesFromDB().subscribe(

    // this.dataStorage.getRecipesNIngredientsFromDB().subscribe(
    //   (responses: Response[]) => {
    //       const recipes: Recipe[] = responses[0].json();
    //       const ingredients: Ingredient[] = responses[1].json();
    //       console.log(recipes);
    //       console.log(ingredients);
    //       this.recipeService.setRecipes(recipes);
    //       this.shoppingListService.setIngredients(ingredients);
    //   },
    //   (error) => {
    //     console.log(' errror posted while saving to db ' + error);
    //   }
    // );

    this.dataStorage.getAllMyRI();
  }

  /**
   *
   *Logout the user.
   * @memberof HeaderComponent
   */
  logoutUser() {
    this.authService.logout();
  }

  isUsercheckAuthServiceAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
