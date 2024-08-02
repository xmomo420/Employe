import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthoriseComponent } from './non-authorise.component';

describe('NonAuthoriseComponent', () => {
  let component: NonAuthoriseComponent;
  let fixture: ComponentFixture<NonAuthoriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonAuthoriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
