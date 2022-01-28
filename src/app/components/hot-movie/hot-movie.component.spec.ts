import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotMovieComponent } from './hot-movie.component';

describe('HotMovieComponent', () => {
  let component: HotMovieComponent;
  let fixture: ComponentFixture<HotMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
