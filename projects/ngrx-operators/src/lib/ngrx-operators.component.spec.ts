import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxOperatorsComponent } from './ngrx-operators.component';

describe('NgrxOperatorsComponent', () => {
  let component: NgrxOperatorsComponent;
  let fixture: ComponentFixture<NgrxOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
