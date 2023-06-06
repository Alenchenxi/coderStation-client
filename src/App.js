import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Layout, Modal, message } from 'antd'
import NavHeader from './components/NavHeader'
import FooterBar from './components/FooterBar'
import Routes from './router/routerBefore'
import Form from './components/Form'
import { findUserById, whoAmI } from './api/user'
import { useDispatch } from 'react-redux'
import { setUserInfo, setLogin } from './redux/userSlice'

const { Header, Content, Footer } = Layout

function App() {

  // 恢复登录状态
  async function restoreLoginState() {
    if (!localStorage.getItem('userToken')) {
      return
    }
    const { msg } = await whoAmI();
    // 验证token是否过期
    if (msg) {
      message.error(msg);
      return
    }
    const { data } = await findUserById(localStorage.getItem('userId'));
    dispatch(setUserInfo(data))
    dispatch(setLogin(true));
  }

  const dispatch = useDispatch();
  // 恢复登录状态
  useEffect(() => {
    if (window.name === '') {
      // 首次加载
      window.name = 'reload';
      const autoLogin = localStorage.getItem('autoLogin')
      if (autoLogin && JSON.parse(autoLogin)) {
        // 自动登录
        restoreLoginState();
        // 说明已经登录过一次了
        localStorage.setItem('isLogin', true);
      }
      else {
        // 说明没有登录过
        localStorage.setItem('isLogin', false);
      }
    }
    else {
      // 只有登录过，刷新页面后才会自动登录
      const isLogin = localStorage.getItem('isLogin') && JSON.parse(localStorage.getItem('isLogin'));
      if (isLogin && localStorage.getItem('userId')) {
        restoreLoginState();
      }
    }
    /* eslint-disable */
  }, [])

  const resetRef = useRef();//获取重置表单按钮
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 新建一个点击事件
  function clickEvent() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true)
    return evt
  }
  const handleModalOk = () => {
    setIsModalOpen(false);
    resetRef.current.dispatchEvent(clickEvent());//手动触发重置表单按钮的点击事件
  };
  function closeModal() {
    setIsModalOpen(false);
  }
  const handleModalCancel = () => {
    closeModal();
    resetRef.current.dispatchEvent(clickEvent());//手动触发重置表单按钮的点击事件
  };
  function handleLoginClick() {
    setIsModalOpen(true);//打开对话框
  }
  return (
    <Layout className='layout-container'>
      <Header>
        <NavHeader handleLoginClick={handleLoginClick} />
      </Header>
      <Content className='content-container'>
        <Routes />
      </Content>
      <Footer>
        <FooterBar />
      </Footer>
      <Modal
        title={<div
          style={{
            fontWeight: '400',
            marginLeft: -24,
            width: '110.1%',
            paddingLeft: 25,
            paddingBottom: 10,
            marginBottom: 20,
            borderBottom: '1px solid #ccc'
          }}
        >登录/注册</div>}
        open={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        className='modal-form'
      >
        <Form resetRef={resetRef} onSubmit={closeModal} />
      </Modal>
    </Layout>
  );
}

export default App;
