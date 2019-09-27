import React, { Component } from 'react'
import { Layout, Form, Input, Tooltip, Icon, Row, Col, Button, Checkbox, Card, message } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const FormItem = Form.Item

class Join extends Component {
  state = {
    confirmDirty: false
  };
  componentDidMount () {
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      window.callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  Join = async (v) => {
    try {
      const responseJoin = await axios.post(
        'https://finewf.club:8080/api/users/',
        {
          username: v.username,
          password: v.password,
          email: v.email
        }
      )
      const response = await axios.post(
        'https://finewf.club:8080/api-token-auth/',
        {
          username: v.username,
          password: v.password
        }
      )
      window.localStorage.setItem('token', response.data.token)
      message.success('Join Successful, Welcome ' + response.data.user_name)
      window.localStorage.setItem('user_id', response.data.user_id)
      this.props.history.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.Join(values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }} >
          <Row style={{ paddingTop: '20px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} >
              <h1 style={{ fontSize: '40px' }}>Join FWF</h1>
              <p style={{ color: '#586069', fontSize: '20px', paddingBottom: '20px' }}>Fine Water Flow, 细水宜长流</p>
            </Col>
          </Row>
          <Row>
            <Col xxl={{ span: 4, offset: 4 }} xl={{ span: 5, offset: 2 }} xs={{ span: 22, offset: 1 }}
              style={{ paddingBottom: '30px' }}>
              <Card
                title='Why Join?'
              >
                <p><Icon type='check' style={{ color: 'green' }} /> 无聊？</p>
                <p><Icon type='check' style={{ color: 'green' }} /> 独乐乐不如众乐乐？</p>
                <p><Icon type='check' style={{ color: 'green' }} /> 我编不下去了. </p>
              </Card>
            </Col>
            <Col xxl={{ span: 11, offset: 1 }} xl={{ span: 14, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                  用户名&nbsp;
                      <Tooltip title='这个以后改不了的，想好喽'>
                        <Icon type='question-circle-o' />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='E-mail'
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!'
                    }, {
                      required: true, message: 'Please input your E-mail!'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='密码'
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!'
                    }, {
                      validator: this.validateToNextPassword
                    }]
                  })(
                    <Input type='password' />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='确认密码'
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!'
                    }, {
                      validator: this.compareToFirstPassword
                    }]
                  })(
                    <Input type='password' onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked'
                  })(
                    <Checkbox>I have read the <Link to='agreement'>agreement</Link></Checkbox>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type='primary' htmlType='submit'>注册</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(Join)
