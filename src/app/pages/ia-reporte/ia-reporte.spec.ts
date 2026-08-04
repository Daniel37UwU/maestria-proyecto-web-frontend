import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaReporte } from './ia-reporte';

describe('IaReporte', () => {
  let component: IaReporte;
  let fixture: ComponentFixture<IaReporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaReporte],
    }).compileComponents();

    fixture = TestBed.createComponent(IaReporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
