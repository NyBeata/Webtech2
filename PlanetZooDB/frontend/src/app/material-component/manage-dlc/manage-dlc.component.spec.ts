import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDlcComponent } from './manage-dlc.component';

describe('ManageDlcComponent', () => {
  let component: ManageDlcComponent;
  let fixture: ComponentFixture<ManageDlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDlcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
