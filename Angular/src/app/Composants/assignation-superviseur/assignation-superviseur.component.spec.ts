import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationSuperviseurComponent } from './assignation-superviseur.component';

describe('AssignationSuperviseurComponent', () => {
  let component: AssignationSuperviseurComponent;
  let fixture: ComponentFixture<AssignationSuperviseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignationSuperviseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignationSuperviseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
