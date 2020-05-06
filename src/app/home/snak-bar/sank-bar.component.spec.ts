import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SankBarComponent } from './sank-bar.component';

describe('SnakBarComponent', () => {
  let component: SankBarComponent;
  let fixture: ComponentFixture<SankBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SankBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SankBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
