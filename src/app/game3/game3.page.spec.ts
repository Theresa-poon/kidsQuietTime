import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game3Page } from './game3.page';

describe('Game3Page', () => {
  let component: Game3Page;
  let fixture: ComponentFixture<Game3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
