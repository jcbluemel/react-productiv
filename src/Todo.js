import React from "react";

/** Simple presentation component for a todo.
 *
 * Props:
 * - todo: like { id, title, description, priority }
 *
 * { EditableTodo, TopTodo } -> Todo
 **/

function Todo({ todo }) {
  return (
    <div className="Todo" id={todo.id}>
      <div><b>{todo.title}</b> <small>Priority: {todo.priority}</small></div>
      <div><small>{todo.description}</small></div>
    </div>
  );
}

export default Todo;
