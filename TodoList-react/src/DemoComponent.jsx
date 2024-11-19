import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '../api/todosApi';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // 加载 Todo 列表
    useEffect(() => {
        getTodos()
            .then(response => setTodos(response.data))
            .catch(error => console.error('获取 Todo 失败:', error));
    }, []);

    // 添加一个新任务
    const handleAddTodo = () => {
        const newTodo = { title: '新任务', completed: false };
        createTodo(newTodo)
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('添加 Todo 失败:', error));
    };

    // 删除任务
    const handleDeleteTodo = (id) => {
        deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('删除 Todo 失败:', error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <button onClick={handleAddTodo}>添加任务</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo.id)}>删除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;