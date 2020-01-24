import { Component, OnInit } from '@angular/core';
import { InputArg } from '../input-arg/input-arg.directive';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent extends InputArg implements OnInit {


  ngOnInit() {
  }

}
