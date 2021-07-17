import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumComponent } from './colum.component';

describe('ColumComponent', () => {
  let component: ColumComponent;
  let fixture: ComponentFixture<ColumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
