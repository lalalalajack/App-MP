import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpPlayerComponent } from './mp-player.component';

describe('MpPlayerComponent', () => {
  let component: MpPlayerComponent;
  let fixture: ComponentFixture<MpPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
