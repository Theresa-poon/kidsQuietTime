import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game6Page } from './game6.page';

describe('Game6Page', () => {
  let component: Game6Page;
  let fixture: ComponentFixture<Game6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
