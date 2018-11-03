
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm, Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // for local reference - uncomment this below line and also in the .html file.
  // @ViewChild('nameInput') nameInputRef: ElementRef;

  // using 2-way ngModel binding.
  // tslint:disable-next-line:no-inferrable-types
  nameInput: string = '';

  @ViewChild('amountInput') amountInputRef: ElementRef;

  // since we have added a service we no longer need to emit the ingredient to be added.
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  // reactive forms to add new ingredient to the recipe book
  // newIngredientsForm: FormGroup;

  // forms
  @ViewChild('recipeForm') recipeForm: NgForm;

  // the following for publisher.

  // tslint:disable-next-line:no-inferrable-types
  editMode: boolean = false;
  editedIngredientIndex: number;
  ingredientSubscription: Subscription;
  editedIngredient: Ingredient;

  @ViewChild('mode') addOrUpdate = 'Add';


  constructor( private shoppingListService: ShoppingListService) {  }
  /**
   *
   * Subscribe to the ingredient index to listen to.
   * set if you are in editMode or not.
   * @memberof ShoppingEditComponent
   */
  ngOnInit() {
      this.ingredientSubscription = this.shoppingListService.ingredientEditing.subscribe(
        (index: number) => {
            this.editedIngredientIndex = index;
            this.editMode = true;
            this.addOrUpdate = 'Update';
            this.editedIngredient = this.shoppingListService.getIngredientFromServiceByIndex(index);
            this.recipeForm.setValue({
              recipeName: this.editedIngredient.name,
              recipeAmount: this.editedIngredient.amount
            });
        }
    );
  }


  // using a click listener insted of fomrs.
  // ----------------------------------------------
  // addToShoppingList() {
  //   const name = this.nameInput;
  //   // const name = this.nameInputRef.nativeElement.value;
  //   const amount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(name, amount);
  //   // we no longer need to emit as we are using serices.
  //   // this.ingredientAdded.emit(newIngredient);
  //   this.shoppingListService.addIngredient(newIngredient);

  //  }

  // adding ingredient to cart using forms.
  // using the viewChild --Note in the form html just have the ngsubmit = addIngredienttoCart() and not pass in the form.
  //  addIngredienttoCart() {
  //    console.log('adding ingredient to cart ');
  //    console.log(this.recipeForm);
  //    const name = this.recipeForm.value.recipeName;
  //    const amount = this.recipeForm.value.recipeAmount;
  //    const newIngredient = new Ingredient(name, amount);
  //    this.shoppingListService.addIngredient(newIngredient);
  //    this.recipeForm.reset();
  //  }

  // without using the @viewChild
  addIngredienttoCart(recipeForm: NgForm) {
    console.log('adding ingredient to cart ');
    console.log(recipeForm);
    const name = recipeForm.value.recipeName;
    const amount = recipeForm.value.recipeAmount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredientinCart(this.editedIngredientIndex, newIngredient);
    } else {
        this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    console.log('edit or add : ' + this.editMode);
    this.recipeForm.reset();
  }

  /**
   *
   * Clearform and also set the EditMode to false;
   * @memberof ShoppingEditComponent
   */
  clearForm() {
    this.recipeForm.reset();
    this.editMode = false;
  }

  /**
   * delete the item off the ingredients array.
   */
  deleteIngredient() {
    console.log(' deleting item off the cart ');
    console.log(' index : ' + this.editedIngredientIndex);
    this.shoppingListService.deleteIngredientOffCart(this.editedIngredientIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log(' unsubscribing to the ingredient index listener ');
    this.ingredientSubscription.unsubscribe();
  }
}


