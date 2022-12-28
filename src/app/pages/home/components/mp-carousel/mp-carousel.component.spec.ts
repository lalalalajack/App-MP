import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpCarouselComponent } from './mp-carousel.component';

describe('MpCarouselComponent', () => {
  let component: MpCarouselComponent;
  let fixture: ComponentFixture<MpCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
