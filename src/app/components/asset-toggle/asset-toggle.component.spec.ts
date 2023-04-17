import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetToggleComponent } from './asset-toggle.component';

describe('AssetToggleComponent', () => {
  let component: AssetToggleComponent;
  let fixture: ComponentFixture<AssetToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
