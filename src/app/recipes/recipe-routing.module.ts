import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { CanActivateAuthorizationGuard } from '../auth/auth-guard.service';

/** path is '' instead of recipes because we are lazy loading the recipe module. */
const recipeRoutes: Routes = [
  // { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipesComponent, children: [
      { path: '', component : RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [CanActivateAuthorizationGuard] },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [CanActivateAuthorizationGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
   // since the guard is just for routing we added it here, else it goes into module providers array.
  providers: [CanActivateAuthorizationGuard]
})
export class RecipeRoutingModule {}
