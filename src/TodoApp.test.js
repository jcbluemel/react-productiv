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

it("shows all components (EditableTodoList, TopTodo, TodoForm", function () {
    const { container, debug } = render(
        <TodoApp
            initialTodos={TEST_TODO_LIST}
        />
    );
    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(2);
    expect(container).toContainHTML('<h3>Top Todo</h3>');
    expect(container.querySelectorAll(".NewTodoForm")).toHaveLength(1);
});

it("adds a todo to the EditableTodosList when form submitted", function () {
    const { container, debug } = render(
        <TodoApp
            initialTodos={TEST_TODO_LIST}
        />
    );
    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(2);

    const titleInput = container.querySelector("[name=title]");
    const descriptionInput = container.querySelector("[name=description]");
    const priorityInput = container.querySelector("[name=priority]");
    
    fireEvent.input(titleInput, { target: { value: "Test3" } });
    fireEvent.input(descriptionInput, { target: { value: "test3" } });
    fireEvent.input(priorityInput, { target: { value: 3 } });

    const createBtn = container.querySelector(".NewTodoForm-addBtn");
    fireEvent.click(createBtn);

    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(3);
});

it("updates todo when edit form is submitted", function () {
    const { container, debug } = render(
        <TodoApp
            initialTodos={[TEST_TODO_LIST[0]]}
        />
    );
    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(1);

    const editBtn = container.querySelector(".EditableTodo-toggle");
    fireEvent.click(editBtn);

    const titleInput = container.querySelector(`input[value="Test1"]`);

    fireEvent.input(titleInput, { target: { value: "UpdatedTest" } });
    // Grabbing specifically the edit form submit button, since there are
    // two forms with same classes on page.
    const updateBtn = container.querySelector(
        ".EditableTodo > form > div >.NewTodoForm-addBtn"
    );
    fireEvent.click(updateBtn);

    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(1);
    expect(container).toContainHTML('<b>UpdatedTest</b>');
});

it("delete a todo when delete button clicked", function () {
    const { container, debug } = render(
        <TodoApp
            initialTodos={TEST_TODO_LIST}
        />
    );
    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(2);

    const deleteBtn = container.querySelector(".EditableTodo-delBtn");
    fireEvent.click(deleteBtn);

    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(1);
});

it("shows no TopTodo/EditableTodos if no todos", function () {
    const { container, debug } = render(
        <TodoApp
            initialTodos={[]}
        />
    );

    expect(container.querySelectorAll(".EditableTodo")).toHaveLength(0);
    expect(container).toContainHTML(
        '<span class= "text-muted">You have no todos.</span>'
    );
    expect(container).not.toContainHTML(
        '<h3>Top Todo</h3>'
    );

});