import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimalComponent } from './manage-animal.component';

describe('ManageAnimalComponent', () => {
  let component: ManageAnimalComponent;
  let fixture: ComponentFixture<ManageAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
