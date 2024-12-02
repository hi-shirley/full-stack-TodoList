
export function Login(){
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
            <h1>welcome to Tomato TODO</h1>
        </div>
    )
}

export default Login;