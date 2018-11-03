import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './drop-down.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports: [ CommonModule ],
  exports: [
    CommonModule,
    DropdownDirective
  ],
  providers: [],
})
export class SharedModules {}

