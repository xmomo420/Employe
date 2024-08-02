import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageEmployeComponent } from './affichage-employe.component';

describe('AffichageEmployeComponent', () => {
  let component: AffichageEmployeComponent;
  let fixture: ComponentFixture<AffichageEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichageEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
