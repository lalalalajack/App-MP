import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLayerLoginComponent } from './mp-layer-login.component';

describe('MpLayerLoginComponent', () => {
  let component: MpLayerLoginComponent;
  let fixture: ComponentFixture<MpLayerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpLayerLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpLayerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
