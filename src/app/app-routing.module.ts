import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { WhatsnewComponent } from './whatsnew/whatsnew.component';
import { HomeComponent } from './core/home/home.component';


const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule', canLoad: [/** Authorization CanActivateGuard*/] },
  // { path: 'recipes', component: RecipesComponent },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'news', component: WhatsnewComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

