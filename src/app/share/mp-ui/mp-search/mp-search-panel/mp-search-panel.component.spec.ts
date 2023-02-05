import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpSearchPanelComponent } from './mp-search-panel.component';

describe('MpSearchPanelComponent', () => {
  let component: MpSearchPanelComponent;
  let fixture: ComponentFixture<MpSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpSearchPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
