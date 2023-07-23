import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowsComponent } from './create-shows.component';

describe('CreateShowsComponent', () => {
  let component: CreateShowsComponent;
  let fixture: ComponentFixture<CreateShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShowsComponent]
    });
    fixture = TestBed.createComponent(CreateShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
