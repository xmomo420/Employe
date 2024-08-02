import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInexistanteComponent } from './page-inexistante.component';

describe('PageInexistanteComponent', () => {
  let component: PageInexistanteComponent;
  let fixture: ComponentFixture<PageInexistanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageInexistanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageInexistanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
