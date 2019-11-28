import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game2Page } from './game2.page';

describe('Game2Page', () => {
  let component: Game2Page;
  let fixture: ComponentFixture<Game2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
