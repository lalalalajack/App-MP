import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetInfoComponent } from './sheet-info.component';

describe('SheetInfoComponent', () => {
  let component: SheetInfoComponent;
  let fixture: ComponentFixture<SheetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
