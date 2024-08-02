import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleDeTempsEmployeConnecteComponent } from './feuille-de-temps-employe-connecte.component';

describe('FeuilleDeTempsComponent', () => {
  let component: FeuilleDeTempsEmployeConnecteComponent;
  let fixture: ComponentFixture<FeuilleDeTempsEmployeConnecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeuilleDeTempsEmployeConnecteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleDeTempsEmployeConnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
