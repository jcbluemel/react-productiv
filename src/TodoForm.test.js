import React, { Fragment } from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

const TEST_INTIAL_DATA = {
    title: "Test",
    description: "test",
    priority: 2
}

const mock = () => {};

it("renders without crashing", function () {
    render(<TodoForm initialFormData={TEST_INTIAL_DATA} handleSave={mock}/>);
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <TodoForm initialFormData={TEST_INTIAL_DATA} handleSave={mock} />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches data-entered snapshot", function () {
    const { container } = render(
        <TodoForm handleSave={mock} />);

    const titleInput = container.querySelector("[name=title]");
    const descriptionInput = container.querySelector("[name=description]");
    const priorityInput = container.querySelector("[name=priority]");

    fireEvent.input(titleInput, { target: { value: "Test" } });
    fireEvent.input(descriptionInput, { target: { value: "test" } });
    fireEvent.input(priorityInput, { target: { value: 2 } });

    expect(container).toMatchSnapshot();
});

it("submitting form works", function () {
    const handleSaveMock = jest.fn();
    const { container, debug } = render(
        <TodoForm handleSave={handleSaveMock} />);

    const titleInput = container.querySelector("[name=title]");
    const descriptionInput = container.querySelector("[name=description]");
    const priorityInput = container.querySelector("[name=priority]");

    fireEvent.input(titleInput, { target: { value: "Test" } });
    fireEvent.input(descriptionInput, { target: { value: "test" } });
    fireEvent.input(priorityInput, { target: { value: 2 } });

    expect(handleSaveMock).toHaveBeenCalledTimes(0);
    fireEvent.click(container.querySelector(".NewTodoForm-addBtn"));
    expect(handleSaveMock).toHaveBeenCalledTimes(1);

    expect(container.querySelectorAll('input[value=""]')).toHaveLength(1);
    expect(container.querySelector('textarea')).toHaveTextContent('');
});

