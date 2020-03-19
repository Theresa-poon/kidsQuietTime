import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GospelPage } from './gospel.page';

describe('GospelPage', () => {
  let component: GospelPage;
  let fixture: ComponentFixture<GospelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GospelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GospelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
