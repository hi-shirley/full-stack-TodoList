import PropTypes from 'prop-types';
import '../styles/NewTask.css';
import {request} from '../api/axiosConfig'
import { useState } from 'react';

function NewTask({setTasks, setModalClose}) {
    const [task, setTask] = useState({
        priority:1, 
        taskName:'', 
        taskDescription:'', 
        taskDueDate:'2024-11-2', 
        taskStatus:"PENDING"});

    const addTaskStyle = {
        position: 'absolute',
        top: '10%',
        left: '30%',
        backgroundColor: '#FFF8E1',
        width:'300px',
        height:'auto',
        zIndex: '100',
    };

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setTask((prevTask) => ({
            ...prevTask, 
            [id]: value
        })); 
    };

    const handleAdd = async() => {
        console.log('Add Task');
        try {
            console.log(task);
            const response = await request('post', '/task/api/tasks', task)
            console.log(response.data)
            setTasks((prevTasks) => [response.data,...prevTasks]);
          }catch (error) {
            console.error(error)
         }
        setModalClose();

    }

    const handleClose = () => {
        setModalClose();
    }

    return (
    <div style={addTaskStyle}>
        <h2 className='header'>Add a New Task</h2>
        <div className="form-group">
            <label htmlFor="priority">Select priority</label>
            <select id='priority' value={task.priority} onChange={handleInputChange}>
                <option value="1">Urgent and Important</option>
                <option value="2">Not Urgent but Important</option>
                <option value="3">Urgent but Not Important</option>
                <option value="4">Not Urgent and Not Important</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="taskName">Title</label>
            <input type="text" id="taskName" value={task.taskName} onChange={handleInputChange} placeholder="Task Title" />
        </div>
        <div className="form-group">
            <label htmlFor="taskDescription">Description</label>
            <textarea type="text" id="taskDescription" value={task.taskDescription} onChange={handleInputChange} placeholder="Task Description" />
        </div>
        <div className="form-group">
            <label htmlFor="taskDueDate">Due Date</label>
            <input type="date" id="taskDueDate"  value={task.taskDueDate} onChange={handleInputChange}/>
        </div>
        <div className="button-group">
            <button className="add-button" onClick={handleAdd}>
            Add
            </button>
            <button className="cancel-button" onClick={handleClose}>
            Cancel
            </button>
        </div>
    </div>
    );

};
NewTask.propTypes = {
    setModalClose: PropTypes.func.isRequired,
    postNewTask: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired,
};
export default NewTask;
