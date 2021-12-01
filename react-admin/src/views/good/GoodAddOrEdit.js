// 各种hooks，各种UI组件和样式，自定义组件和actions等工具方法，各种const变量等。

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { Form, Input, InputNumber, Button, Switch, message } from 'antd'
import './style.scss'

import CateSelect from './components/CateSelect'
import UploadImg from './components/UploadImg'

import { postGood, resetDone, getGoodInfo } from '@/store/actions'

const formItemLayout = {
  labelCol: {
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    sm: {
      span: 8,
    },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 8,
      offset: 4,
    }
  },
}

export default () => {
  // 从“数据驱动”的角度，store和state非常重要
  const done = useSelector(store=>store.good.done)
  const info = useSelector(store=>store.good.info)

  const [form] = Form.useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(()=>{
    // 新增或编辑成功时
    if (done) {
      message.success(`${id?'修改':'添加'}成功`, 1, ()=>{
        history.goBack()
      })
    }
    return ()=>{
      dispatch(resetDone())
    }
  }, [done])

  useEffect(()=>{
    // 只有当id存在时获取商品详情
    if (id) dispatch(getGoodInfo({id}))
  }, [])

  useEffect(()=>{
    // 把异步的商品详情数据填充到表单中去
    if (info._id) form.setFieldsValue(info)
  }, [info])

  const onFinish = values => {
    console.log('提交', values)
    // 数据校验。。。。
    // 如果有id，添加id字段，是编辑
    if (id) values['id'] = id
    dispatch(postGood(values))
  }

  return (
    <div className='qf-good-add-edit'>
      <div className='tip'>
        { id ? '商品编辑' : '商品新增' }
      </div>
      <div className='form'>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="商品名称"
            rules={[
              { required: true, message: '请填写商品名称' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="商品介绍"
            rules={[
              { required: true, message: '请输入商品简介' }
            ]}
            hasFeedback
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="商品定价"
            hasFeedback
            rules={[
              { required: true, message: '请输入商品价格' }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="cate"
            label="商品品类"
            tooltip="What do you want others to call you?"
          >
            <CateSelect />
          </Form.Item>

          <Form.Item
            name="hot"
            label="是否热销"
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>

          {/*
            <Form.Item>具有“双向绑定”表单的功能
            相当于给子组件一个value和onChange
          */}
          <Form.Item
            name='img'
            label="商品图片"
          >
            <UploadImg />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              { id ? '修改' : '立即添加' }
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
