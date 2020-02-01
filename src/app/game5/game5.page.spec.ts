import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game5Page } from './game5.page';

describe('Game5Page', () => {
  let component: Game5Page;
  let fixture: ComponentFixture<Game5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
