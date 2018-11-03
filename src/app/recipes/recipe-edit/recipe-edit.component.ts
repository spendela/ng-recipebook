
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription, Observer, Observable } from 'rxjs';
import { RecipeService } from './../service/recipe.service';
import { CanComponentDeactivate } from './../service/can-deactivate.guard.service';

import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  // tslint:disable:no-inferrable-types
  id: number;
  editMode: boolean = false;
  numberOfIngredients: number;
  parameterSubscription: Subscription;
  newIngredientsForm: FormGroup;
  changesSaved: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.parameterSubscription = this.route.params.subscribe(
      (parameter: Params) => {
        this.id = +parameter['id'];
        // this.editMode = parameter['id'] != null ;
        // same as above.

        this.editMode = parameter['id'] !== undefined ? true : false;
        // console.log(this.editMode);
        // // we have an id which the user types but there is no  recipe, then we have to show new recipe page.
        // if (this.recipeService.getRecipe(this.id) === undefined) {
        //   // this.router.navigate(['../../new'], {relativeTo: this.route});
        //   this.editMode = false;
        // }

        console.log('parameter is : ' + parameter['id']);
        console.log('editMode is : ' + this.editMode);
        this.initilizeForm();


      }
    );

  }

  private initilizeForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // let recipeIngredients = new FormArray([]);
    let recipeIngredients = this.formBuilder.array([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log(recipe);
      // console.log(recipe.ingredients.length);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // here we have deleted all the ingredients or there are no ingredients. so the
      // ingredients array is null or isn't defined.
      if (recipe.ingredients === null || recipe.ingredients === undefined ) {
        this.numberOfIngredients = 0;
        recipe.ingredients = [];
      } else {
        this.numberOfIngredients = recipe.ingredients.length;
      }
      console.log(recipe.ingredients.length);
      console.log(' recipe.ingredients : ');
      // if (recipe.ingredients) { //['ingredients']) {
        if (recipe['ingredients']) {
        console.log(recipe.ingredients);
        for (let ingredient of recipe.ingredients) {
          // console.log('-----');
          console.log(ingredient);
          recipeIngredients.push(
            this.formBuilder.group({
              'name': [ingredient.name, Validators.required],
              'amount': [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ] ]
            })

            //  new FormGroup({
            //   'newIngredientForRecipeName': new FormControl(ingredient.name),
            //   'newIngredientForRecipeQuantity': new FormControl(ingredient.amount)
            // })
          );
        }
      }
    }

    this.newIngredientsForm = this.formBuilder.group({
      // 'newRecipeName': new FormControl(recipeName),
      // 'newRecipeImagePath': new FormControl(recipeImagePath), //, Validators.required),
      // 'newRecipeDescription': new FormControl(recipeDescription),
      // 'ingredients':  recipeIngredients
      'name': [recipeName, Validators.required],
      'imagePath': [recipeImagePath,  Validators.required], //, Validators.required),
      'description': [recipeDescription, Validators.required],
      'ingredients':  recipeIngredients

    });
  }

  get allMyIngredients() {
    return this.newIngredientsForm.get('ingredients') as FormArray;
  }

  addNewRecipeToReceipeBook() {
    this.changesSaved = true;
    console.log(' add new Recipe to the recipe Book');
    console.log(this.newIngredientsForm);
    const recipe = new Recipe(this.newIngredientsForm.value['name'],
                              this.newIngredientsForm.value['description'],
                              this.newIngredientsForm.value['imagePath'],
                              this.newIngredientsForm.value['ingredients']  );

    if (this.editMode) {
      this.recipeService.addOrUpdateIngredientToRecipe(this.id, recipe);
    } else {
      this.recipeService.addNewRecipe(recipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  /**
   *add new ingredient to the recipe
   *
   * @memberof ShoppingEditComponent
   */
  addNewIngredientsToReceipeBook() {
    console.log(' adding new ingredient to the recipe book');
    // get the ingredients Array and push.
    this.allMyIngredients.push(
      this.formBuilder.group({
        name : ['', Validators.required],
        amount : ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ] ]
      })
    );
    // console.log(this.newIngredientsForm.get('newIngredientName').value);
    this.changesSaved = true;
  }

  /***
   * Cancel the form and navigate away from the edit/new form.
    */
  cancelRecipeForm() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   *
   * delete ingredient
   * @param {number} index
   * @memberof RecipeEditComponent
   */
  deleteIngredient(index: number) {
    this.allMyIngredients.removeAt(index);

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
//  if (this.re(!this.changesSaved)) {
//       return confirm(' Do you want to discard the changes? ');
//     } else {
//       return true;
//     }
    return true;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log('Recipe Edit : Parameter unsubscription done! ');
    this.parameterSubscription.unsubscribe();
  }
}
