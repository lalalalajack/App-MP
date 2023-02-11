import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLayerComponent } from './mp-layer.component';

describe('MpLayerComponent', () => {
  let component: MpLayerComponent;
  let fixture: ComponentFixture<MpLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
