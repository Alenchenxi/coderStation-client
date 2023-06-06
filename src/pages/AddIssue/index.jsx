import React,{useEffect,useState} from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn'
import styles from './index.module.less'
import {fetchAllTypes} from '../../redux/typeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addIssue } from '../../api/issue';
import {useNavigate} from 'react-router-dom'


export default function LoginForm(props) {

  const typeList = useSelector(state => state.type.types);//所有的分类属性列表
  const { userInfo: { _id } } = useSelector(state => state.user);//用户id
  const navigate = useNavigate();//路由跳转
  const initialFormValue = {
    title: '',//问题标题
    sort: null,//问题分类
    description: ''//问题描述
  };//表单初始值
  const formRef = React.useRef();//获取form实例
  const editorRef = React.useRef();//获取editor编辑器实例
  const [formInstance, setFormInstance] = useState(formRef.current);
  const [editorInstance, setEditorInstance] = useState(editorRef.current)
  const [{ resetFields, getFieldsValue,setFields }] = Form.useForm(formInstance);
  const dispatch = useDispatch();
  useEffect(() => {
  // 解决首次加载无法获取ref实例
    setFormInstance(formRef.current);
    setEditorInstance(editorRef.current.getInstance());
    // 获取分类属性
    if (!typeList.length) {
      dispatch(fetchAllTypes())
    }
    /* eslint-disable */
  }, [])

  // 更新editor编辑器的值
  function editorChange() {
    const value = editorInstance.getHTML()
    const obj = {
        name: 'description',
      value,
    };
    if (value === '<p><br></p>') {
      obj.errors=['问答的描述为必填项']
    }
    else {
      obj.errors=['']
    }
    setFields([obj]);//重新设置问题描述的字段状态
  }

    // 重置表单
    function resetForm() {
      resetFields(['title', 'sort']);
      editorInstance.setHTML('');
      setFields([{
        name: 'description',
        value: '',
        errors:['']
    }])
    }

  async function handleSubmit() {
    const formValue = getFieldsValue(true);
    const {data,msg}=await addIssue({
      issueTitles: formValue.title,
      issueContent: formValue.description,
      typeId: formValue.sort,
      userId:_id
    })
    if (msg) {
        message.error(msg)
    }
    else {
      message.success('您的提问已经成功提交到后台，待管理员审核后方可查看');
      navigate('/issues');
    }
    // console.log(data)
    resetForm();//重置表单
  }

  const selectOptions = typeList.map(type => ({
    label: type.typeName,
    value:type._id
  }))

  return (

    <div>
        <Form
              ref={formRef}
              onFinish={handleSubmit}
        initialValues={initialFormValue}
        className={styles.formContainer}
        >
          <Form.Item
              label='标题'
              name='title'
              required
              labelCol={{
                  span:3,
              }}
          wrapperCol={{
                span:20
              }}
              rules={[
                    {
                        required: true,
                        message: "标题为必填项",
                    }
                    ]}
              validateTrigger='onBlur'
          >
              <Input
                className={styles.input}
                  placeholder='请输入标题'
              />
          </Form.Item>
          <Form.Item
              label='问题分类'
              name='sort'
              required
              labelCol={{
                  span:3,
                  }}
              validateTrigger='onBlur'
              rules={[
                    {
                        required: true,
                        message: "分类为必填项",
                    }
          ]}
              wrapperCol={{
                span:3
              }}
          >
          <Select
            className={styles.select}
            options={selectOptions}
            placeholder='请选择问题分类'
          />
          </Form.Item>
          <Form.Item
            label='问题描述'
            required
          name='description'
          labelCol={{
                  span:3,
          }}
          wrapperCol={{
                span:20
              }}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          language='zh-CN'
            ref={editorRef}
            onChange={editorChange}
            onBlur={editorChange}
        />
      </Form.Item>
          <Form.Item
              wrapperCol={{
                  offset:4
              }}
          >
              <Button
                  type='primary'
                  htmlType='submit'
                  className={styles.btn}
              >确认发布</Button>
              <Button
                  type='primary'
                  className={styles.btn}
                  onClick={resetForm}
                  ref={props.resetRef}
              >重置</Button>
          </Form.Item>
        </Form>
    </div>
  )
}
