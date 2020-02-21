import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FilterPipe
  ]
})
export class PipesModule { }
