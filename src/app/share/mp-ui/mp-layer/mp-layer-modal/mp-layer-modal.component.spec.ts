import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLayerModalComponent } from './mp-layer-modal.component';

describe('MpLayerModalComponent', () => {
  let component: MpLayerModalComponent;
  let fixture: ComponentFixture<MpLayerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpLayerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpLayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
