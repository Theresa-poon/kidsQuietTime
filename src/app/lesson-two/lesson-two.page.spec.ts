import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTwoPage } from './lesson-two.page';

describe('LessonTwoPage', () => {
  let component: LessonTwoPage;
  let fixture: ComponentFixture<LessonTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
