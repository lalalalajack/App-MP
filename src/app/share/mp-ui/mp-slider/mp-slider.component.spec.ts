import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpSliderComponent } from './mp-slider.component';

describe('MpSliderComponent', () => {
  let component: MpSliderComponent;
  let fixture: ComponentFixture<MpSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
