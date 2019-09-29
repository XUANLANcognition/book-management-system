import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

import Notice from './Notice'
import THome from './THome'
import Home from './Home'
import Profile from './Profile'
import Visit from './Visit'

import textEditorPage from './Page/textEditorPage'
import Join from './Page/Join'
import SettingProfile from './Page/SettingProfile'
import SettingAccount from './Page/SettingAccount'
import Agreement from './Page/Agreement'
import BookPage from './Page/BookPage'
import BookDetailPage from './Page/BookDetailPage'
import BookEditorPage from './Page/BookEditorPage'
import MovieEditorPage from './Page/MovieEditorPage'
import ResetPassword from './Page/ResetPassword'
import Admin from './Page/Admin'

import './Global.css'
import EditorGuidance from './Page/EditorGudiance'

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={THome} />
            <Route exact path='/login' component={Home} />
            <Route exact path='/admin' component={Admin} />
            <Route path='/notice' component={Notice} />
            <Route exact path='/book' component={BookPage} />
            <Route path='/book/:id' component={BookDetailPage} />
            <Route path='/join' component={Join} />
            <Route path='/textEditorPage' component={textEditorPage} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/visit/:id' component={Visit} />
            <Route path='/settings/profile' component={SettingProfile} />
            <Route path='/settings/account' component={SettingAccount} />
            <Route path='/agreement' component={Agreement} />
            <Route path='/editor_guidance' component={EditorGuidance} />
            <Route path='/book_editor_page' component={BookEditorPage} />
            <Route path='/movie_editor_page' component={MovieEditorPage} />
            <Route path='/reset_password' component={ResetPassword} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
