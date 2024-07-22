/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { getFilteredTodos } from '../components/filteredTodos';
import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/filterTypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterTypes;
  deleteTodo: (todoId: number) => void;
  fakeTodo: Todo | null;
  isLoading: boolean;
  loadingTodoId: number[];
  toggleTodoCompleted: (todoId: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  deleteTodo,
  fakeTodo,
  loadingTodoId,
  toggleTodoCompleted,
}) => {
  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="temp-item">
            <TodoItem
              deleteTodo={deleteTodo}
              todo={todo}
              isLoading={loadingTodoId.includes(todo.id)}
              toggleTodoCompleted={toggleTodoCompleted}
            />
          </CSSTransition>
        ))}
        {fakeTodo && (
          <CSSTransition key={0} timeout={300} classNames="temp-item">
            <TodoItem
              deleteTodo={deleteTodo}
              todo={fakeTodo}
              isLoading={loadingTodoId.includes(fakeTodo.id)}
              toggleTodoCompleted={() => {}}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
