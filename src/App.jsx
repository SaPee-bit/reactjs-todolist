import { useState, useEffect } from "react";
import TodoInput from "./assets/components/TodoInput";
import TodoList from "./assets/components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [dueDate, setDueDate] = useState(''); // New state for the due date

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  function handleAddTodos() {
    if (todoValue.trim() === "") {
      setAlertMessage("Please enter a valid todo.");
      setTimeout(() => setAlertMessage(''), 3000);
      return;
    }

    if (editIndex !== null) {
      // Editing existing todo
      const updatedTodos = [...todos];
      updatedTodos.splice(editIndex, 1, {  // Fixed the splice position
        text: todoValue,
        createdAt: todos[editIndex]?.createdAt || new Date().toLocaleString(),
        editedAt: new Date().toLocaleString(),
        dueDate: dueDate || null // Added dueDate to the todo object
      });

      persistData(updatedTodos);
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Adding new todo
      const newTodo = {
        text: todoValue,
        createdAt: new Date().toLocaleString(),
        editedAt: null,
        dueDate: dueDate || null // Added dueDate to the todo object
      };

      const newTodoList = [...todos, newTodo];
      persistData(newTodoList);
      setTodos(newTodoList);
    }

    setTodoValue('');
    setDueDate(''); // Reset due date after adding todo
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_todo, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const currentTodo = todos[index];
    setTodoValue(currentTodo.text);
    setDueDate(currentTodo.dueDate || ''); // Set the due date when editing
    setEditIndex(index);

    const newTodos = todos.filter((_t, i) => i !== index);
    setTodos(newTodos);
    persistData(newTodos);
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem('todos');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load todos from localStorage", e);
    }
  }, []);

  return (
    <div className="app-container" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 className="typing" style={{ textAlign: "center", color: "white" }}>Todo App</h1>

      {alertMessage && (
        <div className="alert">
          {alertMessage}
        </div>
      )}

      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
        setDueDate={setDueDate} // Pass setDueDate to TodoInput
      />

      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </div>
  );
}

export default App;
