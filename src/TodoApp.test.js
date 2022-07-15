import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

const TEST_TODO_LIST = [
    {
        id: "1",
        title: "Test1",
        description: "test1",
        priority: 1
    },
    {
        id: "2",
        title: "Test2",
        description: "test2",
        priority: 2
    }
];

it("renders without crashing", function () {
    render(
        <TodoApp
            initialTodos={TEST_TODO_LIST}
        />
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
      <TodoApp
      initialTodos={TEST_TODO_LIST}
      />
    );
    expect(asFragment()).toMatchSnapshot();
});

it("shows all components (EditableTodos, TopTodo, TodoForm", function () {
  const { container, debug } = render(
    <TodoApp
    initialTodos={TEST_TODO_LIST}
    />
  );
  console.log(container);
  expect(container.querySelectorAll(".EditableTodo")).toHaveLength(2);
  expect(container).toContainHTML('<h3>Top Todo</h3>');
  expect(container.querySelectorAll(".NewTodoForm")).toHaveLength(1);
});

// Click form submit, check if create runs, check if added to screen

// Click edit