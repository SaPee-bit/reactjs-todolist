import { useState } from "react"

export default function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue, setDueDate } = props

  return (
    <header>
      <input
        id='main'
        value={todoValue}
        onChange={(e) => {
          setTodoValue(e.target.value)
        }}
        placeholder="Enter todo..."
      />
      <div className="entry">
        <input
          type="datetime-local"
          onChange={(e) => setDueDate(e.target.value)} 
        />

        <button onClick={() => {
          handleAddTodos()
        }}>Add</button>
      </div>
      
    </header>   
  )
}
