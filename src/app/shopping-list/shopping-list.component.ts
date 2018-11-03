import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shoppingSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientsFromService();
    this.shoppingSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  /**
   * using observables to observe the next index when changed. emit.()
   * @param index
   */
  editIngredientIteminCart(index: number) {
      console.log(`requesting service to get the ingredient at index : ${index}`);
      this.shoppingListService.ingredientEditing.next(index);
  }

  revertEditModeToAdd() {
    // tslint:disable-next-line:max-line-length
    console.log('>>this is a place where improvements can be made - make editmode to false, also check for clicked and mouseOut should leave to editmode to true ');
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log(' Unsubscribing to the shopping list which adds ingredients to it. ');
    this.shoppingSubscription.unsubscribe();
  }

}
