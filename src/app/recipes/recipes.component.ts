import { Component, OnInit } from '@angular/core';

import { RecipeService } from './service/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // tslint:disable-next-line:comment-format
  // if we have this here, whwn we nagivate waay from recipe to shopping, we, get a new recipeservice instance object.
  // so we need to have it in the app modules.
  // providers : [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  // getRecipeSelected(recipe) {
  //   this.selectedRecipe = recipe;
  // }
}
