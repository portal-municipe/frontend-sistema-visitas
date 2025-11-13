import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDetailModalComponent } from './visit-detail-modal.component';

describe('VisitDetailModalComponent', () => {
  let component: VisitDetailModalComponent;
  let fixture: ComponentFixture<VisitDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
