import React, { Component } from 'react'
import { Button, message } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class ProfileCarder extends Component {
  state = {
    username: '',
    avatarUrl: '',
    bio: ''
  }

  onClickLogout = () => {
    window.localStorage.clear()
    this.props.history.replace('/')
    message.success('退出登陆')
  }

  getUserProfile = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:9900/api/users/' + window.localStorage.getItem('user_id'),
        config
      )
      window.localStorage.setItem('url', response.data.url)
      this.setState(function (state) {
        return {
          username: response.data.username,
          avatarUrl: response.data.last_name,
          bio: response.data.profile.bio
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = async (v) => {
    await this.getUserProfile()
  }

  render () {
    return (
      <div style={{ padding: '5px 0' }}>
        <Link to='/login' >
          <div style={{ marginTop: '6px', backgroundColor: 'white', padding: '4px 10px 4px 16px', display: 'flex', justifyContent: 'center', color: '#8590a6', fontWeight: '600' }}>
            管理员登陆
          </div>
        </Link>
        {window.localStorage.getItem('user_id') ? 
        <Link to='/admin' >
          <div style={{ marginTop: '6px', backgroundColor: 'white', padding: '4px 10px 4px 16px', display: 'flex', justifyContent: 'center', color: '#8590a6', fontWeight: '600' }}>
            系统后台
          </div>
        </Link> : null
      }
        <Button type='link' onClick={this.onClickLogout} block style={{ fontWeight: '600', color: '#8590a6' }}>退出登陆</Button>
      </div>
    )
  }
}

const ProfileCard = withRouter(ProfileCarder)

export default ProfileCard
