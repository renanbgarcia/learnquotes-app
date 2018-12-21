import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomquoteComponent } from './randomquote.component';

describe('RandomquoteComponent', () => {
  let component: RandomquoteComponent;
  let fixture: ComponentFixture<RandomquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
