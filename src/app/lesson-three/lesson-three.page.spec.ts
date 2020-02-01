import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonThreePage } from './lesson-three.page';

describe('LessonThreePage', () => {
  let component: LessonThreePage;
  let fixture: ComponentFixture<LessonThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonThreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
