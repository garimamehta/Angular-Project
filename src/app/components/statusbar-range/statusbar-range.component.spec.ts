import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusbarRangeComponent } from './statusbar-range.component';

describe('StatusbarRangeComponent', () => {
  let component: StatusbarRangeComponent;
  let fixture: ComponentFixture<StatusbarRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusbarRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusbarRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
