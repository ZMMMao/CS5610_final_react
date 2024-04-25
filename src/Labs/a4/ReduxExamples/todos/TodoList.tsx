import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { LabState, TodoType } from "../../../store";

function TodoList() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        
        <TodoForm />

        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}

        {/*
        <li className="list-group-item">
          <button onClick={() => addTodo(todo)}>Add</button>
          <button onClick={() => updateTodo(todo)}>Update </button>
          <input
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </li>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <button onClick={() => deleteTodo(todo.id)}>Delete </button>
            <button onClick={() => setTodo(todo)}>Edit </button>
            {todo.title}
          </li>
        ))}
        */}
      </ul>
    </div>
  );
}

export default TodoList;