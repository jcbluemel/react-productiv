import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodo from "./EditableTodo";

const TEST_TODO = {
  id: "1",
  title: "Test",
  description: "test",
  priority: 1
}

const mock = () => {};

it("renders without crashing", function () {
  render(
  <EditableTodo
    todo={TEST_TODO}
    update={mock}
    remove={mock}
    />
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <EditableTodo
      todo={TEST_TODO}
      update={mock}
      remove={mock}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("toggleEdit swaps between todo and edit form", function() {
  const { container, debug } = render(
    <EditableTodo
      todo={TEST_TODO}
      update={mock}
      remove={mock}
    />
  );
  const editBtn = container.querySelector(".EditableTodo-toggle");
  fireEvent.click(editBtn);

  expect(container).not.toContainHTML('class="Todo" id="1"');
  expect(container).toContainHTML('<form class="NewTodoForm>');
});

it("clicking delete invokes remove function", function() {
  const handleDeleteMock = jest.fn();
  const { container, debug } = render(
    <EditableTodo
      todo={TEST_TODO}
      update={mock}
      remove={handleDeleteMock}
    />
  );
  const delBtn = container.querySelector(".EditableTodo-delBtn");

  expect(handleDeleteMock).toHaveBeenCalledTimes(0);
  fireEvent.click(delBtn);
  expect(handleDeleteMock).toHaveBeenCalledTimes(1);
});

it("toggleEdit swaps between todo and edit form", function() {
  const handleSaveMock = jest.fn();

  const { container, debug } = render(
    <EditableTodo
      todo={TEST_TODO}
      update={handleSaveMock}
      remove={mock}
    />
  );
  // show form
  const editBtn = container.querySelector(".EditableTodo-toggle");
  fireEvent.click(editBtn);

  // submit form
  const addBtn = container.querySelector(".NewTodoForm-addBtn");
  expect(handleSaveMock).toHaveBeenCalledTimes(0);
  fireEvent.click(addBtn);
  expect(handleSaveMock).toHaveBeenCalledTimes(1);
});