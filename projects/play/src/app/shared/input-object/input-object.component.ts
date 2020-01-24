import { Component, OnInit } from '@angular/core';
import { InputArg } from '../input-arg/input-arg.directive';

@Component({
  selector: 'app-input-object',
  templateUrl: './input-object.component.html',
  styleUrls: ['./input-object.component.scss']
})
export class InputObjectComponent extends InputArg implements OnInit {


  ngOnInit() {
  }

}
