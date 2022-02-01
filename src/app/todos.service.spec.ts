import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo } from './models/todo';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TodosService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodosService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const todosMock: Todo[] = [
      {
        id: 1,
        userId: 1,
        title: "Todo 1",
        completed: false,
      }
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(todosMock.length);
      expect(todos).toEqual(todosMock);
    });

    const request = httpMock.expectOne(`${service.url}/todos`);
    expect(request.request.method).toBe('GET');

    request.flush(todosMock);
  });
});
