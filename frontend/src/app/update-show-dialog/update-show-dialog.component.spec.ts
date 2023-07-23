import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShowDialogComponent } from './update-show-dialog.component';

describe('UpdateShowDialogComponent', () => {
  let component: UpdateShowDialogComponent;
  let fixture: ComponentFixture<UpdateShowDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateShowDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
