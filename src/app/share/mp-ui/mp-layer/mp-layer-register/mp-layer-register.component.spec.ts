import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLayerRegisterComponent } from './mp-layer-register.component';

describe('MpLayerRegisterComponent', () => {
  let component: MpLayerRegisterComponent;
  let fixture: ComponentFixture<MpLayerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpLayerRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpLayerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
