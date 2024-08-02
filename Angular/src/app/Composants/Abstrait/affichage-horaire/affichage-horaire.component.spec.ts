import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageHoraireComponent } from './affichage-horaire.component';

describe('AffichageHoraireComponent', () => {
  let component: AffichageHoraireComponent;
  let fixture: ComponentFixture<AffichageHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichageHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
