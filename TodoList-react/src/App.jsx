import { useEffect, useState } from 'react'
import api from './api/axiosConfig'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';

import Header from './components/Header'
function App() {
  // get all the tasks from the backend
  const [tasks, setTasks] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate(); // 获取导航函数

  const getTasks = async() => {
    try{
      console.log('1');
      const response = await api.get('/task/api/tasks')
      console.log('2');
      setTasks(response.data)
      console.log({tasks})
    }catch(error){
      console.error(error)
  }}

  

  useEffect(() => {
    getTasks()  
  },[]);

  const setModalOpen = () => {
    setIsModalOpen(true);
  
  }

  const setModalClose = () => {
    setIsModalOpen(false);
  }

  const AppContainer = { 
    height: 'auto',
    width: '690px',
    border: '1px dashed #ccc',  // 虚线边框
    backgroundColor: '#f0f0f0',  // 浅灰色背景
  };

  return (
    <Router>
      <div style={AppContainer}>
        <Header setModalOpen={setModalOpen}/>
        <Routes>
          {/* 定义根路径 "/" */}
          <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} isModalOpen={isModalOpen} setModalClose={setModalClose} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App


// return (
//   <>
//     {tasks.map((task) => (
//       <div key={task.id}>
//         <h1>{task.taskName}</h1> {/* 渲染任务名称 */}
//         <p>{task.taskDescription}</p> {/* 渲染任务描述 */}
//         <p>Priority: {task.priority}</p> {/* 渲染优先级 */}
//         <p>Due Date: {task.taskDueDate}</p> {/* 渲染截止日期 */}
//         <p>Status: {task.taskStatus}</p> {/* 渲染任务状态 */}
//       </div>
//     ))}
//   </>
// );