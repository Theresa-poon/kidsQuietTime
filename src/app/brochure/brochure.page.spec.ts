import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochurePage } from './brochure.page';

describe('BrochurePage', () => {
  let component: BrochurePage;
  let fixture: ComponentFixture<BrochurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
