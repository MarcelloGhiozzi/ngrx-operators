import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { SpacerComponent } from './spacer/spacer.component';



@NgModule({
  declarations: [TextComponent, TitleComponent, SpacerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CommonModule, FormsModule, TextComponent, TitleComponent, SpacerComponent]
})
export class SharedModule { }
