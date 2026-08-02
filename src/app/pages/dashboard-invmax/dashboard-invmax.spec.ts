import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInvmax } from './dashboard-invmax';

describe('DashboardInvmax', () => {
  let component: DashboardInvmax;
  let fixture: ComponentFixture<DashboardInvmax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInvmax],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardInvmax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
