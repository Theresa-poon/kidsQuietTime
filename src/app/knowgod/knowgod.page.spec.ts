import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowgodPage } from './knowgod.page';

describe('KnowgodPage', () => {
  let component: KnowgodPage;
  let fixture: ComponentFixture<KnowgodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowgodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowgodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
