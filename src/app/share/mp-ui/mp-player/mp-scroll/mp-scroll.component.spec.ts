import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpScrollComponent } from './mp-scroll.component';

describe('MpScrollComponent', () => {
  let component: MpScrollComponent;
  let fixture: ComponentFixture<MpScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
