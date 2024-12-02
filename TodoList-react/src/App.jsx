import { useEffect, useState } from 'react'
import {request,setAuthHeader,getAuthToken} from './api/axiosConfig';
import LoginHeader from './components/LoginHeader';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Login from './components/Login';
import Header from './components/Header'

function App() {
  // get all the tasks from the backend
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // const navigate = useNavigate(); // 获取导航函数


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
        {isLogin ? <Header setModalOpen={setModalOpen} setIsLogin={setIsLogin}/> : <LoginHeader />}
        <Routes>
          {/* 定义根路径 "/" */}
          <Route path="/" element={<Login />} />
          {/* 定义/tasks路径 */}
          <Route path="/login" element={<LoginForm setIsLogin={setIsLogin}/>} />
          <Route path="/tasks/:token" element={<TaskList isModalOpen={isModalOpen} setModalClose={setModalClose} />} />

          
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