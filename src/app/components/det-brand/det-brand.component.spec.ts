import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetBrandComponent } from './det-brand.component';

describe('DetBrandComponent', () => {
  let component: DetBrandComponent;
  let fixture: ComponentFixture<DetBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
