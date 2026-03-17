import { TestBed } from '@angular/core/testing';

import { Icecream } from './icecream';

describe('Icecream', () => {
  let service: Icecream;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Icecream);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
