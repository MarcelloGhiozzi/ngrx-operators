import { Component, OnInit } from '@angular/core';
import { InputArg } from '../input-arg/input-arg.directive';

@Component({
  selector: 'app-input-string',
  templateUrl: './input-string.component.html',
  styleUrls: ['./input-string.component.scss']
})
export class InputStringComponent extends InputArg implements OnInit {

  ngOnInit() {
  }

}
