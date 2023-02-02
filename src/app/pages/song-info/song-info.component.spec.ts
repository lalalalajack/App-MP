import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongInfoComponent } from './song-info.component';

describe('SongInfoComponent', () => {
  let component: SongInfoComponent;
  let fixture: ComponentFixture<SongInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
