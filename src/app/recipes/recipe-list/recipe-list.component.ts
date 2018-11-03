import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../service/recipe.service';


@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
} )
export class RecipeListComponent implements OnInit, OnDestroy {

  // @Output() recipeSelectedinList = new EventEmitter<Recipe>();

  recipes: Recipe[];
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // get the updated recipe by subscribing to the recipe.
    this.recipeSubscription =  this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  createNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
      console.log(this.route);
      console.log(this.router);
      // here you can check and show if the user is authenticated or not.
      // if not authorized, then will not be seeing the new recipe page.
  }


  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelectedinList.emit(recipe);
  // }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log('unSubscribing to the recipe Subscription ');
    this.recipeSubscription.unsubscribe();
  }
}

