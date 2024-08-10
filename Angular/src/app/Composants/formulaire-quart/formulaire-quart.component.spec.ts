import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireQuartComponent } from './formulaire-quart.component';

describe('FormulaireQuartComponent', () => {
  let component: FormulaireQuartComponent;
  let fixture: ComponentFixture<FormulaireQuartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaireQuartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireQuartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
