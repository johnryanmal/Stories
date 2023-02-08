import './App.css'

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

  const login = localStorage.getItem("jwt") !== null

  return (
    <div className="App">
      { login && (
        <Logout />
      )}
      <Routes>
        { !login && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
        )}
        <Route path="/story/:id" element={<Graph />} />
        <Route path="/story/:id" element={<Graph />} />
      </Routes>
      <p>{JSON.stringify(stories)}</p>
    </div>
  )
}
