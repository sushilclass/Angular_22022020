import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdComponent } from './login-ad.component';

describe('LoginAdComponent', () => {
  let component: LoginAdComponent;
  let fixture: ComponentFixture<LoginAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
