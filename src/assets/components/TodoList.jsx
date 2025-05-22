import React from 'react';
import TodoCard from './TodoCard';

export default function TodoList(props) {
  const { todos } = props;

  return (
    <ul className='main'>
      {todos.map((todo, todoIndex) => (
        <TodoCard
          {...props}
          key={todoIndex}
          index={todoIndex}
        >
          <div>
            <p>{todo.text}</p>
            <small className="todoDate">Created on: {todo.createdAt}</small>
            {todo.editedAt && (
              <small className="todoDate"> | Edited on: {todo.editedAt}</small>
            )}
            {todo.dueDate && (  // Display due date if present
              <small className="todoDate"> | Due on: {new Date(todo.dueDate).toLocaleString()}</small>
            )}
          </div>
        </TodoCard>
      ))}
    </ul>
  );
}
