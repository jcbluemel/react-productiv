import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

const TEST_TODO = {
  id: "1",
  title: "Test",
  description: "test",
  priority: 1
}

it("renders without crashing", function() {
  render(<Todo todo={TEST_TODO} />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Todo todo={TEST_TODO} />);
  expect(asFragment()).toMatchSnapshot();
});

it("contains todo data", function() {
  const { container } = render(<Todo todo={TEST_TODO} />);
  expect(container).toContainHTML('class="Todo" id="1"');
  expect(container).toContainHTML('<b>Test</b>');
  expect(container).toContainHTML('<small>Priority: 1</small>');
  expect(container).toContainHTML('<small>test</small>');
});