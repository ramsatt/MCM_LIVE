import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrviewComponent } from './irview.component';

describe('IrviewComponent', () => {
  let component: IrviewComponent;
  let fixture: ComponentFixture<IrviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
