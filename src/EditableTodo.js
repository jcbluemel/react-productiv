import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

/** Show editable todo item.
 *
 * Props
 * - todo
 * - update(): fn to call to update a todo
 * - remove(): fn to call to remove a todo
 * 
 * State:
 *  -showEditForm
 *
 * EditableTodoList -> EditableTodo -> { Todo, TodoForm }
 */

function EditableTodo({ todo, update, remove }) {
  const [showEditForm, setShowEditForm] = useState(false);

  /** Toggle if this is being edited */
  function toggleEdit() {
    //TODO: use arrow
    setShowEditForm(!showEditForm);
  }

  /** Call remove fn passed to this. */
  function handleDelete() {
    remove(todo.id);
  }

  /** Edit form saved; toggle isEditing and update in ancestor. */
  function handleSave(formData) {
    update(formData);
    toggleEdit();
  }

  return (
    <div className="EditableTodo">

      {showEditForm
        ? <TodoForm
          initialFormData={todo}
          handleSave={handleSave}
          />
        : <div className="mb-3">
            <div className="float-end text-sm-end">
              <button
                className="EditableTodo-toggle btn-link btn btn-sm"
                onClick={toggleEdit}>
                Edit
              </button>
              <button
                className="EditableTodo-delBtn btn-link btn btn-sm text-danger"
                onClick={handleDelete}>
                Del
              </button>
            </div>
           <Todo todo={todo} />
          </div>
      }
    </div>
  );
  //TODO: ternary is long... maybe use function
}

export default EditableTodo;
