import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class Myfooter extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: '#343a40', color: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ margin: '5px 0' }}>
            <img src='/icon.png' style={{ width: '60px', height: '60px' }} />Book Management System
          </div>
          <div style={{ margin: '5px 0' }}>
          Book Management System ©2019 Created by XUANLAN
          </div>
        </div>
      </Footer>
    )
  }
}

export default Myfooter
