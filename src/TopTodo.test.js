import React from "react";
import { render } from "@testing-library/react";
import TopTodo from "./TopTodo";

const TEST_TODOS = [
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

it("renders without crashing", function() {
  render(<TopTodo todos={TEST_TODOS} />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TopTodo todos={TEST_TODOS} />);
  expect(asFragment()).toMatchSnapshot();
});

it("returns todo with highest priority", function() {
  const { container } = render(<TopTodo todos={TEST_TODOS} />);
  expect(container).toContainHTML('class="Todo" id="1"');
  expect(container).toContainHTML('<b>Test1</b>');
  expect(container).toContainHTML('<small>Priority: 1</small>');
  expect(container).toContainHTML('<small>test1</small>');
});