import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComposComponent } from './menu-compos.component';

describe('MenuComposComponent', () => {
  let component: MenuComposComponent;
  let fixture: ComponentFixture<MenuComposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
