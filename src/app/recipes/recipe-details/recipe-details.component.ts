import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../service/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  parameterSubscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.parameterSubscription =  this.route.params.subscribe(
      (parameter: Params) => {
        this.id = +parameter['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }

    );
  }
  /**
   *  @param: none
   *  Adds the ingredients to the shopping cart fur purchase.
   */
  sendtoShoopingList() {
    console.log('adding the recipe items to shopping cart');
    this.recipeService.sendIngreditsToShoppingCart(this.recipe.ingredients);
  }

  /***
   * edits the current recipe.
   */
  editRecipe() {
       this.router.navigate(['edit'], {relativeTo: this.route });
      // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  /**
   *deletes the recipe.
   *
   * @memberof RecipeDetailsComponent
   */
  deleteRecipe() {
    console.log('deleting the recipe.');
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  /**
   *deletes an ingredient off the recipe wih the index provided
   *
   * @param {number} index
   * @memberof RecipeDetailsComponent
   */
  deleteIngredient(index: number ) {

  }
  ngOnDestroy(): void {
      // Called once, before the instance is destroyed.
      // Add 'implements OnDestroy' to the class
      console.log('paramenter unsubscription done. ! ');
      this.parameterSubscription.unsubscribe();
    }
}
