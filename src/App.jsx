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

  const nodes = [
    {
      id: "1",
      title: "???",
      type: "text",
      x: -200,
      y: 200
    },
    {
      id: "2",
      title: "Advice",
      type: "button",
      x: 0,
      y: 300
    },
    {
      id: "3",
      title: "Help",
      type: "button",
      x: 0,
      y: 100
    },
    {
      id: "4",
      title: "To chat!",
      type: "chat",
      x: 200,
      y: 200
    }
  ]
  const edges = [
    { source: "1", target: "2", type: "empty" },
    { source: "2", target: "4", type: "empty" },
    { source: "1", target: "3", type: "empty" },
    { source: "3", target: "4", type: "empty" }
  ]

  return (
    <div className="App">
      <Signup />
      <Login />
      <Logout />
      <Graph nodes={nodes} edges={edges}/>
      <p>{JSON.stringify(stories)}</p>
    </div>
  )
}
