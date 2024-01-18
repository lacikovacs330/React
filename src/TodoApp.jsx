import React, { useState, useEffect } from 'react';
import styles from './TodoApp.module.css'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    console.log('Saved to localStorage:', updatedTodos);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const updatedTodos = [...todos, { id: newId, text: newTodo, completed: false }];
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ToDo Alkalmazás</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Új feladat hozzáadása"
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.button}>Hozzáadás</button>
      </div>
      <ul className={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? styles.completed : ''}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
