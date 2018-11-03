import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { RecipeModule } from './recipes/recipes.module';
import { SharedModules } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { ShoppingListService } from './shopping-list/service/shopping-list.service';

import { WhatsnewComponent } from './whatsnew/whatsnew.component';
import { RecipeService } from './recipes/service/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { CanActivateAuthorizationGuard } from './auth/auth-guard.service';

import { CoreModules } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    WhatsnewComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    CoreModules,
    // RecipeModule, // lazy-loading  // the order in which these are declared are important.
    AppRoutingModule,
    ShoppingListModule,
    SharedModules
  ],
  // canactivateguard is in recipes-routing-module, the rest of them are in core.modules/
  // providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, CanActivateAuthorizationGuard],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
