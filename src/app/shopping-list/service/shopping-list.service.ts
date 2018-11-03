import { Subject } from 'rxjs';

import { Ingredient } from './../../shared/ingredient.model';


export class ShoppingListService {
  /**  this is needed because when we add a new ingredient
   *   we are only ading to the copy of the array and not to the original array.
   * */
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEditing  = new Subject<number>();

  constructor() { }

  private ingredients: Ingredient[] = [

    new Ingredient('Tomatoes', 32),
    new Ingredient('Chipotle', 2),
    new Ingredient('Mushroom', 2),
    new Ingredient('Pasta Sauce', 4)
  ];

  /**
   *sets the ingredients list from header section which inturns sets from firebase.
   *
   * @param {Ingredient[]} ingredients
   * @memberof ShoppingListService
   */
  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  /**
   * creates a copy of the Ingredients array. This is a deep copy.
   *  NOTE : We are not adding to the original Ingredients array.
   */
    getIngredientsFromService() {
     return this.ingredients.slice();
      // return this.ingredients;  // if we have this then we dont need to have an emitter
  }

    /**
     *
     * @param index
     * returns the ingredient at the particular index.
     */
    getIngredientFromServiceByIndex(index: number) {
      console.log(`returning ingredient with index: ${index} from service `)
      return this.ingredients[index];
    }


    updateIngredientinCart(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    /**
     *
     * Using javascript.splice() removing the item off the particular @index.
     * @param {number} index
     * @memberof ShoppingListService
     */
    deleteIngredientOffCart(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  /**
   *
   * @param ingredient
   * @memberof Ingredient Model.
   * adds Ingredient to the shoppiong list (array)
   * Checks if ingredient already exists -> if so, just add the amount.Else, add new Ingredient.
   * we are now using observables to emit the properties/objects.
   */
  addIngredient(ingredient: Ingredient) {
    console.log('adding ingredient : ' + ingredient.name);
    const _ingredient = ingredient;
    let found = false;

    // find if the ingredient already exists in the Ingredient Array. If so, just add the amount.
    this.ingredients.find( _ingredientSearch => {
        // convert the both sides to lowerCase and check.
        if (_ingredientSearch.name.toLowerCase() === _ingredient.name.toLowerCase()) {
           _ingredientSearch.amount =  Number(_ingredientSearch.amount) + Number(_ingredient.amount);
          return found = true;
        }
    });

    console.log('found Ingredient ? : ' + found);
    if (found === false) {
         this.ingredients.push(ingredient);
    }
    // emit using observables the array has been changed.
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   *
   * @param {Ingredient[]} ingredients
   * @memberof ShoppingListService
   *
   * This method to add the Ingredients to the shopping list from the recipe list.
   */
  addIngredientsArrayFromRecipe(ingredients: Ingredient[]) {
      // for (let ingredient of ingredients) {
      //     this.addIngredient(ingredient);
      // }
      //
      // we are now using observables to emit the properties/objects.
      console.log(...ingredients);

      let firstIng, testArray = [];
      let _ingredientsMainArray = this.ingredients;
      const _ingredientsToPushArray = ingredients;

      // console.log('Ingredients Actual Array : ');
      // console.log(..._ingredientsMainArray);
      const mainArrayLength = this.ingredients.length;

      // console.log('Ingredients To Push Array : ');
      // console.log(..._ingredientsToPushArray);
      const pushArrayLength = ingredients.length;

       _ingredientsToPushArray.forEach((eachIngredient, pushIndex) => {
          firstIng = eachIngredient;
        // console.log(" --> "  + eachIngredient.name);
          _ingredientsMainArray.find( (mainArrayIngredient, mainIndex) => {
            // console.log(mainArrayIngredient.name);
              if (eachIngredient.name.toLowerCase().trim() === mainArrayIngredient.name.toLowerCase().trim()) {
                console.log('found similar');
                mainArrayIngredient.amount = Number(mainArrayIngredient.amount) + Number(eachIngredient.amount);
                return true;  // this return is important
              }
              // if we reached the end of the array, then its a unique ingredient not found in the original array.
              // push it to a tempArray.
              if (mainIndex === mainArrayLength - 1 ) {
                // console.log('-->reached end.<--');
                firstIng.name = firstIng.name.trim();  // remove any spaces, leave the caseing as it is.
                testArray.push(firstIng);
              }
            });
           });

      // this.ingredients.push(...testArray);
      console.log(...testArray);
       this.ingredients.push(...testArray);
      // this.ingredients.push(...ingredients);  // using es6 to  pushelements the

     this.ingredientsChanged.next(this.ingredients.slice());
  }
}
