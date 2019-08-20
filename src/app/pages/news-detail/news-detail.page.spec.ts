import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailPage } from './news-detail.page';

describe('NewsDetailPage', () => {
  let component: NewsDetailPage;
  let fixture: ComponentFixture<NewsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
