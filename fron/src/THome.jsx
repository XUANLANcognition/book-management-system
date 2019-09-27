import React, { Component } from 'react'
import { Layout, BackTop } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'

class BookPage extends Component {
  page = 1
  state = {
    init: '🎉🎉🎉 欢迎进入书籍档案管理系统 🎉🎉🎉'
  }

  componentDidMount = async (v) => {
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <BackTop />
        <div style={{ display: 'flex', flex: '1 0', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', color: '#000' }}>
            {this.state.init}
          </div>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}
export default BookPage
