import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardList } from './task-card-list';

describe('TaskCardList', () => {
  let component: TaskCardList;
  let fixture: ComponentFixture<TaskCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
