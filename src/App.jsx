import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Signup } from './Signup.jsx'
import { Login } from './Login.jsx'
import { Logout } from './Logout.jsx'
import { Stories } from './Stories.jsx'
import { UserStories } from './UserStories.jsx'
import { Story } from './Story'
import { Editor } from './Editor.jsx'
import { Reader } from './Reader.jsx'
import { NewStory } from './NewStory.jsx'

export default function App() {
  const login = localStorage.getItem("jwt") !== null

  return (
    <div className="App">
      { login && (
        <Logout />
      )}
      <Routes>
        { login && (
        <>
          <Route path="/stories/user" element={<UserStories />} />
          <Route path="/story/new" element={<NewStory />} />
        </>
        ) || (
        <>
          <Route path="/stories/user" element={<Login />} />
          <Route path="/story/new" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
        )}
        <Route path="/" element={<Stories />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/story/:id/edit" element={<Editor />} />
        <Route path="/story/:id/read" element={<Reader />} />
      </Routes>
    </div>
  )
}
