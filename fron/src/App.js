import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

import Home from './Home'
import Notice from './Notice'
import THome from './THome'
import ArticlePage from './ArticlePage'
import ArticleOwnerPage from './ArticleOwnerPage'
import Profile from './Profile'
import Visit from './Visit'

import textEditorPage from './Page/textEditorPage'
import Join from './Page/Join'
import SettingProfile from './Page/SettingProfile'
import SettingAccount from './Page/SettingAccount'
import Agreement from './Page/Agreement'
import BookPage from './Page/BookPage'
import MoviePage from './Page/MoviePage'
import BookDetailPage from './Page/BookDetailPage'
import MovieDetailPage from './Page/MovieDetailPage'
import FigureDetailPage from './Page/FigureDetailPage'
import BookEditorPage from './Page/BookEditorPage'
import MovieEditorPage from './Page/MovieEditorPage'
import ResetPassword from './Page/ResetPassword'
import ReviseArticle from './Page/ReviseArticle'

import './Global.css'
import EditorGuidance from './Page/EditorGudiance'
import TodayArticle from './Page/TodayArticle'

const MainPage = props => {
  const token = window.localStorage.getItem('token')
  const { history } = props
  if (token) {
    return <THome component={history} />
  } else {
    return <Home component={history} />
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/notice' component={Notice} />
            <Route exact path='/book' component={BookPage} />
            <Route path='/book/:id' component={BookDetailPage} />
            <Route exact path='/movie' component={MoviePage} />
            <Route path='/movie/:id' component={MovieDetailPage} />
            <Route path='/figure/:id' component={FigureDetailPage} />
            <Route path='/join' component={Join} />
            <Route path='/textEditorPage' component={textEditorPage} />
            <Route path='/article/:id' component={ArticlePage} />
            <Route path='/owner_article/:id' component={ArticleOwnerPage} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/visit/:id' component={Visit} />
            <Route path='/settings/profile' component={SettingProfile} />
            <Route path='/settings/account' component={SettingAccount} />
            <Route path='/agreement' component={Agreement} />
            <Route path='/editor_guidance' component={EditorGuidance} />
            <Route path='/book_editor_page' component={BookEditorPage} />
            <Route path='/movie_editor_page' component={MovieEditorPage} />
            <Route path='/reset_password' component={ResetPassword} />
            <Route path='/revise_article/:id' component={ReviseArticle} />
            <Route path='/today_article' component={TodayArticle} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
