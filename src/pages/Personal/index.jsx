import React, { useState, useRef } from 'react'
import styles from './index.module.less'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from '../../components/PageHeader'
import { Card, Modal, Form, Button, Input, Image, Upload, message } from 'antd'
import PersonalInfoItem from '../../components/PersonalInfoItem'
import { formatDate } from '../../utils/tools'
import { PlusOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/es/button/button-group'
import { updateUserInfoAsync, setUserInfo, setLogin, setAutoLogin } from '../../redux/userSlice'
import { vaildatePwdIsRight } from '../../api/user'
import { useNavigate } from 'react-router-dom'

export default function Personal() {
    const { userInfo } = useSelector(state => state.user);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [newAvatarUrl, setNewAvatarUrl] = useState('');//新的头像地址
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef();//获取表单实例
    const initialFormValue = {
        ...userInfo,
        loginPwd: ''
    };

    /**
     * 上传头像的回调，改变，失败，成功都会调用
     */
    function handleUploadChange({ file: { status, response } }) {
        if (status === 'done') {
            // 图片上传成功
            const url = response.data;
            setNewAvatarUrl(url);
            message.success('头像更新成功')
            dispatch(updateUserInfoAsync({
                id: userInfo._id, newInfo: {
                    avatar: url
                }
            }))
        }
    }

    // 重置表单
    function handleReset(namePath) {
        if (formRef.current) {
            formRef.current.resetFields(namePath)
        }
    }

    /**
     * 打开对话框
     */
    function handleOpenModal(title) {
        setModalTitle(title);
        handleReset(Object.keys(initialFormValue).concat(['newPwd', 'confirmPwd']));
        setModalOpen(true);
    }

    async function handleSubmit(values, formTitle) {
        let editInfo = {
            ...values
        }
        let modifyPwd = false;//是否修改了密码
        if (formTitle === '基本信息') {
            if (values.newPwd) {
                editInfo = {
                    loginPwd: values.newPwd,
                    nickname: values.nickname || '新用户'
                }
                modifyPwd = true;
            }
            else {
                editInfo = {
                    nickname: values.nickname || '新用户'
                }
            }
        }
        await dispatch(updateUserInfoAsync({
            id: userInfo._id,
            newInfo: editInfo
        }))
        setModalOpen(false);
        handleReset(Object.keys(values))
        if (modifyPwd) {
            message.success('信息修改成功，由于修改了密码，请重新登录')
            dispatch(setLogin(false));
            dispatch(setUserInfo({}));
            dispatch(setAutoLogin(false));//退出登录后下次不能自动登录
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('autoLogin');
            navigate('/')
        }
        else {
            message.success('用户信息修改成功')
        }
    }

    // 关闭对话框
    function handleCloseModal() {
        setModalOpen(false);
    }
    let modalContent = null;
    switch (modalTitle) {
        case '基本信息': {
            modalContent = (<Form
                ref={formRef}
                onFinish={(values) => handleSubmit(values, '基本信息')}
                initialValues={initialFormValue}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    label='登录密码'
                    labelCol={{
                        span: 5
                    }}
                    rules={[
                        {
                            validator: async (rule, value, calllback) => {
                                if (value) {
                                    const { data } = await vaildatePwdIsRight({ userId: userInfo._id, loginPwd: value })
                                    if (!data) {
                                        return Promise.reject('旧密码不正确，请重新填写')
                                    }
                                }
                                else {
                                    document.querySelector('#oldPwd').parentElement.classList.remove('ant-input-affix-wrapper-status-error')
                                    return Promise.resolve();
                                }
                            },
                            validateTrigger: ['onBlur']
                        },
                    ]}
                    name='loginPwd'
                >
                    <Input.Password
                        id='oldPwd'
                        placeholder='如果要修改密码，请先输入旧密码'
                    />
                </Form.Item>
                <Form.Item
                    label='新密码'
                    labelCol={{
                        span: 5
                    }}
                    name='newPwd'
                    rules={[
                        {
                            validator: (rule, value) => {
                                const oldPwd = formRef.current.getFieldValue('loginPwd');
                                if (!oldPwd && value) {
                                    document.querySelector('#oldPwd').parentElement.classList.add('ant-input-affix-wrapper-status-error')
                                    formRef.current.setFields([{
                                        name: 'loginPwd',
                                        errors: ['请先填写旧密码']
                                    }])
                                    return Promise.resolve();
                                }
                                else if (!oldPwd && !value) {
                                    document.querySelector('#oldPwd').parentElement.classList.remove('ant-input-affix-wrapper-status-error')
                                    formRef.current.setFields([{
                                        name: 'loginPwd',
                                        errors: [null]
                                    }])
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input.Password
                        id='newPwd'
                        placeholder='请输入新密码'
                    />
                </Form.Item>
                <Form.Item
                    label='确认密码'
                    labelCol={{
                        span: 5
                    }}
                    name='confirmPwd'
                    rules={[{
                        validator: (rule, value) => {
                            const newPwd = formRef.current.getFieldValue('newPwd');
                            if (!newPwd && value) {
                                document.querySelector('#newPwd').parentElement.classList.add('ant-input-affix-wrapper-status-error')
                                formRef.current.setFields([{
                                    name: 'newPwd',
                                    errors: ['请填写新密码']
                                }])
                                return Promise.resolve();
                            }
                            else if (!newPwd && !value) {
                                document.querySelector('#newPwd').parentElement.classList.remove('ant-input-affix-wrapper-status-error')
                                formRef.current.setFields([{
                                    name: 'newPwd',
                                    errors: [null]
                                }])
                                return Promise.resolve();
                            }
                            if (newPwd && !value) {
                                return Promise.reject('请再次输入新密码')
                            }
                            if (newPwd && value) {
                                if (newPwd !== value) {
                                    return Promise.reject('两次输入的密码不一致')
                                }
                            }
                            return Promise.resolve();
                        }
                    }]}
                >
                    <Input.Password
                        placeholder='请确认密码'
                    />
                </Form.Item>
                <Form.Item
                    label='用户昵称'
                    name='nickname'
                    labelCol={{
                        span: 5
                    }}
                >
                    <Input
                        placeholder='昵称可选，默认为新用户'
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 5
                    }}
                >
                    <ButtonGroup>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className={styles.confirmBtn}
                        >确认</Button>
                        <Button
                            className={styles.resetBtn}
                            onClick={() => handleReset(['loginPwd', 'newPwd', 'confirmPwd', 'nickname'])}
                        >重置</Button>
                    </ButtonGroup>
                </Form.Item>
            </Form>)
            break;
        }
        case '社交帐号': {
            modalContent = (<Form
                onFinish={(values) => handleSubmit(values, '社交账号')}
                ref={formRef}
                initialValues={initialFormValue}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    label='邮箱'
                    labelCol={{
                        span: 5
                    }}
                    name='mail'
                    rules={[{
                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: '邮箱格式不正确'
                    }]}
                >
                    <Input
                        placeholder='请填写邮箱'
                    />
                </Form.Item>
                <Form.Item
                    label='QQ号'
                    labelCol={{
                        span: 5
                    }}
                    name='qq'
                    rules={[{
                        pattern: /^[1-9][0-9]{4,14}$/,
                        message: 'qq帐号格式不正确'
                    }]}
                >
                    <Input
                        placeholder='请填写QQ号'
                    />
                </Form.Item>
                <Form.Item
                    label='微信'
                    labelCol={{
                        span: 5
                    }}
                    name='wechat'
                >
                    <Input
                        placeholder='请填写微信号'
                    />
                </Form.Item>
                <Form.Item
                    label='github'
                    labelCol={{
                        span: 5
                    }}
                    name='github'
                >
                    <Input
                        value={userInfo.github}
                        placeholder='请填写github'
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 5
                    }}
                >
                    <ButtonGroup>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className={styles.confirmBtn}
                        >确认</Button>
                        <Button
                            className={styles.resetBtn}
                            onClick={() => handleReset(['mail', 'qq', 'wechat', 'github'])}
                        >重置</Button>
                    </ButtonGroup>
                </Form.Item>
            </Form>)
            break;
        }
        case '个人简介': {
            modalContent = (<Form
                onFinish={(values) => handleSubmit(values, '个人简介')}
                ref={formRef}
                initialValues={initialFormValue}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    label='自我介绍'
                    labelCol={{
                        span: 5
                    }}
                    name='intro'
                >
                    <Input.TextArea
                        value={userInfo.intro}
                        placeholder='请填写自我介绍'
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 5
                    }}
                >
                    <ButtonGroup>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className={styles.confirmBtn}
                        >确认</Button>
                        <Button
                            className={styles.resetBtn}
                            onClick={() => handleReset(['intro'])}
                        >重置</Button>
                    </ButtonGroup>
                </Form.Item>
            </Form>)
            break;
        }
        default: {
            break;
        }
    }

    return (
        <div>
            <PageHeader title='个人中心' />
            <div className={styles.container}>
                <Card
                    style={{
                        margin: '10px 0 40px 0'
                    }}
                    title={<div className={styles.cardTitle}>基本信息</div>}
                    extra={<div
                        className={styles.cardExtra}
                        onClick={() => handleOpenModal('基本信息')}
                    >编辑</div>}
                >
                    <PersonalInfoItem name='登录帐号' value={userInfo.loginId} />
                    <PersonalInfoItem name='帐号密码' value='************' />
                    <PersonalInfoItem name='用户昵称' value={userInfo.nickname} />
                    <PersonalInfoItem name='用户积分' value={userInfo.points} />
                    <PersonalInfoItem name='注册时间' value={formatDate(userInfo.registerDate)} />
                    <PersonalInfoItem name='上次登录时间' value={formatDate(userInfo.lastLoginDate)} />
                    <PersonalInfoItem name='当前头像' />
                    <Image
                        src={userInfo.avatar}
                        width={100}
                    />
                    <PersonalInfoItem name='上传新头像' style={{
                        marginTop: 20
                    }} />
                    <Upload
                        action='/api/upload'
                        listType='picture-card'
                        showUploadList={false}
                        maxCount={1}
                        onChange={handleUploadChange}
                    >
                        {newAvatarUrl ? <img src={newAvatarUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
                    </Upload>
                </Card>
                <Card
                    style={{
                        margin: '10px 0 40px 0'
                    }}
                    title={<div className={styles.cardTitle}>社交账号</div>}
                    extra={<div
                        className={styles.cardExtra}
                        onClick={() => handleOpenModal('社交帐号')}
                    >编辑</div>}
                >
                    <PersonalInfoItem name='邮箱' value={userInfo.mail || '未填写'} />
                    <PersonalInfoItem name='QQ号' value={userInfo.qq || '未填写'} />
                    <PersonalInfoItem name='微信号' value={userInfo.wechat || '未填写'} />
                    <PersonalInfoItem name='github' value={userInfo.github || '未填写'} />
                </Card>
                <Card
                    style={{
                        margin: '10px 0 40px 0'
                    }}
                    title={<div className={styles.cardTitle}>个人简介</div>}
                    extra={<div
                        className={styles.cardExtra}
                        onClick={() => handleOpenModal('个人简介')}
                    >编辑</div>}
                >
                    <div>{userInfo.intro || '未填写'}</div>
                </Card>
            </div>
            <Modal
                title={modalTitle}
                open={modalOpen}
                onCancel={handleCloseModal}
                footer={false}
            >
                {modalContent}
            </Modal>
        </div>
    )
}
