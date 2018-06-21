import { TestBed, inject } from '@angular/core/testing';

import { RandomquoteService } from './randomquote.service';

describe('RandomquoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomquoteService]
    });
  });

  it('should be created', inject([RandomquoteService], (service: RandomquoteService) => {
    expect(service).toBeTruthy();
  }));
});
