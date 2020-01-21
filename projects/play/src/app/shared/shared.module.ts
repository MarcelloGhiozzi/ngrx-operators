import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorComponent } from './operator/operator.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { SampleComponent } from './sample/sample.component';



@NgModule({
  declarations: [OperatorComponent, ToolboxComponent, SampleComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
