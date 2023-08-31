import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCardComponent } from './coin-card.component';

describe('CoinCardComponent', () => {
  let component: CoinCardComponent;
  let fixture: ComponentFixture<CoinCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinCardComponent]
    });
    fixture = TestBed.createComponent(CoinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
