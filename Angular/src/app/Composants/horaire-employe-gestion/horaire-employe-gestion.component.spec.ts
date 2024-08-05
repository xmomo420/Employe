import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireEmployeGestionComponent } from './horaire-employe-gestion.component';

describe('HoraireEmployeGestionComponent', () => {
  let component: HoraireEmployeGestionComponent;
  let fixture: ComponentFixture<HoraireEmployeGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoraireEmployeGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraireEmployeGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
