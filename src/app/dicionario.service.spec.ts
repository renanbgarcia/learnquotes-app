import { TestBed, inject } from '@angular/core/testing';

import { DicionarioService } from './dicionario.service';

describe('DicionarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DicionarioService]
    });
  });

  it('should be created', inject([DicionarioService], (service: DicionarioService) => {
    expect(service).toBeTruthy();
  }));
});
