import './App.css'

import { useState, useEffect } from 'react'
import axios from 'axios'

import { Signup } from './Signup.jsx'
import { Login } from './Login.jsx'
import { Logout } from './Logout.jsx'
import { Graph } from './Graph.jsx'

export default function App() {
  const [ stories, setStories ] = useState({})

  const getStories = () => {
    axios.get("http://localhost:3000/stories")
    .then(res => {
      let stories = res.data?.stories
      console.log('stories', stories)
      if (stories) {
        setStories(stories)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(getStories, [])

  return (
    <div className="App">
      <Signup />
      <Login />
      <Logout />
      <Graph />
      <p>{JSON.stringify(stories)}</p>
    </div>
  )
}
