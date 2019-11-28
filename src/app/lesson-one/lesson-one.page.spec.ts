import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonOnePage } from './lesson-one.page';

describe('LessonOnePage', () => {
  let component: LessonOnePage;
  let fixture: ComponentFixture<LessonOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
