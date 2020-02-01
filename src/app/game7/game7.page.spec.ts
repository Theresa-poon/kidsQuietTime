import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game7Page } from './game7.page';

describe('Game7Page', () => {
  let component: Game7Page;
  let fixture: ComponentFixture<Game7Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game7Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
