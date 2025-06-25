import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesDemandeComponent } from './conges-demande.component';

describe('CongesDemandeComponent', () => {
  let component: CongesDemandeComponent;
  let fixture: ComponentFixture<CongesDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongesDemandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongesDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
