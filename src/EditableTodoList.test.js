import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList";

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

const mock = () => { };

it("renders without crashing", function () {
    render(
        <EditableTodoList
            todos={TEST_TODO_LIST}
            update={mock}
            remove={mock}
        />
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <EditableTodoList
            todos={TEST_TODO_LIST}
            update={mock}
            remove={mock}
        />
    );
    expect(asFragment()).toMatchSnapshot();
});

it("contains todo data", function () {
    const { container, debug } = render(
        <EditableTodoList
            todos={TEST_TODO_LIST}
            update={mock}
            remove={mock}
        />
    ); 
    
    expect(container.querySelectorAll(".Todo")).toHaveLength(2);
});