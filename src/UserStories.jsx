import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function UserStories() {
	const [ stories, setStories ] = useState([])

  const getStories = () => {
    axios.get("http://localhost:3000/stories/user")
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
		<>
			<h1>Stories Index</h1>

      {stories.map((story, index) => (
        <div key={index}>
          <h2>{story.title}</h2>
          <Link to={`/story/${story.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
		</>
	)
}