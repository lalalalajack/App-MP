import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLayerDefaultComponent } from './mp-layer-default.component';

describe('MpLayerDefaultComponent', () => {
  let component: MpLayerDefaultComponent;
  let fixture: ComponentFixture<MpLayerDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpLayerDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpLayerDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
