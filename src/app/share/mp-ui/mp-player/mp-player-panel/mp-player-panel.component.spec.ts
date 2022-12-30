import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpPlayerPanelComponent } from './mp-player-panel.component';

describe('MpPlayerPanelComponent', () => {
  let component: MpPlayerPanelComponent;
  let fixture: ComponentFixture<MpPlayerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpPlayerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpPlayerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
