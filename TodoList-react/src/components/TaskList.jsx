import PropTypes from 'prop-types';
import NewTask from './NewTask';
import '../styles/TaskList.css';
import api from '../api/axiosConfig'

function TaskList({tasks, setTasks, isModalOpen, setModalClose}) {
    const handleDelete = async (id) => {
        console.log('Delete Task');
        try {
            const response = await api.delete(`/task/api/tasks/${id}`)
            console.log(response.data)
            setTasks((prevTasks) => prevTasks.filter((task) => task._Id !== id));
            console.log("Task Deleted")
          }catch (error) {
            console.error(error)
         }
    };

    const taskItems = tasks.map((task) => (
        <div key={task._id} className='task-container'>
            <div className='check-button'>
                <input type='radio'></input>
            </div> 
            <div className='task-content'>
                <h3>{task.taskName}</h3>
                <p>{task.taskDescription}</p>
            </div>
            <div className='button-groups'>
                <button onClick={() => handleDelete(task._Id)}>delete</button>
                
            </div>
            
  
        </div>
    ))
     
    const containerStyle = {
        position: 'relative',        // 相对定位
        width: '650px',               // 宽度 100%
        backgroundColor: '#F5F5F5',  // 暖黄色的浅色背景
        padding: '20px',             // 内边距
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // 微弱阴影
        maxWidth: '800px',           // 最大宽度
        margin: '0px auto',         // 居中显示，并与页面顶部留出间距
        transition: 'all 0.3s ease', // 平滑过渡
        minHeight: '600px',          // 最小高度;
      };
      

    return (
        <div style={containerStyle}>
            {isModalOpen && <NewTask setTasks={setTasks} setModalClose={setModalClose} />}
            <div className='task-box'>{taskItems}</div>
        </div>
    );
}
TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    setModalClose: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired,
}

export default TaskList;