import {  Radio} from 'antd';
import React, { useState } from 'react';
import styles from './index.module.less'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'

export default function ModalLoginForm(props) {
  const [value, setValue] = useState('login');
  function handleChange(e) {
    setValue(e.target.value)
  }
  let element = null;
  if (value === 'login') {
    element = <LoginForm resetRef={props.resetRef} onSubmit={props.onSubmit} />
  }
  else {
    element=<RegisterForm resetRef={props.resetRef} onSubmit={props.onSubmit} />
  }

  return (
    <>
      <Radio.Group
        value={value}
        onChange={handleChange}
        buttonStyle='solid'
        className={styles.loginBtn}
      >
        <Radio.Button value='login'>登录</Radio.Button>
        <Radio.Button value='register'>注册</Radio.Button>
      </Radio.Group>
      <div
        style={{
          marginTop:25
        }}
      >
        {element}
      </div>
    </>
  );
}
