import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierBasedComponent } from './tier-based.component';

describe('TierBasedComponent', () => {
  let component: TierBasedComponent;
  let fixture: ComponentFixture<TierBasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierBasedComponent]
    });
    fixture = TestBed.createComponent(TierBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
