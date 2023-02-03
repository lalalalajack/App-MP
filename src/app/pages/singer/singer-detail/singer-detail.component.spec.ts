import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerDetailComponent } from './singer-detail.component';

describe('SingerDetailComponent', () => {
  let component: SingerDetailComponent;
  let fixture: ComponentFixture<SingerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
