import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMovieSideBarComponent } from './details-movie-side-bar.component';

describe('DetailsMovieSideBarComponent', () => {
  let component: DetailsMovieSideBarComponent;
  let fixture: ComponentFixture<DetailsMovieSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMovieSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMovieSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
