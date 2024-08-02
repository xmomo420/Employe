import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireNouvelEmployeComponent } from './formulaire-nouvel-employe.component';

describe('FormulaireNouvelEmployeComponent', () => {
  let component: FormulaireNouvelEmployeComponent;
  let fixture: ComponentFixture<FormulaireNouvelEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaireNouvelEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireNouvelEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
