import '../styles/LoginForm.css';
import { useState } from 'react';
import {request} from '../api/axiosConfig';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

export function LoginForm({setIsLogin}){
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
    
    const [user, setUser] = useState({name:'', password:''});
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        console.log(id, value);
        setUser((prevUser) => ({
            ...prevUser, 
            [id]: value
        }));
    };

    const handleLogin = async() => {
        try{
            console.log('login');
            const response = await request('POST','/user/api/login', user);
            console.log(response.data);
            console.log('fetch token successfully');
            localStorage.setItem('auth_token', response.data);
            setIsLogin(true);
            navigate(`/tasks/${response.data}`);
        }catch(error){
            console.error(error);
            if(error.response){
                const status = error.response.status;
                if(status === 400){
                    alert(`invalid request: ${error.response.data}`);
                }else{
                    alert(`登录失败，请稍后再试。错误代码：${status}`);
                }           
            }else{
                alert('网络错误，请稍后再试');
            }
        }

    };

    const handleRegister = async() => {
        try{
            console.log('register');
            const response = await request('POST','/user/api/register', user);
            console.log(response.data);
            console.log('register successfully');

        }catch(error){
            console.error(error);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 className="header">welcome to Tomato TODO</h2>
            <div className="form-group">
                <label htmlFor='user name'>Username</label>
                <input type='text' id='name' value={user.name} onChange={handleInputChange} placeholder="enter user name"></input>
            </div>
            <div className="form-group">
                <label htmlFor='password'>password</label>
                <input type='password' id='password' value={user.password} onChange={handleInputChange}  placeholder="enter user password"></input>
            </div>
            <div className="button-group">
                <button onClick={handleLogin} className="login-button">
                    log in
                </button>
                <button onClick={handleRegister} className="register-button">
                    register
                </button>
            </div>
            
        </div>
    )
}

LoginForm.propTypes = {
    setIsLogin: PropTypes.func.isRequired,
    
};

export default LoginForm;