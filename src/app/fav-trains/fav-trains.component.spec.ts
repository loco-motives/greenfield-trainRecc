/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FavTrainsComponent } from './fav-trains.component';

describe('FavTrainsComponent', () => {
  let component: FavTrainsComponent;
  let fixture: ComponentFixture<FavTrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavTrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
