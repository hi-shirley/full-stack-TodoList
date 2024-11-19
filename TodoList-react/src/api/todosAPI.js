import axiosInstance from './axiosInstance';

// 一般这么写哈，先举个例子
export const getTodos = () => {
    return axiosInstance.get('/api/todos');
};

// 创建新的 Todo 项
export const createTodo = (todo) => {
    return axiosInstance.post('/api/todos', todo);
};

// 更新某个 Todo 项
export const updateTodo = (id, todo) => {
    return axiosInstance.put(`/api/todos/${id}`, todo);
};

// 删除某个 Todo 项
export const deleteTodo = (id) => {
    return axiosInstance.delete(`/api/todos/${id}`);
};