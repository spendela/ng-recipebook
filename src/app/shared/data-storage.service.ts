
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, pipe, combineLatest } from 'rxjs';
import { AuthService } from './../auth/auth.service';

import { RecipeService } from './../recipes/service/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/service/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService ) {}

  /**
   *stora the recipes to the Database.
   *
   * @returns Observable<>
   * @memberof DataStorageService
   */
  storeRecipesToDB() {
    const token = this.authService.getAuthToken();
    // console.log(token);
    // tslint:disable:max-line-length
    // this.http.put('https://sree-angular-recipebook.firebaseio.com/recipes.json', this.recipeService.getRecipes());

    // you dont need an array of observables if you want to hit just one table.
    let responseObservable: Observable<any>[] = [];
    responseObservable.push(this.http.put('https://sree-angular-recipebook.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes()));

    responseObservable.push(this.http.put('https://sree-angular-recipebook.firebaseio.com/ingredients.json?auth=' + token, this.shoppingListService.getIngredientsFromService()));
    return combineLatest(responseObservable);


  }

  getRecipesFromDB() {
    const token = this.authService.getAuthToken();
    console.log(token);
    return this.http.get('https://sree-angular-recipebook.firebaseio.com/recipes.json?auth=' + token).pipe(map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();

        return recipes;
      }
    )).pipe(catchError((error: Response) => {
      console.log(error);
      return throwError('error found');
    }));
  }

/**
 *this is to get an array of observables and to let the calling function handle the functionality
 *
 * @returns
 * @memberof DataStorageService
 */
getRecipesNIngredientsFromDB() {
    console.log(' in the db access request file');
    let responseObservable: Observable<any>[]  = [];


    // responseObservable[0] = this.http.get('https://sree-angular-recipebook.firebaseio.com/recipes.json').pipe(map(
    //   (response: Response) => {
    //       const recipes: Recipe[] = response.json();
    //       recipeNIngredient.push(recipes);
    //   }
    // )).pipe(catchError((error: Response) => {
    //   console.log(error);
    //   return throwError('error found');
    // }));

    // responseObservable[1] = this.http.get('https://sree-angular-recipebook.firebaseio.com/ingredients.json').pipe(map(
    //   (response: Response) => {
    //       const ingredients: Ingredient[] = response.json();
    //       recipeNIngredient.push(ingredients);
    //   }
    // )).pipe(catchError((error: Response) => {
    //   console.log(error);
    //   return throwError('error found');
    // }));

    responseObservable[0] = this.http.get('https://sree-angular-recipebook.firebaseio.com/recipes.json');
    responseObservable[1] = this.http.get('https://sree-angular-recipebook.firebaseio.com/ingredients.json');
    return combineLatest(responseObservable);

  }

  /**
   *set the recipes and ingredients to the respective places.
   *
   * @memberof DataStorageService
   */
  getAllMyRI() {
    console.log(' i am here in request to all RI');
    const token = this.authService.getAuthToken();
    // console.log(token);
    this.http.get('https://sree-angular-recipebook.firebaseio.com/recipes.json?auth=' + token).subscribe(
      (response: Response) => {
        const recipes = response.json();
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      },
      error => console.log(' error retriving recipes : ' + error)
    );

    this.http.get('https://sree-angular-recipebook.firebaseio.com/ingredients.json?auth=' + token).subscribe(
      (response: Response) => {
        const ingredients = response.json();
        console.log(ingredients);
        this.shoppingListService.setIngredients(ingredients);
      },
      (error) => {
        console.log(' error retriving ingredients ' + error);
      }
    );
  }
}

// https://stackoverflow.com/questions/45814808/multiple-sequential-api-calls-in-angular-4

