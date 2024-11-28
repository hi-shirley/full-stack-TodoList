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

    const handleStatusChange = async (task) => {
        console.log('Change Task Status');
        console.log(task);
        try{
            const response = await api.post(`/task/api/tasks/${task._Id}`, {...task, taskStatus: 'COMPLETED'})
            console.log(response.data)
            // 更新tasks里面这个task的状态
            setTasks((prevTasks) => {
                // 找到更新的那个task在tasks中的index
                const taskIndex = prevTasks.findIndex((t) => t._Id === task._Id);
                // 如果没有找到，返回原来的tasks
                if(taskIndex === -1){
                    return prevTasks;
                }
                // 如果找到了，创建一个新的task对象，状态为COMPLETED
                const updatedTask = { ...prevTasks[taskIndex], taskStatus: 'COMPLETED' };

                // 复制一份tasks作为新的tasks
                const newTasks = [...prevTasks];

                // 从新的tasks中删除原来的task，splice表示从taskIndex删除1个元素
                newTasks.splice(taskIndex, 1);

                // 将新的task push到新的tasks中，在末尾
                newTasks.push(updatedTask);

                return newTasks;
            }
                
            );
        }catch(error){
            console.error(error)
        }
    };

    const taskItems = tasks.map((task) => (
        <div key={task._id} className='task-container' >
            <div className='check-button'>
                 {/* 从radio改为 checkbox */}
                <input 
                    type='checkbox'
                    checked={task.taskStatus === 'COMPLETED'}
                    onChange={()=> task && handleStatusChange(task)}
                ></input>
            </div> 
            <div className={`task-content ${task.taskStatus === 'COMPLETED' ? 'completed-task' : ''}`}>
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