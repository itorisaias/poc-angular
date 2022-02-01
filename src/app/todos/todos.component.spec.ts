import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodosService } from '../todos.service';

import { TodosComponent } from './todos.component';

const TODO_MOCK = [
  {
    id: 1,
    userId: 1,
    title: 'Todo 1',
    completed: false,
  },
];

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [HttpClientModule],
      providers: [
        TodosService,
        {
          provide: TodosService,
          useValue: {
            getTodos: () => of(TODO_MOCK),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    todosService = TestBed.inject(TodosService);
  });

  it('should list todos when init', () => {
    spyOn(todosService, 'getTodos').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(todosService.getTodos).toHaveBeenCalled();
    expect(component.todos).toEqual(TODO_MOCK);
    expect(component.todos.length).toEqual(TODO_MOCK.length);
    expect(compiled.querySelectorAll('li').length).toEqual(TODO_MOCK.length);
  });
});
