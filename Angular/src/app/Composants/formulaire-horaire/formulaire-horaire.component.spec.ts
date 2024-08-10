import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireHoraireComponent } from './formulaire-horaire.component';

describe('FormulaireHoraireComponent', () => {
  let component: FormulaireHoraireComponent;
  let fixture: ComponentFixture<FormulaireHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaireHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
