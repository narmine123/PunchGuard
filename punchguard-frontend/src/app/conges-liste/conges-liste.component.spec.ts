import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesListeComponent } from './conges-liste.component';

describe('CongesListeComponent', () => {
  let component: CongesListeComponent;
  let fixture: ComponentFixture<CongesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
