import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsHomeComponent } from './flashcards-home.component';

describe('FlashcardsHomeComponent', () => {
  let component: FlashcardsHomeComponent;
  let fixture: ComponentFixture<FlashcardsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
