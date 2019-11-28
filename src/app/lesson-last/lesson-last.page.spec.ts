import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLastPage } from './lesson-last.page';

describe('LessonLastPage', () => {
  let component: LessonLastPage;
  let fixture: ComponentFixture<LessonLastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonLastPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
