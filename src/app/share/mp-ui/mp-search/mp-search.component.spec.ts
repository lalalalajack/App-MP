import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpSearchComponent } from './mp-search.component';

describe('MpSearchComponent', () => {
  let component: MpSearchComponent;
  let fixture: ComponentFixture<MpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
