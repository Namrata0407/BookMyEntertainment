import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieModalComponent } from './add-movie-modal.component';

describe('AddMovieModalComponent', () => {
  let component: AddMovieModalComponent;
  let fixture: ComponentFixture<AddMovieModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovieModalComponent]
    });
    fixture = TestBed.createComponent(AddMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
