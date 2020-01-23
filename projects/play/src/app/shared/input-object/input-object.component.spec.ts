import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputObjectComponent } from './input-object.component';

describe('InputObjectComponent', () => {
  let component: InputObjectComponent;
  let fixture: ComponentFixture<InputObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
