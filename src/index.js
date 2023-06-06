import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';
import './styles/iconfont.css'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: 'rgb(24, 144, 255)'
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Router>
  </Provider>
);