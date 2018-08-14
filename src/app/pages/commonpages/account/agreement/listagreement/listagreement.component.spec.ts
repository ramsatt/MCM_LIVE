import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagreementComponent } from './listagreement.component';

describe('ListagreementComponent', () => {
  let component: ListagreementComponent;
  let fixture: ComponentFixture<ListagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
