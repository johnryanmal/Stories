import './App.css'

import { useState } from 'react'

export default function App() {
  const [ story, setStory ] = useState({})

  const getStory = () => {
  }

  return (
    <div className="App">
      <p>{JSON.stringify(story)}</p>
    </div>
  )
}
