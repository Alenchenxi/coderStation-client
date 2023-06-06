import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import styles from './index.module.css'
import { getCaptcha, userLogin, findUserById } from '../../api/user'
import { useDispatch } from 'react-redux'
import { setLogin, setUserInfo, setAutoLogin } from '../../redux/userSlice'

export default function LoginForm(props) {
    const initialForm = {
        loginId: '',//登录帐号
        loginPwd: '',//登录密码
        captcha: '',//验证码
        remember: false,//是否记住我
    }

    const formRef = React.useRef();//获取form实例
    const [captcha, setCaptcha] = useState('');
    const [{ resetFields, setFieldValue, getFieldsValue }] = Form.useForm(formRef.current);
    const dispatch = useDispatch();
    useEffect(() => {
        getNewCaptcha();
    }, [])

    // 获取新验证码
    function getNewCaptcha() {
        getCaptcha().then(res => {
            setCaptcha(res)
        })
    }

    // 重置表单
    function resetForm() {
        getCaptcha().then(res => {
            resetFields(['loginId', 'loginPwd', 'captcha', 'remember'])
            setCaptcha(res)
        })
    }

    async function loginHandle() {
        const { msg, data } = await userLogin(getFieldsValue())
        if (msg) {
            // 验证码有误
            message.warning(msg)
            setFieldValue('captcha', '');//清空用户填写的验证码
            getNewCaptcha();//获取新验证码
            return
        }
        if (!data.data) {
            //    账号或密码有误
            message.error('帐号或密码错误，请重新填写');
            resetForm();//重置表单
            return
        }
        if (data.data.enabled) {
            //  能正常登录
            const formData = getFieldsValue();
            if (formData.remember) {
                //    首次进入可以自动登录
                localStorage.setItem('autoLogin', true);
                dispatch(setAutoLogin(true));
            }
            else {
                localStorage.setItem('autoLogin', false);
                dispatch(setAutoLogin(false));
            }
            const { data: { data: { _id }, token } } = await userLogin(formData);
            // 存储token到本地
            localStorage.setItem('userToken', token);
            // 存储用户id 到本地，用于刷新页面后自动更新用户数据
            localStorage.setItem('userId', _id);
            localStorage.setItem('isLogin', true);//设置登录状态，以便刷新页面后能自动获取用户数据
            const { data } = await findUserById(_id);
            // 修改仓库的用户状态
            dispatch(setUserInfo(data))
            // 将状态修改为 登录
            dispatch(setLogin(true));
            props.onSubmit && props.onSubmit();//调用根组件传递的回调函数
            resetForm();//重置表单
        }
        else {
            //  帐号异常
            message.error('您的帐号被冻结，请联系管理员');
            resetForm();//重置表单
        }
    }

    return (

        <div>
            <Form
                ref={formRef}
                onFinish={loginHandle}
                initialValues={initialForm}
            >
                <Form.Item
                    label='登录帐号'
                    name='loginId'
                    required
                    labelCol={{
                        span: 5
                    }}
                    rules={[
                        {
                            required: true,
                            message: "请输入账号，此项为必填项",
                        }
                    ]}
                    validateTrigger='onBlur'
                >
                    <Input
                        className={styles.input}
                        placeholder='请输入你的登录帐号'
                    />
                </Form.Item>
                <Form.Item
                    label='登录密码'
                    name='loginPwd'
                    required
                    labelCol={{
                        span: 5
                    }}
                    rules={[
                        {
                            required: true,
                            message: "请输入密码，此项为必填项",
                        }]}
                    validateTrigger='onBlur'
                >
                    <Input.Password
                        className={styles.input}
                        placeholder='请输入你的登录密码，新用户默认为123456'
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
                    valuePropName='checked'
                    name='remember'
                    wrapperCol={{
                        offset: 5
                    }}
                >
                    <Checkbox
                        className={styles.checkbox}
                    >记住我</Checkbox>
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
                        htmlType='submit'
                        className={styles.btns}
                    >登录</Button>
                    <Button
                        type='primary'
                        className={styles.btns}
                        onClick={resetForm}
                        ref={props.resetRef}
                    >重置</Button>
                </Form.Item>
            </Form>
            <div
                onClick={getNewCaptcha}
                className={styles.captcha}
                dangerouslySetInnerHTML={{ __html: captcha }}
            ></div>
        </div>
    )
}
