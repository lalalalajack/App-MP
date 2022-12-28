import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSheetComponent } from './single-sheet.component';

describe('SingleSheetComponent', () => {
  let component: SingleSheetComponent;
  let fixture: ComponentFixture<SingleSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
