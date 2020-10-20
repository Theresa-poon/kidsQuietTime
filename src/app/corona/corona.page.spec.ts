import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaPage } from './corona.page';

describe('CoronaPage', () => {
  let component: CoronaPage;
  let fixture: ComponentFixture<CoronaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
