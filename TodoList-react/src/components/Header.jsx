
import { FaRegClock } from 'react-icons/fa'; // 使用番茄钟图标
import PropTypes from 'prop-types';


function Header({setModalOpen, setIsLogin}) {
    const headerStyle = {
        width: '650px', // 设置宽度为 200%，使 header 撑满整个屏幕
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        margin: '0px auto', // 使 header 水平居中
        backgroundColor: '#FFDD55', // 番茄红
        color: 'white',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // 阴影效果
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    };

    const iconStyle = {
        marginRight: '10px', // 图标与文字的间距
        fontSize: '1.8rem',
    };

    const navStyle = {
        display: 'flex',
        gap: '15px', // 每个导航链接的间距
        fontSize: '1rem',
        fontWeight: '500',
        textDecoration: 'none',
    };

    const logOut = () => {
        localStorage.removeItem('auth_token');
        setIsLogin(false);
        window.location.href = '/login';
    }

    return (
        <header style={headerStyle}>
            {/* 左侧 Logo 和标题 */}
            <div style={logoStyle}>
                <FaRegClock style={iconStyle} />
                Tomato TODO
            </div>

            {/* 右侧导航栏 */}
            <nav style={navStyle}>
                <button onClick={setModalOpen} href="#add" style={{ color: 'black', textDecoration: 'none' }}>
                    Add
                </button>
                <button href="#tasks" style={{ color: 'black', textDecoration: 'none' }}>
                    Tasks
                </button>
                <button href="#about" style={{ color: 'black', textDecoration: 'none' }}>
                    About
                </button>
                <button onClick={logOut} href="#log out" style={{ color: 'black', textDecoration: 'none' }}>
                Logout
                </button>
            </nav>
        </header>
    );
}
Header.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
    setIsLogin: PropTypes.func.isRequired,
    
};


export default Header;