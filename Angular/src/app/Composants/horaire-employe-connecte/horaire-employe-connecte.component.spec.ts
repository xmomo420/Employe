import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireEmployeConnecteComponent } from './horaire-employe-connecte.component';

describe('HoraireEmployeConnecteComponent', () => {
  let component: HoraireEmployeConnecteComponent;
  let fixture: ComponentFixture<HoraireEmployeConnecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoraireEmployeConnecteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraireEmployeConnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
