import './App.css'

import { useState } from 'react'
import axios from 'axios'

import { Signup } from './Signup.jsx'
import { Login } from './Login.jsx'
import { Logout } from './Logout.jsx'

export default function App() {
  const [ story, setStory ] = useState({})

  const getStory = () => {
  }

  return (
    <div className="App">
      <Signup />
      <Login />
      <Logout />
      <p>{JSON.stringify(story)}</p>
    </div>
  )
}
