import React, { useState } from 'react';
import './App.css'

function Todo({todo, index, updateTodo, removeTodo}) {
  return( 
    <div className='todo' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {todo.text}
      <div>
        <button className='btn' onClick={() => updateTodo(index)}>
            { todo.isCompleted ? 'Uncheck' : 'Check' }
        </button>
        <button className='btn-delete' onClick={() => removeTodo(index)}>
          X
        </button>
      </div>
    </div>
  );
}

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return(
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        className='input'
        value={value}
        placeholder='Add Todo...'
        onChange={(e) => { setValue(e.target.value) }}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn hooks',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const updateTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm
          addTodo={addTodo} 
        />
      </div>
    </div>
  )
}

export default App;