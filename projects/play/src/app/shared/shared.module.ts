import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { SpacerComponent } from './spacer/spacer.component';
import { InputStringComponent } from './input-string/input-string.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputObjectComponent } from './input-object/input-object.component';
import { InputActionComponent } from './input-action/input-action.component';
import { InputArgComponent } from './input-arg/input-arg.component';
import { InputArgDirective } from './input-arg/input-arg.directive';

const SHARED = [
  TextComponent,
  TitleComponent,
  SpacerComponent,
  InputStringComponent,
  InputNumberComponent,
  InputObjectComponent,
  InputActionComponent,
  InputArgComponent,
  InputArgDirective
];

@NgModule({
  declarations: SHARED,
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CommonModule, FormsModule, ...SHARED]
})
export class SharedModule { }
