import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

const ENTRY = [
  InputStringComponent,
  InputNumberComponent,
  InputObjectComponent,
  InputActionComponent,
];

@NgModule({
  declarations: SHARED,
  entryComponents: ENTRY,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...SHARED]
})
export class SharedModule { }
