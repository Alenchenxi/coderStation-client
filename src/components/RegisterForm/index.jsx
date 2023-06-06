import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import styles from './index.module.css'
import { getCaptcha, vaildateIsRegistered, registerUser } from '../../api/user'
import { useDispatch } from 'react-redux'
import { setUserInfo, setLogin } from '../../redux/userSlice'


export default function LoginForm(props) {
    const initialForm = {
        loginId: '',//注册帐号
        nickname: '',//用户昵称
        captcha: '',//验证码
    }
    const [captcha, setcaptcha] = useState('')
    const formRef = React.useRef();
    const dispatch = useDispatch();
    const [formInstance] = Form.useForm(formRef.current);

    useEffect(() => {
        getNewCaptcha()
    }, [])
    function getNewCaptcha() {
        getCaptcha().then(res => {
            setcaptcha(res);
        })
    }

    function resetForm() {
        formInstance.resetFields(['loginId', 'nickname', 'captcha']);
        getNewCaptcha();
    }

    async function checkLoginIdIsExist() {
        if (formInstance.getFieldValue('loginId')) {
            const { data } = await vaildateIsRegistered(formInstance.getFieldValue('loginId'));
            if (data) {
                // 该 loginId 已经注册过了
                return Promise.reject("该用户已经注册过了");
            }
        }
    }

    // 注册操作
    function registerHandle() {
        registerUser(formInstance.getFieldsValue()).then(({ data, msg }) => {
            if (msg) {
                // 注册失败
                message.error(msg, 2)
                formInstance.setFieldValue('captcha', '');
                getNewCaptcha();//更新验证码
            }
            else {
                message.success('用户注册成功！！', 1)
                dispatch(setUserInfo(data))//修改当前的用户信息
                dispatch(setLogin(true));//修改为登录状态
                resetForm();//重置表单
                props.onSubmit && props.onSubmit();
            }
        })
    }

    return (
        <div>
            <Form
                onFinish={registerHandle}
                initialValues={initialForm}
                name='form'
                ref={formRef}
            >
                <Form.Item
                    label='注册帐号'
                    name='loginId'
                    required
                    labelCol={{
                        span: 5
                    }}
                    rules={[
                        {
                            required: true,
                            message: "请输入账号，仅此项为必填项",
                        },
                        // 验证用户是否已经存在
                        { validator: checkLoginIdIsExist },
                    ]}
                    validateTrigger='onBlur'
                >
                    <Input
                        className={styles.input}
                        placeholder='请输入你的注册帐号'
                    />
                </Form.Item>
                <Form.Item
                    label='用户昵称'
                    name='nickname'
                    labelCol={{
                        span: 5
                    }}
                >
                    <Input.Password
                        className={styles.input}
                        placeholder='请输入昵称，不填写默认为新用户xxx'
                    />
                </Form.Item>
                <Form.Item
                    label='验证码'
                    name='captcha'
                    required
                    labelCol={{
                        span: 5
                    }}
                    validateTrigger={['onBlur', 'onChange']}
                    rules={[{
                        required: true,
                        message: '验证码不能为空'
                    },
                    {
                        len: 4,
                        message: '验证码为4位'
                    }
                    ]}
                >
                    <Input
                        className={styles.input}
                        placeholder='请输入验证码'
                        style={{
                            width: 200,
                        }}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 5
                    }}
                    style={{
                        fontWeight: '400',
                        marginLeft: -24,
                        width: '110.1%',
                        paddingLeft: 25,
                        paddingBottom: 20,
                        marginBottom: 10,
                        borderBottom: '1px solid #ccc'
                    }}
                >
                    <Button
                        type='primary'
                        className={styles.btns}
                        htmlType='submit'
                    >注册</Button>
                    <Button
                        type='primary'
                        className={styles.btns}
                        onClick={resetForm}
                        ref={props.resetRef}
                    >重置</Button>
                </Form.Item>
            </Form>
            <div
                className={styles.captcha}
                dangerouslySetInnerHTML={{ __html: captcha }}
                onClick={getNewCaptcha}
            ></div>
        </div>
    )
}
