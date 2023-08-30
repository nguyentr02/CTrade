import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfomationComponent } from './personal-infomation.component';

describe('PersonalInfomationComponent', () => {
  let component: PersonalInfomationComponent;
  let fixture: ComponentFixture<PersonalInfomationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfomationComponent]
    });
    fixture = TestBed.createComponent(PersonalInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
